import type { Season, Temperature, Clarity } from '@/data/colorData';
import { SEASON_META } from '@/data/colorData';

export interface Scores {
  warm: number;
  neutral: number;
  cool: number;
  clear: number;
  soft: number;
  light: number;
  deep: number;
  spring: number;
  summer: number;
  autumn: number;
  winter: number;
}

export const createEmptyScores = (): Scores => ({
  warm: 0,
  neutral: 0,
  cool: 0,
  clear: 0,
  soft: 0,
  light: 0,
  deep: 0,
  spring: 0,
  summer: 0,
  autumn: 0,
  winter: 0,
});

export type Confidence = 'high' | 'medium' | 'low';

export interface DiagnosisResult {
  /** Primary season (null when fully tied) */
  primarySeason: Season | null;
  /** Seasons sharing the top score (always >= 1; if > 1 it is a tie) */
  topSeasons: Season[];
  /** Predicted temperature from Step 1 */
  temperature: Temperature | 'neutral';
  /** 뉴트럴일 때 웜·쿨 중 조금 더 가까운 쪽 (없으면 null) */
  lean: Temperature | null;
  /** Step 1 clarity preference (clear / soft / equal) */
  clarity: Clarity | 'equal';
  /** 최종 계절 점수 (STEP 2 선택 + STEP 1 가산점) */
  seasonScores: Pick<Scores, 'spring' | 'summer' | 'autumn' | 'winter'>;
  /** STEP 2에서 계절별로 고른 개수 */
  picks: Pick<Scores, 'spring' | 'summer' | 'autumn' | 'winter'>;
  /** STEP 1 점수 */
  step1: Pick<Scores, 'warm' | 'neutral' | 'cool' | 'clear' | 'soft' | 'light' | 'deep'>;
  /** STEP 1 웜·쿨 결과와 최종 계절의 웜·쿨이 서로 다른지 */
  conflict: boolean;
  /** 결과 확신도 */
  confidence: Confidence;
}

// STEP 1 결과를 계절 점수에 더할 때의 가중치 (STEP 2 한 문항 = 1점)
// 예: 웜이 쿨보다 3개 많으면 봄·가을에 +1.5
const TEMP_WEIGHT = 0.5;
const CLARITY_WEIGHT = 0.5;
const DEPTH_WEIGHT = 0.5;

const LIGHT_SEASONS: Season[] = ['spring', 'summer'];
const CLEAR_SEASONS: Season[] = ['spring', 'winter'];

const round2 = (n: number) => Math.round(n * 100) / 100;

const tieKey = (a: Season, b: Season): string => {
  // Ensure consistent ordering against TIE_MESSAGES keys
  const pairs: Array<[Season, Season]> = [
    ['spring', 'autumn'],
    ['summer', 'winter'],
    ['spring', 'summer'],
    ['autumn', 'summer'],
    ['winter', 'spring'],
    ['autumn', 'winter'],
  ];
  const found = pairs.find(
    ([x, y]) => (x === a && y === b) || (x === b && y === a),
  );
  return found ? `${found[0]}|${found[1]}` : `${a}|${b}`;
};

/**
 * 웜·뉴트럴·쿨 판정
 * - 뉴트럴 점수가 웜·쿨 점수 이상이면 뉴트럴
 * - 웜과 쿨 점수가 같아도 뉴트럴
 * - 그 밖에는 웜·쿨 중 점수가 높은 쪽
 * 뉴트럴일 때는 웜·쿨 중 조금 더 가까운 쪽(lean)도 함께 알려 줌
 */
export const decideTone = (
  scores: Scores,
): { temperature: Temperature | 'neutral'; lean: Temperature | null } => {
  const lean: Temperature | null =
    scores.warm > scores.cool ? 'warm' : scores.cool > scores.warm ? 'cool' : null;
  const neutralWins = scores.neutral > 0 && scores.neutral >= Math.max(scores.warm, scores.cool);
  if (neutralWins || lean === null) return { temperature: 'neutral', lean };
  return { temperature: lean, lean: null };
};

export const NEUTRAL_LEAN_TEXT: Record<Temperature, string> = {
  warm: '웜 쪽에 조금 더 가까움',
  cool: '쿨 쪽에 조금 더 가까움',
};

export const computeStep1Result = (
  scores: Scores,
): { temperature: Temperature | 'neutral'; lean: Temperature | null; message: string } => {
  const { temperature, lean } = decideTone(scores);
  if (temperature === 'warm') {
    return {
      temperature,
      lean,
      message: '따뜻한 색이 비교적 자연스럽게 어울리는 웜톤 가능성이 있습니다.',
    };
  }
  if (temperature === 'cool') {
    return {
      temperature,
      lean,
      message: '차가운 색이 비교적 자연스럽게 어울리는 쿨톤 가능성이 있습니다.',
    };
  }
  const leanMsg =
    lean === 'warm'
      ? ' 그중에서도 따뜻한 쪽에 조금 더 가깝습니다.'
      : lean === 'cool'
      ? ' 그중에서도 차가운 쪽에 조금 더 가깝습니다.'
      : '';
  return {
    temperature,
    lean,
    message: `웜톤과 쿨톤 어느 한쪽으로 치우치지 않아 중간 톤의 색을 폭넓게 소화하는 뉴트럴 가능성이 있습니다.${leanMsg}`,
  };
};

export const computeDiagnosis = (scores: Scores): DiagnosisResult => {
  const picks = {
    spring: scores.spring,
    summer: scores.summer,
    autumn: scores.autumn,
    winter: scores.winter,
  };

  // STEP 2 선택 개수에 STEP 1(웜·쿨, 선명·부드러움, 밝은·깊은 톤) 결과를 가산점으로 더함
  const tempLead = scores.warm - scores.cool;
  const clarityLead = scores.clear - scores.soft;
  const depthLead = scores.light - scores.deep;
  const bonus = (s: Season): number => {
    const isWarm = SEASON_META[s].temp === 'warm';
    const t = (isWarm ? Math.max(0, tempLead) : Math.max(0, -tempLead)) * TEMP_WEIGHT;
    const isClear = CLEAR_SEASONS.includes(s);
    const c = (isClear ? Math.max(0, clarityLead) : Math.max(0, -clarityLead)) * CLARITY_WEIGHT;
    const isLight = LIGHT_SEASONS.includes(s);
    const d = (isLight ? Math.max(0, depthLead) : Math.max(0, -depthLead)) * DEPTH_WEIGHT;
    return t + c + d;
  };
  const seasonScores = {
    spring: round2(picks.spring + bonus('spring')),
    summer: round2(picks.summer + bonus('summer')),
    autumn: round2(picks.autumn + bonus('autumn')),
    winter: round2(picks.winter + bonus('winter')),
  };

  const entries = (Object.entries(seasonScores) as Array<[Season, number]>).sort(
    (a, b) => b[1] - a[1],
  );
  const maxScore = entries[0][1];
  const topSeasons = entries.filter(([, s]) => s === maxScore).map(([s]) => s);

  let primarySeason: Season | null = topSeasons[0];

  const { temperature, lean } = decideTone(scores);
  const clarity: Clarity | 'equal' =
    scores.clear > scores.soft ? 'clear' : scores.soft > scores.clear ? 'soft' : 'equal';

  if (topSeasons.length > 1) {
    // 1st tiebreaker: temperature preference
    // 뉴트럴이면 웜·쿨 중 조금 더 가까운 쪽(lean)을 기준으로 사용
    const tieTemp = temperature === 'neutral' ? lean : temperature;
    const tempPreferred = topSeasons.filter(
      (s) => tieTemp !== null && SEASON_META[s].temp === tieTemp,
    );
    if (tempPreferred.length === 1) {
      primarySeason = tempPreferred[0];
    } else if (tempPreferred.length > 1) {
      // 2nd tiebreaker: clarity
      // clear -> spring & winter ; soft -> summer & autumn
      const clearSeasons: Season[] = ['spring', 'winter'];
      const softSeasons: Season[] = ['summer', 'autumn'];
      const clarityPreferred = tempPreferred.filter((s) =>
        clarity === 'clear' ? clearSeasons.includes(s) : softSeasons.includes(s),
      );
      if (clarityPreferred.length === 1) {
        primarySeason = clarityPreferred[0];
      } else if (clarityPreferred.length === 0) {
        // clarity pulls the other way for all remaining - keep tie
        primarySeason = null;
      } else {
        primarySeason = null;
      }
    } else {
      // temperature pulls the other way for all top seasons - try clarity alone
      const clearSeasons: Season[] = ['spring', 'winter'];
      const softSeasons: Season[] = ['summer', 'autumn'];
      const clarityPreferred = topSeasons.filter((s) =>
        clarity === 'clear' ? clearSeasons.includes(s) : softSeasons.includes(s),
      );
      if (clarityPreferred.length === 1) {
        primarySeason = clarityPreferred[0];
      } else {
        primarySeason = null;
      }
    }
  }

  // 웜·쿨 체크 결과와 최종 계절이 반대인지 (뉴트럴은 충돌로 보지 않음)
  const resultSeason = primarySeason ?? topSeasons[0];
  const conflict = temperature !== 'neutral' && SEASON_META[resultSeason].temp !== temperature;

  // 확신도: 1·2위 점수 차이와 결과 일치 여부로 판단
  const margin = entries[0][1] - (entries[1]?.[1] ?? 0);
  const confidence: Confidence =
    conflict || primarySeason === null || margin < 1 ? 'low' : margin >= 2 ? 'high' : 'medium';

  return {
    primarySeason,
    topSeasons,
    temperature,
    lean,
    clarity,
    seasonScores,
    picks,
    step1: {
      warm: scores.warm,
      neutral: scores.neutral,
      cool: scores.cool,
      clear: scores.clear,
      soft: scores.soft,
      light: scores.light,
      deep: scores.deep,
    },
    conflict,
    confidence,
  };
};

export const tieKeyFor = (a: Season, b: Season): string => tieKey(a, b);
