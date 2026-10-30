import { useState } from 'react';
import { IntroScreen } from '@/screens/IntroScreen';
import { Step1Screen } from '@/screens/Step1Screen';
import { Step1ResultScreen } from '@/screens/Step1ResultScreen';
import { Step2Screen } from '@/screens/Step2Screen';
import { ResultScreen } from '@/screens/ResultScreen';
import { Footer } from '@/components/Footer';
import { STEP1_QUESTIONS, type Gender } from '@/data/questions';
import { COLOR_GROUPS } from '@/data/colorData';
import type { Season, Temperature, Clarity } from '@/data/colorData';
import {
  createEmptyScores,
  computeDiagnosis,
  type Scores,
  type DiagnosisResult,
} from '@/utils/scoring';

type Screen = 'intro' | 'step1' | 'step1Result' | 'step2' | 'result';

function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [gender, setGender] = useState<Gender>('female');
  const [step1Index, setStep1Index] = useState(0);
  const [step2Index, setStep2Index] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [selections, setSelections] = useState<Record<string, Season | undefined>>({});
  const [scores, setScores] = useState<Scores>(createEmptyScores());
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const questions = STEP1_QUESTIONS[gender];

  const startDiagnosis = (selected: Gender) => {
    // 다른 성별로 시작하면 이전 응답이 섞이지 않도록 초기화
    if (selected !== gender) {
      setAnswers({});
      setSelections({});
      setScores(createEmptyScores());
      setResult(null);
    }
    setGender(selected);
    setScreen('step1');
    setStep1Index(0);
  };

  const handleStep1Select = (
    questionId: number,
    optionId: 'A' | 'B',
    temperature?: Temperature,
    clarity?: Clarity,
  ) => {
    const prev = answers[questionId];
    if (prev === optionId) return;

    setAnswers((a) => ({ ...a, [questionId]: optionId }));
    setScores((s) => {
      const next = { ...s };
      // Undo previous choice's scoring contribution
      if (prev) {
        const prevQ = questions.find((q) => q.id === questionId)!;
        const prevOpt = prevQ.options.find((o) => o.id === prev)!;
        if (prevOpt.temperature) next[prevOpt.temperature] = Math.max(0, next[prevOpt.temperature] - 1);
        if (prevOpt.clarity) next[prevOpt.clarity] = Math.max(0, next[prevOpt.clarity] - 1);
      }
      // Apply new choice
      if (temperature) next[temperature] += 1;
      if (clarity) next[clarity] += 1;
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
    if (step2Index < COLOR_GROUPS.length - 1) {
      setStep2Index(step2Index + 1);
    } else {
      setResult(computeDiagnosis(scores));
      setScreen('result');
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
  };

  const handleEditAnswers = () => {
    // Keep selections and scores; go back to Step 1 start for editing
    setStep1Index(0);
    setScreen('step1');
  };

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
            currentIndex={step2Index}
            selections={selections}
            onSelect={handleStep2Select}
            onBack={handleStep2Back}
            onNext={handleStep2Next}
          />
        )}

        {screen === 'result' && result && (
          <ResultScreen
            result={result}
            gender={gender}
            onRestart={handleRestart}
            onEditAnswers={handleEditAnswers}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
