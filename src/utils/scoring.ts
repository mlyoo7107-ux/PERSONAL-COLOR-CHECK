import type { Season, Temperature, Clarity } from '@/data/colorData';
import { SEASON_META } from '@/data/colorData';

export interface Scores {
  warm: number;
  cool: number;
  clear: number;
  soft: number;
  spring: number;
  summer: number;
  autumn: number;
  winter: number;
}

export const createEmptyScores = (): Scores => ({
  warm: 0,
  cool: 0,
  clear: 0,
  soft: 0,
  spring: 0,
  summer: 0,
  autumn: 0,
  winter: 0,
});

export interface DiagnosisResult {
  /** Primary season (null when fully tied) */
  primarySeason: Season | null;
  /** Seasons sharing the top score (always >= 1; if > 1 it is a tie) */
  topSeasons: Season[];
  /** Predicted temperature from Step 1 */
  temperature: Temperature | 'neutral';
  /** Step 1 clarity preference (clear / soft / equal) */
  clarity: Clarity | 'equal';
  /** Season scores for display */
  seasonScores: Pick<Scores, 'spring' | 'summer' | 'autumn' | 'winter'>;
  /** All four Step-1 scores for the save card */
  step1: Pick<Scores, 'warm' | 'cool' | 'clear' | 'soft'>;
}

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

export const computeStep1Result = (scores: Scores): { temperature: Temperature | 'neutral'; message: string } => {
  if (scores.warm > scores.cool) {
    return {
      temperature: 'warm',
      message: '따뜻한 색이 비교적 자연스럽게 어울리는 웜톤 가능성이 있습니다.',
    };
  }
  if (scores.cool > scores.warm) {
    return {
      temperature: 'cool',
      message: '차가운 색이 비교적 자연스럽게 어울리는 쿨톤 가능성이 있습니다.',
    };
  }
  return {
    temperature: 'neutral',
    message: '웜톤과 쿨톤의 특성이 함께 나타나는 뉴트럴 가능성이 있습니다.',
  };
};

export const computeDiagnosis = (scores: Scores): DiagnosisResult => {
  const seasonScores = {
    spring: scores.spring,
    summer: scores.summer,
    autumn: scores.autumn,
    winter: scores.winter,
  };

  const entries = (Object.entries(seasonScores) as Array<[Season, number]>).sort(
    (a, b) => b[1] - a[1],
  );
  const maxScore = entries[0][1];
  const topSeasons = entries.filter(([, s]) => s === maxScore).map(([s]) => s);

  let primarySeason: Season | null = topSeasons[0];

  const temperature: Temperature | 'neutral' =
    scores.warm > scores.cool ? 'warm' : scores.cool > scores.warm ? 'cool' : 'neutral';
  const clarity: Clarity | 'equal' =
    scores.clear > scores.soft ? 'clear' : scores.soft > scores.clear ? 'soft' : 'equal';

  if (topSeasons.length > 1) {
    // 1st tiebreaker: temperature preference
    const tempPreferred = topSeasons.filter(
      (s) => SEASON_META[s].temp === temperature,
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

  return {
    primarySeason,
    topSeasons,
    temperature,
    clarity,
    seasonScores,
    step1: { warm: scores.warm, cool: scores.cool, clear: scores.clear, soft: scores.soft },
  };
};

export const tieKeyFor = (a: Season, b: Season): string => tieKey(a, b);
