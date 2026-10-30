import { Check, ChevronRight } from 'lucide-react';
import { ProgressHeader } from '@/components/ProgressHeader';
import { COLOR_GROUPS, SEASON_META } from '@/data/colorData';
import type { Season } from '@/data/colorData';

interface Step2ScreenProps {
  currentIndex: number;
  selections: Record<string, Season | undefined>;
  onSelect: (groupId: string, season: Season) => void;
  onBack: () => void;
  onNext: () => void;
}

export function Step2Screen({
  currentIndex,
  selections,
  onSelect,
  onBack,
  onNext,
}: Step2ScreenProps) {
  const group = COLOR_GROUPS[currentIndex];
  const selectedSeason = selections[group.id];
  const progress = ((currentIndex + 1) / COLOR_GROUPS.length) * 100;

  return (
    <div className="animate-slide-in">
      <ProgressHeader
        stepLabel="STEP 2"
        stepTitle="4계절 컬러그룹 셀프 진단"
        current={currentIndex + 1}
        total={COLOR_GROUPS.length}
        onBack={onBack}
        progress={progress}
      />

      <div className="mb-3">
        <p className="text-[13px] font-medium text-tone-deep">4계절 컬러그룹 알아보기</p>
        <h2 className="mt-1 font-display text-[22px] font-black text-ink">{group.name} 컬러</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-sub">
          각 컬러 그룹에서 얼굴 가까이에 대었을 때 비교적 잘 어울릴 것 같은 색을 선택하세요.
        </p>
      </div>

      <div className="mt-3 rounded-xl border border-border bg-tone-soft/15 p-3">
        <p className="text-[14px] leading-relaxed text-tone-deep">
          화면에 보이는 색은 스마트폰과 모니터 환경에 따라 실제 색과 다르게 보일 수 있습니다.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {group.palettes.map((palette) => {
          const isSelected = selectedSeason === palette.season;
          const meta = SEASON_META[palette.season];
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
              <div className="mb-2 flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="text-[15px] font-semibold text-ink">{meta.label}</span>
              </div>

              <div className="flex gap-1.5">
                {palette.colors.map((hex) => (
                  <div
                    key={hex}
                    className="h-12 flex-1 rounded-lg"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>

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
            {currentIndex === COLOR_GROUPS.length - 1 ? '최종 결과 보기' : '다음'}
            <ChevronRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </div>
  );
}
