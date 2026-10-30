import { Check } from 'lucide-react';

interface OptionButtonProps {
  label: string;
  text: string;
  selected: boolean;
  onSelect: () => void;
}

export function OptionButton({ label, text, selected, onSelect }: OptionButtonProps) {
  return (
    <button
      onClick={onSelect}
      className={`group relative w-full rounded-2xl border-2 p-4 text-left transition-all duration-200 active:scale-[0.98] ${
        selected
          ? 'border-magenta bg-magenta/5 shadow-selected'
          : 'border-border bg-card/80 hover:border-magenta/40'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[15px] font-semibold transition-colors ${
            selected ? 'bg-magenta text-white' : 'bg-border/60 text-ink-sub'
          }`}
        >
          {selected ? <Check className="h-4 w-4" /> : label}
        </span>
        <p
          className={`text-[17px] leading-relaxed transition-colors ${
            selected ? 'text-ink' : 'text-ink-sub'
          }`}
        >
          {text}
        </p>
      </div>
    </button>
  );
}
