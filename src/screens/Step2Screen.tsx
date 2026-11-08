import { Check, ChevronRight } from 'lucide-react';
import { ProgressHeader } from '@/components/ProgressHeader';
import { QuestionNav } from '@/components/QuestionNav';
import { assetUrl } from '@/data/colorData';
import type { Season, ColorGroup } from '@/data/colorData';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

interface Step2ScreenProps {
  groups: ColorGroup[];
  /** 그룹별 카드 순서 (섞인 계절 순서) */
  orders: Record<string, Season[]>;
  currentIndex: number;
  selections: Record<string, Season | undefined>;
  onSelect: (groupId: string, season: Season) => void;
  onBack: () => void;
  onNext: () => void;
  onJump: (index: number) => void;
  onFinishEdit?: () => void;
}

export function Step2Screen({
  groups,
  orders,
  currentIndex,
  selections,
  onSelect,
  onBack,
  onNext,
  onJump,
  onFinishEdit,
}: Step2ScreenProps) {
  const group = groups[currentIndex];
  const selectedSeason = selections[group.id];
  const progress = ((currentIndex + 1) / groups.length) * 100;
  // 진단 시작 때 섞어 둔 순서대로 보여 줌 (순서가 없으면 원래 순서)
  const order = orders[group.id];
  const orderedPalettes = order
    ? order
        .map((season) => group.palettes.find((p) => p.season === season))
        .filter((p): p is (typeof group.palettes)[number] => Boolean(p))
    : group.palettes;

  return (
    <div className="animate-slide-in">
      <ProgressHeader
        stepLabel="STEP 2"
        stepTitle="4계절 컬러그룹 셀프 진단"
        current={currentIndex + 1}
        total={groups.length}
        onBack={onBack}
        progress={progress}
      />
      <QuestionNav
        answered={groups.map((g) => Boolean(selections[g.id]))}
        current={currentIndex}
        onJump={onJump}
        onFinishEdit={onFinishEdit}
      />

      <div className="mb-3">
        <p className="text-[13px] font-medium text-tone-deep">4계절 컬러그룹 알아보기</p>
        <h2 className="mt-1 font-display text-[22px] font-black text-ink">
          {group.title ?? `${group.name} 컬러`}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-sub">
          {group.guide ??
            '각 컬러 그룹에서 얼굴 가까이에 대었을 때 비교적 잘 어울릴 것 같은 색을 선택하세요.'}
        </p>
      </div>

      <div className="mt-3 rounded-xl border border-border bg-tone-soft/15 p-3">
        <p className="text-[14px] leading-relaxed text-tone-deep">
          화면에 보이는 색은 스마트폰과 모니터 환경에 따라 실제 색과 다르게 보일 수 있습니다.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {orderedPalettes.map((palette, i) => {
          const isSelected = selectedSeason === palette.season;
          return (
            <button
              key={`${group.id}-${palette.season}`}
              onClick={() => onSelect(group.id, palette.season)}
              className={`relative overflow-hidden rounded-2xl border-2 bg-card p-3 text-left transition-all duration-200 active:scale-[0.98] ${
                isSelected
                  ? 'border-magenta shadow-selected scale-[1.02]'
                  : 'border-border hover:border-magenta/40'
              }`}
            >
              {isSelected && (
                <span className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-magenta text-white shadow">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
              {/* 계절 이름은 결과 전까지 숨김 (선입견 없이 색만 보고 고르도록) */}
              <div className="mb-2 flex items-center gap-1.5">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[13px] font-semibold ${
                    isSelected ? 'bg-magenta text-white' : 'bg-border/60 text-ink-sub'
                  }`}
                >
                  {OPTION_LETTERS[i]}
                </span>
              </div>

              {palette.images ? (
                <div className="flex justify-center gap-3">
                  {palette.images.map((src) => (
                    <img
                      key={src}
                      src={assetUrl(src)}
                      alt=""
                      className="h-32 w-auto object-contain"
                      draggable={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex gap-1.5">
                  {palette.colors.map((hex) => (
                    <div
                      key={hex}
                      className="h-12 flex-1 rounded-lg"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              )}

              <p className="mt-2 text-[14px] leading-snug text-ink-sub">{palette.description}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 rounded-full border-2 border-border bg-card py-3.5 text-[15px] font-semibold text-ink-sub transition-colors active:scale-[0.98] hover:border-tone"
        >
          이전
        </button>
        <button
          onClick={onNext}
          disabled={!selectedSeason}
          className={`flex-[1.6] rounded-full py-3.5 text-[15px] font-semibold text-white transition-all active:scale-[0.98] ${
            selectedSeason
              ? 'bg-magenta shadow-soft hover:bg-magenta-deep'
              : 'cursor-not-allowed bg-border'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            {currentIndex === groups.length - 1 ? '최종 결과 보기' : '다음'}
            <ChevronRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </div>
  );
}
