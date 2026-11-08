import { useRef, useState } from 'react';
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
  ChevronDown,
} from 'lucide-react';

// COLOR.M 퍼스널컬러 진단 예약 링크 (colorm.net의 "퍼스널컬러 진단 예약하기"와 동일)
const BOOKING_URL = 'https://naver.me/FXwWe5MG';
import {
  RESULT_PALETTES,
  RESULT_DESCRIPTIONS,
  RESULT_TITLES,
  RESULT_KEYWORDS,
  RESULT_TIES,
  MALE_STYLE,
  FEMALE_STYLE,
  SEASON_META,
  TIE_MESSAGES,
  assetUrl,
} from '@/data/colorData';
import type { Season } from '@/data/colorData';
import { GENDER_LABELS, type Gender } from '@/data/questions';
import type { DiagnosisResult } from '@/utils/scoring';
import { tieKeyFor, NEUTRAL_LEAN_TEXT } from '@/utils/scoring';

/** 결과 화면 "내 답변" 목록의 한 줄 */
export interface AnswerItem {
  stage: 'step1' | 'step2';
  index: number;
  label: string;
  value: string;
  color?: string;
}

interface ResultScreenProps {
  result: DiagnosisResult;
  gender: Gender;
  answerItems: AnswerItem[];
  onRestart: () => void;
  onJumpToAnswer: (stage: 'step1' | 'step2', index: number) => void;
}

export function ResultScreen({
  result,
  gender,
  answerItems,
  onRestart,
  onJumpToAnswer,
}: ResultScreenProps) {
  const [showAnswers, setShowAnswers] = useState(false);
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

        {/* 계절 전체 톤 차트 (저장 이미지에는 넣지 않음) */}
        <details className="group mt-4 border-t border-border pt-3" data-html2canvas-ignore="true">
          <summary className="flex cursor-pointer list-none items-center justify-between text-[14px] font-semibold text-tone-deep">
            {SEASON_META[displaySeason].label} 전체 컬러 차트 보기
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
          </summary>
          {gender === 'male' ? (
            <img
              src={assetUrl(MALE_STYLE[displaySeason].palette)}
              alt={`${SEASON_META[displaySeason].label} 컬러 차트`}
              className="mx-auto mt-3 w-full max-w-[360px]"
              loading="lazy"
            />
          ) : (
            <>
              <p className="mt-2 text-[12px] text-ink-sub">옆으로 넘겨 보세요.</p>
              <div className="-mx-5 mt-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
                {FEMALE_STYLE[displaySeason].colorCards.map((src, i) => (
                  <img
                    key={src}
                    src={assetUrl(src)}
                    alt={`${SEASON_META[displaySeason].label} 컬러 카드 ${i + 1}`}
                    className="w-[78%] flex-shrink-0 snap-center rounded-xl border border-border"
                    loading="lazy"
                  />
                ))}
              </div>
            </>
          )}
        </details>
      </div>

      {/* Female style guide (COLOR.M 여성 컬러 톤 카드) */}
      {gender === 'female' && (
        <FemaleStyleGuide season={displaySeason} />
      )}

      {/* Male style guide (COLOR.M 남성 패션 카드) */}
      {gender === 'male' && (
        <div className="mt-4 overflow-hidden rounded-2xl bg-card shadow-soft">
          <div className="px-5 pt-5">
            <p className="font-mono text-[12px] tracking-[0.15em] text-tone-deep">MAN'S FASHION STYLE</p>
            <p className="mt-1 text-[17px] font-bold leading-snug text-ink">
              {SEASON_META[displaySeason].label} 타입 남성 스타일
            </p>
          </div>
          <img
            src={assetUrl(MALE_STYLE[displaySeason].illustration)}
            alt={`${SEASON_META[displaySeason].label} 타입 남성 스타일 일러스트`}
            className="mx-auto mt-3 w-full max-w-[340px]"
            draggable={false}
          />

          <div className="p-5">
            <p className="text-[15px] font-semibold text-ink">대표 컬러</p>
            <div className="mt-3 grid grid-cols-4 gap-x-2 gap-y-3">
              {MALE_STYLE[displaySeason].keyColors.map((c) => (
                <div key={c.name} className="flex flex-col items-center">
                  <span
                    className="block h-12 w-full rounded-lg ring-1 ring-inset ring-black/10"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="mt-1 text-center text-[12px] leading-tight text-ink-sub">{c.name}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-[15px] font-semibold text-ink">추천 패턴</p>
            <div className="mt-3 flex gap-4">
              {MALE_STYLE[displaySeason].patterns.map((src) => (
                <img
                  key={src}
                  src={assetUrl(src)}
                  alt=""
                  className="h-16 w-16 rounded-full object-cover ring-1 ring-black/10"
                  draggable={false}
                />
              ))}
            </div>

            <p className="mt-5 text-[15px] font-semibold text-ink">추천 넥타이 컬러</p>
            <div className="mt-3 grid grid-cols-6 gap-1.5">
              {RESULT_TIES[displaySeason].map((src) => (
                <img
                  key={src}
                  src={assetUrl(src)}
                  alt=""
                  className="mx-auto h-28 w-auto object-contain"
                  draggable={false}
                />
              ))}
            </div>

            <p className="mt-5 text-[15px] font-semibold text-ink">어울리는 헤어 컬러</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {MALE_STYLE[displaySeason].hair.map((c) => (
                <span key={c} className="rounded-full border border-border px-2.5 py-1 text-[13px] text-ink-sub">
                  {c}
                </span>
              ))}
            </div>
            <img
              src={assetUrl(MALE_STYLE[displaySeason].hairImage)}
              alt={`${SEASON_META[displaySeason].label} 타입 헤어 컬러 견본`}
              className="mt-3 w-full"
              draggable={false}
            />
          </div>
        </div>
      )}

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
          onClick={() => setShowAnswers((v) => !v)}
          aria-expanded={showAnswers}
          className={`flex w-full items-center justify-center gap-2 rounded-full border-2 bg-card py-3.5 text-[15px] font-semibold text-ink transition-colors active:scale-[0.98] hover:border-tone ${
            showAnswers ? 'border-magenta' : 'border-border'
          }`}
        >
          <Pencil className="h-4 w-4" />
          선택한 답변 수정하기
          <ChevronDown className={`h-4 w-4 transition-transform ${showAnswers ? 'rotate-180' : ''}`} />
        </button>

        {showAnswers && (
          <div className="animate-fade-in rounded-2xl bg-card p-4 shadow-soft">
            <p className="mb-2 text-[13px] text-ink-sub">고치고 싶은 문항을 누르면 바로 이동해요.</p>
            {(['step1', 'step2'] as const).map((stage) => (
              <div key={stage} className="mt-2">
                <p className="mb-1.5 font-mono text-[12px] font-semibold tracking-wide text-magenta">
                  {stage === 'step1' ? 'STEP 1 · 기본 체크' : 'STEP 2 · 4계절 컬러그룹'}
                </p>
                <ul className="divide-y divide-border/70">
                  {answerItems
                    .filter((a) => a.stage === stage)
                    .map((a) => (
                      <li key={`${a.stage}-${a.index}`}>
                        <button
                          onClick={() => onJumpToAnswer(a.stage, a.index)}
                          className="flex w-full items-center gap-2 py-2.5 text-left transition-colors hover:bg-magenta/5"
                        >
                          <span className="min-w-0 flex-1 truncate text-[14px] text-ink">{a.label}</span>
                          <span className="flex max-w-[45%] items-center gap-1.5 text-[13px] font-semibold text-ink-sub">
                            {a.color && (
                              <span
                                className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                style={{ backgroundColor: a.color }}
                              />
                            )}
                            <span className="truncate">{a.value}</span>
                          </span>
                          <ChevronRight className="h-4 w-4 flex-shrink-0 text-ink-sub/60" />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
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

function TagRow({ tags }: { tags: string[] }) {
  return (
    <p className="mt-1 flex flex-wrap gap-x-1.5 text-[13px] leading-relaxed text-tone-deep">
      {tags.map((t) => (
        <span key={t} className="whitespace-nowrap">
          {t}
        </span>
      ))}
    </p>
  );
}

/** 여성 결과 스타일 가이드: 일러스트·파운데이션·립·피부/섀도·헤어·향 */
function FemaleStyleGuide({ season }: { season: Season }) {
  const s = FEMALE_STYLE[season];
  const label = SEASON_META[season].label;
  return (
    <div className="mt-4 overflow-hidden rounded-2xl bg-card shadow-soft">
      <div className="px-5 pt-5">
        <p className="font-mono text-[12px] tracking-[0.15em] text-tone-deep">WOMAN'S STYLE</p>
        <p className="mt-1 text-[17px] font-bold leading-snug text-ink">{label} 타입 여성 스타일</p>
        <p className="mt-1 text-[14px] leading-relaxed text-ink-sub">{s.description}</p>
        <TagRow tags={s.tags} />
      </div>
      <img
        src={assetUrl(s.illustration)}
        alt={`${label} 타입 여성 스타일 일러스트`}
        className="mx-auto mt-3 w-full max-w-[340px]"
        draggable={false}
      />

      <div className="p-5">
        <p className="text-[15px] font-semibold text-ink">파운데이션</p>
        <div className="mt-3 grid grid-cols-6 gap-1.5">
          {s.foundation.map((f) => (
            <div key={f.code} className="flex flex-col items-center">
              <span
                className="block h-10 w-10 rounded-full ring-1 ring-inset ring-black/10"
                style={{ backgroundColor: f.hex }}
              />
              <span className="mt-1 font-mono text-[11px] text-ink-sub">{f.code}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[15px] font-semibold text-ink">립 컬러</p>
        <TagRow tags={s.lipTags} />
        <div className="mt-3 grid grid-cols-3 gap-x-2 gap-y-3">
          {s.lips.map((src) => (
            <img key={src} src={assetUrl(src)} alt="" className="w-full" draggable={false} />
          ))}
        </div>

        <p className="mt-6 text-[15px] font-semibold text-ink">블러셔 · 파운데이션 · 아이섀도</p>
        <TagRow tags={s.skinTags} />
        <img
          src={assetUrl(s.skin)}
          alt={`${label} 타입 블러셔, 파운데이션, 아이섀도 컬러`}
          className="mx-auto mt-3 w-full max-w-[300px]"
          draggable={false}
        />

        <p className="mt-6 text-[15px] font-semibold text-ink">어울리는 헤어 컬러</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {s.hair.map((c) => (
            <span key={c} className="rounded-full border border-border px-2.5 py-1 text-[13px] text-ink-sub">
              {c}
            </span>
          ))}
        </div>
        <img
          src={assetUrl(s.hairImage)}
          alt={`${label} 타입 헤어 컬러 견본`}
          className="mx-auto mt-3 w-full max-w-[300px]"
          draggable={false}
        />

        <p className="mt-6 text-[15px] font-semibold text-ink">어울리는 향</p>
        <div className="mt-2 flex items-center gap-4">
          <img
            src={assetUrl(s.perfume)}
            alt={`${label} 타입 향수 일러스트`}
            className="h-24 w-auto flex-shrink-0"
            draggable={false}
          />
          <div className="flex flex-wrap gap-1.5">
            {s.scents.map((c) => (
              <span key={c} className="rounded-full bg-tone-soft/30 px-2.5 py-1 text-[13px] text-ink">
                {c}
              </span>
            ))}
          </div>
        </div>
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
