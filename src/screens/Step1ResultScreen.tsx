import { ChevronRight, Sparkles, Sun, Snowflake, Thermometer } from 'lucide-react';
import { computeStep1Result } from '@/utils/scoring';
import type { Scores } from '@/utils/scoring';

interface Step1ResultScreenProps {
  scores: Scores;
  onContinue: () => void;
  onBack: () => void;
}

export function Step1ResultScreen({ scores, onContinue, onBack }: Step1ResultScreenProps) {
  const { temperature, message } = computeStep1Result(scores);

  const icon =
    temperature === 'warm' ? (
      <Sun className="h-6 w-6 text-season-autumn" />
    ) : temperature === 'cool' ? (
      <Snowflake className="h-6 w-6 text-season-winter" />
    ) : (
      <Thermometer className="h-6 w-6 text-tone" />
    );

  const label =
    temperature === 'warm' ? '웜톤 가능성' : temperature === 'cool' ? '쿨톤 가능성' : '뉴트럴 가능성';

  return (
    <div className="animate-scale-in">
      <div className="mb-6 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-magenta" />
        <span className="text-xs font-medium tracking-wide text-ink-sub">
          STEP 1 · 중간 결과
        </span>
      </div>

      <div className="rounded-3xl bg-card p-7 shadow-card">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tone-soft/30">
            {icon}
          </div>
          <div>
            <p className="text-xs text-ink-sub">예상 톤</p>
            <p className="font-display text-lg font-black text-ink">{label}</p>
          </div>
        </div>

        <p className="text-[15px] leading-relaxed text-ink">{message}</p>

        <div className="mt-6 space-y-3">
          <ScoreRow label="웜톤 점수" value={scores.warm} color="#D3A04A" max={5} />
          <ScoreRow label="쿨톤 점수" value={scores.cool} color="#315F9D" max={5} />
        </div>
      </div>

      <p className="mt-5 text-center text-[13px] leading-relaxed text-ink-sub">
        이제 4계절 컬러그룹을 비교하여
        <br />
        더 구체적인 컬러 방향을 알아보겠습니다.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 rounded-full border-2 border-border bg-card py-3.5 text-sm font-semibold text-ink-sub transition-colors active:scale-[0.98] hover:border-tone"
        >
          이전
        </button>
        <button
          onClick={onContinue}
          className="flex-[2] rounded-full bg-magenta py-3.5 text-sm font-semibold text-white shadow-soft transition-all active:scale-[0.98] hover:bg-magenta-deep"
        >
          <span className="flex items-center justify-center gap-1.5">
            4계절 컬러 진단 계속하기
            <ChevronRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </div>
  );
}

function ScoreRow({
  label,
  value,
  color,
  max,
}: {
  label: string;
  value: number;
  color: string;
  max: number;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[13px]">
        <span className="text-ink-sub">{label}</span>
        <span className="font-semibold text-ink">{value}점</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-border/60">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
