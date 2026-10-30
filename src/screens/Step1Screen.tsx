import { ChevronRight } from 'lucide-react';
import { ProgressHeader } from '@/components/ProgressHeader';
import { OptionButton } from '@/components/OptionButton';
import type { Step1Question } from '@/data/questions';
import type { Temperature, Clarity } from '@/data/colorData';

interface Step1ScreenProps {
  questions: Step1Question[];
  currentIndex: number;
  answers: Record<number, 'A' | 'B'>;
  onSelect: (questionId: number, optionId: 'A' | 'B', temperature?: Temperature, clarity?: Clarity) => void;
  onBack: () => void;
  onNext: () => void;
}

export function Step1Screen({
  questions,
  currentIndex,
  answers,
  onSelect,
  onBack,
  onNext,
}: Step1ScreenProps) {
  const question = questions[currentIndex];
  const selected = answers[question.id];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="animate-slide-in">
      <ProgressHeader
        stepLabel="STEP 1"
        stepTitle="퍼스널컬러 기본 체크"
        current={currentIndex + 1}
        total={questions.length}
        onBack={onBack}
        progress={progress}
      />

      <div className="mb-3">
        <p className="text-[13px] font-medium text-tone-deep">퍼스널컬러 기본 체크</p>
        <h2 className="mt-1 font-display text-[22px] font-black text-ink">나의 기본 컬러 특성 알아보기</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-sub">
          각 문항에서 나에게 더 가깝거나, 평소 더 잘 어울린다고 느끼는 항목을 하나씩 선택하세요.
        </p>
      </div>

      <div className="mt-5 rounded-2xl bg-card p-5 shadow-card">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-magenta text-[13px] font-bold text-white">
            {question.id}
          </span>
          <h3 className="text-[17px] font-semibold text-ink">{question.title}</h3>
        </div>

        <div className="space-y-3">
          {question.options.map((opt) => (
            <OptionButton
              key={opt.id}
              label={opt.id}
              text={opt.text}
              selected={selected === opt.id}
              onSelect={() => onSelect(question.id, opt.id, opt.temperature, opt.clarity)}
            />
          ))}
        </div>
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
          disabled={!selected}
          className={`flex-[1.6] rounded-full py-3.5 text-[15px] font-semibold text-white transition-all active:scale-[0.98] ${
            selected
              ? 'bg-magenta shadow-soft hover:bg-magenta-deep'
              : 'cursor-not-allowed bg-border'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            {currentIndex === questions.length - 1 ? '중간 결과 보기' : '다음'}
            <ChevronRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </div>
  );
}
