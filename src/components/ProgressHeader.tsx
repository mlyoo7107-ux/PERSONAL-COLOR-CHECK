import { ArrowLeft } from 'lucide-react';

interface ProgressHeaderProps {
  stepLabel: string;
  stepTitle: string;
  current: number;
  total: number;
  onBack: () => void;
  /** 0-100 */
  progress: number;
}

export function ProgressHeader({
  stepLabel,
  stepTitle,
  current,
  total,
  onBack,
  progress,
}: ProgressHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-ink-sub transition-colors hover:text-ink active:scale-95"
          aria-label="이전 단계로"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-xs font-medium tracking-wide text-ink-sub">
          <span className="font-mono font-semibold text-magenta">{stepLabel}</span>
          <span className="mx-1.5 text-border">·</span>
          {stepTitle}
        </span>
        <span className="font-mono text-xs font-semibold text-ink-sub">
          {current} <span className="text-border">/</span> {total}
        </span>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border/70">
        <div
          className="progress-fill h-full rounded-full bg-gradient-to-r from-magenta to-magenta-soft"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
