import type { Temperature, Clarity } from './colorData';

export type Gender = 'female' | 'male';

export const GENDER_LABELS: Record<Gender, string> = {
  female: '여성',
  male: '남성',
};

export interface Step1Option {
  id: 'A' | 'B';
  text: string;
  temperature?: Temperature;
  clarity?: Clarity;
}

export interface Step1Question {
  id: number;
  title: string;
  options: Step1Option[];
}

// 여성 진단 문항 (기존 배포 버전과 동일)
const FEMALE_QUESTIONS: Step1Question[] = [
  {
    id: 1,
    title: '피부톤',
    options: [
      {
        id: 'A',
        text: '피부에서 노란빛, 베이지빛 또는 따뜻한 브라운빛이 느껴진다.',
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '피부에서 핑크빛, 붉은빛 또는 차가운 창백함이 느껴진다.',
        temperature: 'cool',
      },
    ],
  },
  {
    id: 2,
    title: '헤어와 눈동자 색',
    options: [
      {
        id: 'A',
        text: '골드빛이나 따뜻한 갈색, 자연스러운 브라운 계열에 가깝다.',
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '레드 브라운, 그레이 브라운 또는 짙은 블랙 계열에 가깝다.',
        temperature: 'cool',
      },
    ],
  },
  {
    id: 3,
    title: '액세서리 색',
    options: [
      {
        id: 'A',
        text: '골드 액세서리를 착용했을 때 더 자연스럽고 조화롭다.',
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '실버 액세서리를 착용했을 때 더 자연스럽고 조화롭다.',
        temperature: 'cool',
      },
    ],
  },
  {
    id: 4,
    title: '흰색 옷',
    options: [
      {
        id: 'A',
        text: '아이보리나 따뜻한 크림 화이트가 더 잘 어울린다.',
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '퓨어 화이트나 차가운 흰색이 더 잘 어울린다.',
        temperature: 'cool',
      },
    ],
  },
  {
    id: 5,
    title: '잘 어울리는 색의 느낌',
    options: [
      {
        id: 'A',
        text: '밝고 선명하며 또렷한 색을 입었을 때 얼굴이 생기 있어 보인다.',
        clarity: 'clear',
      },
      {
        id: 'B',
        text: '차분하고 부드러우며 은은한 색을 입었을 때 얼굴이 편안해 보인다.',
        clarity: 'soft',
      },
    ],
  },
  {
    id: 6,
    title: '립스틱 색',
    options: [
      {
        id: 'A',
        text: '코랄, 오렌지 또는 따뜻한 레드 계열의 립 컬러가 잘 어울린다.',
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '핑크, 로즈 또는 마젠타 계열의 립 컬러가 잘 어울린다.',
        temperature: 'cool',
      },
    ],
  },
];

// 남성 진단 문항: 메이크업·액세서리 문항을 남성 스타일링 기준으로 교체
// (점수 구조는 여성과 동일: 온도 5문항 + 청탁 1문항)
const MALE_QUESTIONS: Step1Question[] = [
  FEMALE_QUESTIONS[0],
  {
    id: 2,
    title: '헤어·눈썹과 눈동자 색',
    options: [
      {
        id: 'A',
        text: '머리카락과 눈썹, 눈동자가 따뜻한 갈색이나 자연스러운 브라운 계열에 가깝다.',
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '머리카락과 눈썹, 눈동자가 짙은 블랙이나 그레이 브라운 계열에 가깝다.',
        temperature: 'cool',
      },
    ],
  },
  {
    id: 3,
    title: '시계·안경테 색',
    options: [
      {
        id: 'A',
        text: '골드나 브라운 톤의 시계, 안경테를 착용했을 때 더 자연스럽고 조화롭다.',
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '실버나 블랙 톤의 시계, 안경테를 착용했을 때 더 자연스럽고 조화롭다.',
        temperature: 'cool',
      },
    ],
  },
  {
    id: 4,
    title: '흰색 셔츠',
    options: [
      {
        id: 'A',
        text: '아이보리나 크림 화이트 셔츠를 입었을 때 얼굴이 더 자연스러워 보인다.',
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '깨끗한 퓨어 화이트 셔츠를 입었을 때 얼굴이 더 깔끔해 보인다.',
        temperature: 'cool',
      },
    ],
  },
  {
    id: 5,
    title: '잘 어울리는 색의 느낌',
    options: [
      {
        id: 'A',
        text: '밝고 선명하며 또렷한 색을 입었을 때 얼굴이 생기 있고 인상이 또렷해 보인다.',
        clarity: 'clear',
      },
      {
        id: 'B',
        text: '차분하고 부드러우며 은은한 색을 입었을 때 얼굴이 편안하고 단정해 보인다.',
        clarity: 'soft',
      },
    ],
  },
  {
    id: 6,
    title: '니트·재킷 색',
    options: [
      {
        id: 'A',
        text: '카멜, 브라운, 올리브 계열의 니트나 재킷이 잘 어울린다.',
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '네이비, 차콜 그레이, 버건디 계열의 니트나 재킷이 잘 어울린다.',
        temperature: 'cool',
      },
    ],
  },
];

export const STEP1_QUESTIONS: Record<Gender, Step1Question[]> = {
  female: FEMALE_QUESTIONS,
  male: MALE_QUESTIONS,
};
