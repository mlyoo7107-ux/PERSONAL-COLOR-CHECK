import { ChevronRight } from 'lucide-react';
import { ProgressHeader } from '@/components/ProgressHeader';
import { OptionButton } from '@/components/OptionButton';
import { QuestionNav } from '@/components/QuestionNav';
import type { Step1Question, OptionId } from '@/data/questions';
import { assetUrl } from '@/data/colorData';

interface Step1ScreenProps {
  questions: Step1Question[];
  currentIndex: number;
  answers: Record<number, OptionId>;
  onSelect: (questionId: number, optionId: OptionId) => void;
  onBack: () => void;
  onNext: () => void;
  onJump: (index: number) => void;
  onFinishEdit?: () => void;
}

export function Step1Screen({
  questions,
  currentIndex,
  answers,
  onSelect,
  onBack,
  onNext,
  onJump,
  onFinishEdit,
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
      <QuestionNav
        answered={questions.map((q) => Boolean(answers[q.id]))}
        current={currentIndex}
        onJump={onJump}
        onFinishEdit={onFinishEdit}
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
        {question.note && (
          <p className="-mt-1 mb-4 text-[14px] leading-relaxed text-ink-sub">{question.note}</p>
        )}
        {question.image && (
          <div className="mb-4 rounded-xl bg-white p-2">
            <img
              src={assetUrl(question.image.src)}
              alt={question.image.alt}
              className="w-full"
              draggable={false}
            />
            {question.image.labels && (
              <div
                className="mt-1 grid text-center text-[11px] leading-tight text-ink-sub"
                style={{ gridTemplateColumns: `repeat(${question.image.labels.length}, minmax(0, 1fr))` }}
              >
                {question.image.labels.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            )}
            {question.image.scale && (
              <div className="mt-2 flex items-center gap-2 text-[12px] font-semibold text-tone-deep">
                <span>{question.image.scale[0]}</span>
                <span className="h-px flex-1 bg-border" />
                <span>{question.image.scale[1]}</span>
                <span className="h-px flex-1 bg-border" />
                <span>{question.image.scale[2]}</span>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3">
          {question.options.map((opt) => (
            <OptionButton
              key={opt.id}
              label={opt.id}
              heading={opt.heading}
              text={opt.text}
              chips={opt.chips}
              selected={selected === opt.id}
              onSelect={() => onSelect(question.id, opt.id)}
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
