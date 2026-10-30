import { Clock, ChevronRight } from 'lucide-react';
import type { Gender } from '@/data/questions';

interface IntroScreenProps {
  onStart: (gender: Gender) => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="animate-fade-in">
      {/* Title */}
      <div className="text-center pt-4">
        <p className="font-mono text-base font-semibold tracking-[0.12em] text-magenta">
          Personal Color Self Check
        </p>
      </div>

      {/* Hero card */}
      <div className="mt-8 rounded-3xl bg-card p-7 shadow-card">
        <div className="mb-5 inline-flex rounded-full bg-tone-soft/40 px-3 py-1">
          <span className="text-xs font-medium text-tone-deep">셀프 진단</span>
        </div>
        <h1 className="font-display text-[28px] font-black leading-snug text-ink">
          나에게 어울리는
          <br />
          컬러 찾기
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-sub">
          간단한 셀프 체크를 통해
          <br />
          나와 조화를 이루는 컬러의 방향을 알아보세요.
        </p>

        <div className="mt-5 flex items-center gap-2 text-ink-sub">
          <Clock className="h-4 w-4 text-tone" />
          <span className="text-sm">약 3분 소요</span>
        </div>
      </div>

      {/* Notice */}
      <div className="mt-5 rounded-2xl border border-border bg-card/60 p-5">
        <p className="text-[13px] leading-relaxed text-ink-sub">
          이 진단은 책의 내용을 이해하기 위한 입문용 셀프 체크입니다. 개인의 판단, 조명,
          모니터 환경에 따라 결과가 달라질 수 있으며 전문가의 퍼스널컬러 진단 결과와 다를 수
          있습니다.
        </p>
      </div>

      {/* CTA: 성별 선택 후 바로 시작 */}
      <p className="mt-7 text-center text-[13px] text-ink-sub">진단 유형을 선택해 시작하세요</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => onStart('female')}
          className="flex items-center justify-center gap-1.5 rounded-full bg-magenta py-4 text-base font-semibold text-white shadow-soft transition-all active:scale-[0.98] hover:bg-magenta-deep"
        >
          여성 진단
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => onStart('male')}
          className="flex items-center justify-center gap-1.5 rounded-full bg-ink py-4 text-base font-semibold text-white shadow-soft transition-all active:scale-[0.98] hover:bg-ink/85"
        >
          남성 진단
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
