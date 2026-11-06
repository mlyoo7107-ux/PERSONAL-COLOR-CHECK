import { Clock, ChevronRight, Sun, Smile, Shirt, Smartphone } from 'lucide-react';
import type { Gender } from '@/data/questions';

// 정확한 셀프 체크를 위한 준비 안내
const PREP_TIPS = [
  { icon: Sun, text: '자연광이 드는 창가에서 거울을 보며 답해요.' },
  { icon: Smile, text: '맨얼굴이나 가벼운 메이크업 상태가 좋아요.' },
  { icon: Shirt, text: '흰색이나 무채색 옷을 입으면 비교가 쉬워요.' },
  { icon: Smartphone, text: '화면 밝기는 중간 이상, 야간 모드·블루라이트 필터는 꺼 주세요.' },
];

interface IntroScreenProps {
  onStart: (gender: Gender) => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="animate-fade-in">
      {/* Title */}
      <div className="text-center pt-4">
        <p className="font-mono text-[19px] font-semibold tracking-[0.08em] text-magenta">
          Personal Color Self Check
        </p>
      </div>

      {/* Hero card */}
      <div className="mt-8 rounded-3xl bg-card p-7 shadow-card">
        <div className="mb-5 inline-flex rounded-full bg-tone-soft/40 px-3 py-1">
          <span className="text-[13px] font-medium text-tone-deep">셀프 진단</span>
        </div>
        <h1 className="font-display text-[30px] font-black leading-snug text-ink">
          나에게 어울리는
          <br />
          컬러 찾기
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-ink-sub">
          간단한 셀프 체크를 통해
          <br />
          나와 조화를 이루는 컬러의 방향을 알아보세요.
        </p>

        <div className="mt-5 flex items-center gap-2 text-ink-sub">
          <Clock className="h-4 w-4 text-tone" />
          <span className="text-[15px]">약 3분 소요</span>
        </div>
      </div>

      {/* Prep tips */}
      <div className="mt-5 rounded-2xl bg-card p-5 shadow-soft">
        <p className="text-[16px] font-semibold text-ink">정확한 체크를 위한 준비</p>
        <ul className="mt-3 space-y-2.5">
          {PREP_TIPS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-tone-soft/30">
                <Icon className="h-3.5 w-3.5 text-tone-deep" />
              </span>
              <span className="text-[15px] leading-relaxed text-ink-sub">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notice */}
      <div className="mt-5 rounded-2xl border border-border bg-card/60 p-5">
        <p className="text-[15px] leading-relaxed text-ink-sub">
          이 진단은 책의 내용을 이해하기 위한 입문용 셀프 체크입니다. 개인의 판단, 조명,
          모니터 환경에 따라 결과가 달라질 수 있으며 전문가의 퍼스널컬러 진단 결과와 다를 수
          있습니다.
        </p>
      </div>

      {/* CTA: 성별 선택 후 바로 시작 */}
      <p className="mt-7 text-center text-[15px] text-ink-sub">진단 유형을 선택해 시작하세요</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => onStart('female')}
          className="flex items-center justify-center gap-1.5 rounded-full bg-magenta py-4 text-[17px] font-semibold text-white shadow-soft transition-all active:scale-[0.98] hover:bg-magenta-deep"
        >
          여성 진단
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => onStart('male')}
          className="flex items-center justify-center gap-1.5 rounded-full bg-ink py-4 text-[17px] font-semibold text-white shadow-soft transition-all active:scale-[0.98] hover:bg-ink/85"
        >
          남성 진단
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
