import { ChevronRight } from 'lucide-react';

interface QuestionNavProps {
  /** 각 문항의 응답 여부 */
  answered: boolean[];
  current: number;
  onJump: (index: number) => void;
  /** 수정 중이고 모든 응답이 끝났을 때만 전달: "결과로 바로 가기" 버튼 표시 */
  onFinishEdit?: () => void;
}

/**
 * 문항 번호 바로가기
 * - 응답한 문항과 다음에 답할 문항까지 누를 수 있음
 */
export function QuestionNav({ answered, current, onJump, onFinishEdit }: QuestionNavProps) {
  const firstUnanswered = answered.findIndex((a) => !a);
  const reachable = firstUnanswered === -1 ? answered.length - 1 : firstUnanswered;

  return (
    <div className="-mt-3 mb-5">
      <div className="flex flex-wrap items-center gap-1.5">
        {answered.map((isAnswered, i) => {
          const isCurrent = i === current;
          const enabled = i <= reachable;
          return (
            <button
              key={i}
              onClick={() => enabled && onJump(i)}
              disabled={!enabled}
              aria-label={`${i + 1}번 문항으로 이동`}
              aria-current={isCurrent ? 'step' : undefined}
              className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-[13px] font-semibold transition-all ${
                isCurrent
                  ? 'bg-magenta text-white shadow-soft'
                  : isAnswered
                  ? 'bg-magenta/10 text-magenta hover:bg-magenta/20'
                  : enabled
                  ? 'border border-dashed border-magenta/50 bg-card text-ink-sub'
                  : 'bg-border/50 text-ink-sub/50'
              }`}
            >
              {i + 1}
            </button>
          );
        })}

        {onFinishEdit && (
          <button
            onClick={onFinishEdit}
            className="ml-auto flex items-center gap-0.5 rounded-full bg-ink px-3 py-1.5 text-[13px] font-semibold text-white transition-colors active:scale-[0.98] hover:bg-ink/85"
          >
            결과로 바로 가기
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
