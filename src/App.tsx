import { useState } from 'react';
import { IntroScreen } from '@/screens/IntroScreen';
import { Step1Screen } from '@/screens/Step1Screen';
import { Step1ResultScreen } from '@/screens/Step1ResultScreen';
import { Step2Screen } from '@/screens/Step2Screen';
import { ResultScreen } from '@/screens/ResultScreen';
import { Footer } from '@/components/Footer';
import { STEP1_QUESTIONS, type Gender, type OptionId, type Tone, type Depth, type Step1Option } from '@/data/questions';
import { COLOR_GROUPS, TIE_GROUP, SEASON_META } from '@/data/colorData';
import type { AnswerItem } from '@/screens/ResultScreen';
import type { Season, Clarity } from '@/data/colorData';
import {
  createEmptyScores,
  computeDiagnosis,
  type Scores,
  type DiagnosisResult,
} from '@/utils/scoring';

type Screen = 'intro' | 'step1' | 'step1Result' | 'step2' | 'result';

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

/** STEP 2 그룹마다 계절 카드 순서를 무작위로 섞음 */
function shuffleOrders(): Record<string, Season[]> {
  const orders: Record<string, Season[]> = {};
  for (const g of [...COLOR_GROUPS, TIE_GROUP]) {
    const arr = [...SEASONS];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    orders[g.id] = arr;
  }
  return orders;
}

/** 선택지가 올려 주는 점수 항목 */
function optionScoreKeys(opt?: Step1Option): (keyof Scores)[] {
  if (!opt) return [];
  const keys: (keyof Scores)[] = [];
  if (opt.temperature) keys.push(opt.temperature);
  if (opt.clarity) keys.push(opt.clarity);
  if (opt.depth) keys.push(opt.depth);
  return keys;
}

// 결과 화면 답변 목록에 보여 줄 짧은 이름
const TONE_LABEL: Record<Tone, string> = { warm: '웜', neutral: '뉴트럴', cool: '쿨' };
const CLARITY_LABEL: Record<Clarity, string> = { clear: '선명', soft: '부드러움' };
const DEPTH_LABEL: Record<Depth, string> = { light: '밝은 톤', deep: '깊은 톤' };

function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [gender, setGender] = useState<Gender>('female');
  const [step1Index, setStep1Index] = useState(0);
  const [step2Index, setStep2Index] = useState(0);
  const [answers, setAnswers] = useState<Record<number, OptionId>>({});
  const [selections, setSelections] = useState<Record<string, Season | undefined>>({});
  const [scores, setScores] = useState<Scores>(createEmptyScores());
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  // 결과 화면에서 답변을 고치러 들어온 상태
  const [editing, setEditing] = useState(false);
  // STEP 2 카드 순서 (진단마다 섞음, 계절 이름은 결과 전까지 숨김)
  const [step2Orders, setStep2Orders] = useState<Record<string, Season[]>>(shuffleOrders);

  const questions = STEP1_QUESTIONS[gender];
  // 남성은 STEP 2 마지막에 넥타이 비교 문항을 추가
  const step2Groups = gender === 'male' ? [...COLOR_GROUPS, TIE_GROUP] : COLOR_GROUPS;

  const allAnswered =
    questions.every((q) => answers[q.id]) && step2Groups.every((g) => selections[g.id]);

  const showResult = () => {
    setResult(computeDiagnosis(scores));
    setEditing(false);
    setScreen('result');
    window.scrollTo(0, 0);
  };

  // 특정 문항으로 바로 이동
  const jumpTo = (stage: 'step1' | 'step2', index: number) => {
    if (stage === 'step1') setStep1Index(index);
    else setStep2Index(index);
    setScreen(stage);
    window.scrollTo(0, 0);
  };

  const jumpFromResult = (stage: 'step1' | 'step2', index: number) => {
    setEditing(true);
    jumpTo(stage, index);
  };

  // 결과 화면의 "내 답변" 목록
  const answerItems: AnswerItem[] = [
    ...questions.map((q, i) => {
      const opt = q.options.find((o) => o.id === answers[q.id]);
      return {
        stage: 'step1' as const,
        index: i,
        label: `${i + 1}. ${q.title}`,
        value: opt
          ? opt.heading ??
            (opt.temperature
              ? TONE_LABEL[opt.temperature]
              : opt.clarity
              ? CLARITY_LABEL[opt.clarity]
              : opt.depth
              ? DEPTH_LABEL[opt.depth]
              : opt.id)
          : '미응답',
      };
    }),
    ...step2Groups.map((g, i) => {
      const season = selections[g.id];
      return {
        stage: 'step2' as const,
        index: i,
        label: g.title ?? `${g.name} 컬러`,
        value: season ? SEASON_META[season].label : '미응답',
        color: season ? SEASON_META[season].color : undefined,
      };
    }),
  ];

  const startDiagnosis = (selected: Gender) => {
    // 다른 성별로 시작하면 이전 응답이 섞이지 않도록 초기화
    if (selected !== gender) {
      setAnswers({});
      setSelections({});
      setScores(createEmptyScores());
      setResult(null);
      setStep2Orders(shuffleOrders());
    }
    setGender(selected);
    setScreen('step1');
    setStep1Index(0);
  };

  const handleStep1Select = (questionId: number, optionId: OptionId) => {
    const prev = answers[questionId];
    if (prev === optionId) return;
    const q = questions.find((qq) => qq.id === questionId)!;
    const nextOpt = q.options.find((o) => o.id === optionId)!;
    const prevOpt = prev ? q.options.find((o) => o.id === prev) : undefined;

    setAnswers((a) => ({ ...a, [questionId]: optionId }));
    setScores((s) => {
      const next = { ...s };
      // 이전 선택 점수를 빼고 새 선택 점수를 더함
      for (const key of optionScoreKeys(prevOpt)) next[key] = Math.max(0, next[key] - 1);
      for (const key of optionScoreKeys(nextOpt)) next[key] += 1;
      return next;
    });
  };

  const handleStep2Select = (groupId: string, season: Season) => {
    const prev = selections[groupId];
    if (prev === season) return;

    setSelections((sel) => ({ ...sel, [groupId]: season }));
    setScores((s) => {
      const next = { ...s };
      if (prev) next[prev] = Math.max(0, next[prev] - 1);
      next[season] += 1;
      return next;
    });
  };

  const handleStep1Next = () => {
    if (step1Index < questions.length - 1) {
      setStep1Index(step1Index + 1);
    } else {
      setScreen('step1Result');
    }
  };

  const handleStep1Back = () => {
    if (step1Index > 0) {
      setStep1Index(step1Index - 1);
    } else {
      setScreen('intro');
    }
  };

  const handleStep2Next = () => {
    if (step2Index < step2Groups.length - 1) {
      setStep2Index(step2Index + 1);
    } else {
      showResult();
    }
  };

  const handleStep2Back = () => {
    if (step2Index > 0) {
      setStep2Index(step2Index - 1);
    } else {
      setScreen('step1Result');
    }
  };

  const handleRestart = () => {
    setScreen('intro');
    setStep1Index(0);
    setStep2Index(0);
    setAnswers({});
    setSelections({});
    setScores(createEmptyScores());
    setResult(null);
    setEditing(false);
    setStep2Orders(shuffleOrders());
  };

  // 수정 중이고 모든 문항에 답했을 때만 "결과로 바로 가기" 표시
  const finishEdit = editing && allAnswered ? showResult : undefined;

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto w-full max-w-[480px] px-5 pt-6">
        {screen === 'intro' && <IntroScreen onStart={startDiagnosis} />}

        {screen === 'step1' && (
          <Step1Screen
            questions={questions}
            currentIndex={step1Index}
            answers={answers}
            onSelect={handleStep1Select}
            onBack={handleStep1Back}
            onNext={handleStep1Next}
            onJump={(i) => jumpTo('step1', i)}
            onFinishEdit={finishEdit}
          />
        )}

        {screen === 'step1Result' && (
          <Step1ResultScreen
            scores={scores}
            onContinue={() => {
              setStep2Index(0);
              setScreen('step2');
            }}
            onBack={() => setScreen('step1')}
          />
        )}

        {screen === 'step2' && (
          <Step2Screen
            groups={step2Groups}
            orders={step2Orders}
            currentIndex={step2Index}
            selections={selections}
            onSelect={handleStep2Select}
            onBack={handleStep2Back}
            onNext={handleStep2Next}
            onJump={(i) => jumpTo('step2', i)}
            onFinishEdit={finishEdit}
          />
        )}

        {screen === 'result' && result && (
          <ResultScreen
            result={result}
            gender={gender}
            answerItems={answerItems}
            onRestart={handleRestart}
            onJumpToAnswer={jumpFromResult}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
