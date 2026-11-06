import { useRef } from 'react';
import html2canvas from 'html2canvas';
import {
  RotateCcw,
  Pencil,
  Sparkles,
  ThermometerSun,
  Snowflake,
  Droplet,
  CalendarCheck,
  ChevronRight,
} from 'lucide-react';

// COLOR.M 퍼스널컬러 진단 예약 링크 (colorm.net의 "퍼스널컬러 진단 예약하기"와 동일)
const BOOKING_URL = 'https://naver.me/FXwWe5MG';
import {
  RESULT_PALETTES,
  RESULT_DESCRIPTIONS,
  RESULT_TITLES,
  RESULT_KEYWORDS,
  SEASON_META,
  TIE_MESSAGES,
} from '@/data/colorData';
import type { Season } from '@/data/colorData';
import { GENDER_LABELS, type Gender } from '@/data/questions';
import type { DiagnosisResult } from '@/utils/scoring';
import { tieKeyFor, NEUTRAL_LEAN_TEXT } from '@/utils/scoring';

interface ResultScreenProps {
  result: DiagnosisResult;
  gender: Gender;
  onRestart: () => void;
  onEditAnswers: () => void;
}

export function ResultScreen({ result, gender, onRestart, onEditAnswers }: ResultScreenProps) {
  const { primarySeason, topSeasons, seasonScores, temperature, lean } = result;
  const isTie = topSeasons.length > 1;
  const displaySeason = primarySeason ?? topSeasons[0];
  const meta = SEASON_META[displaySeason];

  const tieMsg = isTie
    ? TIE_MESSAGES[tieKeyFor(topSeasons[0], topSeasons[1])] ??
      '두 가지 계절의 특성이 함께 나타납니다.'
    : null;

  // 1순위를 제외한 최고 점수 계절
  const secondSeason: Season | null =
    (Object.entries(seasonScores) as Array<[Season, number]>)
      .sort((a, b) => b[1] - a[1])
      .find(([s]) => s !== displaySeason)?.[0] ?? null;

  const tempIcon =
    temperature === 'warm' ? (
      <ThermometerSun className="h-5 w-5 text-season-autumn" />
    ) : temperature === 'cool' ? (
      <Snowflake className="h-5 w-5 text-season-winter" />
    ) : (
      <Droplet className="h-5 w-5 text-tone" />
    );

  const scoreRows: Array<{ label: string; value: number; color: string }> = [
    { label: '봄', value: seasonScores.spring, color: SEASON_META.spring.color },
    { label: '여름', value: seasonScores.summer, color: SEASON_META.summer.color },
    { label: '가을', value: seasonScores.autumn, color: SEASON_META.autumn.color },
    { label: '겨울', value: seasonScores.winter, color: SEASON_META.winter.color },
  ];
  const maxScore = Math.max(...scoreRows.map((r) => r.value), 1);

  const captureRef = useRef<HTMLDivElement>(null);

  const handleSave = async () => {
    if (!captureRef.current) return;
    const canvas = await html2canvas(captureRef.current, {
      scale: 3,
      backgroundColor: '#F3F4F6',
      useCORS: true,
      logging: false,
      onclone: (doc) => {
        // 저장 이미지에 애니메이션 중간 상태가 찍히지 않도록 정리
        const el = doc.querySelector<HTMLElement>('[data-result-capture="true"]');
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = 'none';
        el.style.animation = 'none';
        el.querySelectorAll<HTMLElement>('*').forEach((child) => {
          child.style.animation = 'none';
          child.style.transition = 'none';
        });
      },
    });
    const link = document.createElement('a');
    link.download = `COLOR.M_퍼스널컬러_진단결과_${GENDER_LABELS[gender]}.png`;
    link.href = canvas.toDataURL('image/png', 1);
    link.click();
  };

  return (
    <div ref={captureRef} data-result-capture="true" className="animate-fade-in">
      {/* Title */}
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-magenta" />
        <h2 className="font-display text-[22px] font-black text-ink">나의 예상 퍼스널컬러</h2>
        <span className="ml-auto rounded-full bg-tone-soft/40 px-3 py-1 text-[13px] font-medium text-tone-deep">
          {GENDER_LABELS[gender]} 진단
        </span>
      </div>

      {/* Hero result card */}
      <div
        className="overflow-hidden rounded-3xl shadow-card"
        style={{
          background: `linear-gradient(135deg, ${meta.color} 0%, ${meta.color}cc 100%)`,
        }}
      >
        <div className="px-6 pb-6 pt-7 text-white">
          <p className="font-mono text-[13px] tracking-[0.2em] opacity-90">RESULT</p>
          <p className="mt-2 font-display text-[30px] font-black leading-tight">
            {isTie ? '복합형 특성' : RESULT_TITLES[displaySeason]}
          </p>
          {!isTie && (
            <div className="mt-1 space-y-0.5 text-[15px] opacity-90">
              <p>1순위 계절 · {SEASON_META[displaySeason].label}</p>
              {secondSeason && <p>2순위 계절 · {SEASON_META[secondSeason].label}</p>}
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {(isTie ? topSeasons.flatMap((s) => RESULT_KEYWORDS[s].slice(0, 2)) : RESULT_KEYWORDS[displaySeason]).map(
              (kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-black/20 px-3 py-1 text-[14px] font-semibold text-white"
                >
                  {kw}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Temperature prediction */}
      <div className="mt-4 rounded-2xl bg-card p-4 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tone-soft/25">
            {tempIcon}
          </div>
          <div>
            <p className="text-[13px] text-ink-sub">웜톤 · 뉴트럴 · 쿨톤 예상</p>
            <p className="text-[17px] font-semibold text-ink">
              {temperature === 'warm'
                ? '웜톤 예상'
                : temperature === 'cool'
                ? '쿨톤 예상'
                : '뉴트럴 예상'}
              {temperature === 'neutral' && lean && (
                <span className="ml-1.5 text-[14px] font-medium text-tone-deep">
                  ({NEUTRAL_LEAN_TEXT[lean]})
                </span>
              )}
            </p>
            {temperature === 'neutral' && (
              <p className="mt-0.5 text-[14px] leading-relaxed text-ink-sub">
                웜·쿨 어느 한쪽으로 치우치지 않아 중간 톤의 색을 폭넓게 소화할 수 있어요.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4 rounded-2xl bg-card p-5 shadow-soft">
        <p className="text-[17px] leading-relaxed text-ink">
          {isTie
            ? tieMsg ?? '두 가지 계절의 특성이 함께 나타납니다.'
            : RESULT_DESCRIPTIONS[displaySeason]}
        </p>
      </div>

      {/* Scores */}
      <div className="mt-4 rounded-2xl bg-card p-5 shadow-soft">
        <p className="mb-3 text-[15px] font-semibold text-ink">계절별 점수</p>
        <div className="space-y-3">
          {scoreRows.map((row) => (
            <div key={row.label}>
              <div className="mb-1 flex items-center justify-between text-[15px]">
                <span className="flex items-center gap-1.5 text-ink-sub">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: row.color }}
                  />
                  {row.label}
                </span>
                <span className="font-semibold text-ink">{row.value}점</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-border/60">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(row.value / maxScore) * 100}%`,
                    backgroundColor: row.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended palette */}
      <div className="mt-4 rounded-2xl bg-card p-5 shadow-soft">
        <p className="mb-3 text-[15px] font-semibold text-ink">추천 컬러 팔레트</p>
        <div className="space-y-4">
          <PaletteRow label="1순위 컬러" season={displaySeason} />
          {secondSeason && <PaletteRow label="2순위 컬러" season={secondSeason} />}
        </div>
      </div>

      {/* Notice */}
      <div className="mt-4 rounded-2xl border border-border bg-tone-soft/12 p-4">
        <p className="text-[14px] leading-relaxed text-ink-sub">
          본 결과는 책의 내용을 바탕으로 구성한 입문용 셀프 체크입니다.
          <br />
          퍼스널컬러는 피부 표현, 윤곽, 명도·채도, 청탁감, 그리고 전체적인 조화를 함께 비교하며
          확인하는 것이 중요합니다.
          <br />
          보다 정확한 진단은 전문가 컨설팅을 통해 확인해보시길 권해드립니다.
        </p>
      </div>

      {/* Expert booking (저장 이미지에는 포함하지 않음) */}
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-html2canvas-ignore="true"
        className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-magenta/30 bg-magenta/5 p-4 transition-colors hover:border-magenta active:scale-[0.99]"
      >
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-magenta text-white">
          <CalendarCheck className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[16px] font-bold text-ink">전문가 퍼스널컬러 진단 예약하기</span>
          <span className="mt-0.5 block text-[14px] leading-snug text-ink-sub">
            실제 드레이핑으로 나의 컬러를 정확하게 확인해 보세요.
          </span>
        </span>
        <ChevronRight className="h-5 w-5 flex-shrink-0 text-magenta" />
      </a>

      {/* Action buttons */}
      <div className="mt-6 space-y-3" data-html2canvas-ignore="true">
        <button
          onClick={handleSave}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-magenta py-3.5 text-[15px] font-semibold text-white shadow-soft transition-colors active:scale-[0.98] hover:bg-magenta-deep"
        >
          결과 저장하기
        </button>
        <button
          onClick={onEditAnswers}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-border bg-card py-3.5 text-[15px] font-semibold text-ink transition-colors active:scale-[0.98] hover:border-tone"
        >
          <Pencil className="h-4 w-4" />
          선택한 답변 수정하기
        </button>
        <button
          onClick={onRestart}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-border bg-card py-3.5 text-[15px] font-semibold text-ink-sub transition-colors active:scale-[0.98] hover:border-tone"
        >
          <RotateCcw className="h-4 w-4" />
          결과 처음부터 다시 확인하기
        </button>
      </div>
    </div>
  );
}

function PaletteRow({ label, season }: { label: string; season: Season }) {
  return (
    <div>
      <p className="mb-2 text-[13px] font-medium text-ink-sub">{label}</p>
      <div className="grid grid-cols-5 gap-2">
        {RESULT_PALETTES[season].map((c) => (
          <div key={c.hex} className="flex flex-col items-center">
            <div
              className="h-14 w-full rounded-xl border border-border"
              style={{ backgroundColor: c.hex }}
            />
            <span className="mt-1.5 text-[12px] text-ink-sub">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
