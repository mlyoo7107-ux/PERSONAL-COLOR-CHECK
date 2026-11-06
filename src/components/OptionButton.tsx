import { Check } from 'lucide-react';
import type { ColorChip } from '@/data/questions';

interface OptionButtonProps {
  label: string;
  text: string;
  chips?: ColorChip[];
  selected: boolean;
  onSelect: () => void;
}

export function OptionButton({ label, text, chips, selected, onSelect }: OptionButtonProps) {
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
        <div className="min-w-0 flex-1">
          <p
            className={`text-[17px] leading-relaxed transition-colors ${
              selected ? 'text-ink' : 'text-ink-sub'
            }`}
          >
            {text}
          </p>

          {chips && chips.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
              {chips.map((chip) => (
                <div key={chip.name} className="flex w-[64px] flex-col items-center gap-1">
                  <span
                    className="block h-11 w-11 rounded-full shadow-sm ring-1 ring-inset ring-black/10"
                    style={{ background: chip.color }}
                    aria-hidden="true"
                  />
                  <span className="text-center text-[12px] leading-tight text-ink-sub">
                    {chip.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
