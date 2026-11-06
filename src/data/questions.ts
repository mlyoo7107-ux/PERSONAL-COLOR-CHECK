import type { Temperature, Clarity } from './colorData';

export type Gender = 'female' | 'male';

export const GENDER_LABELS: Record<Gender, string> = {
  female: '여성',
  male: '남성',
};

// 선택지 아래에 보여 줄 컬러칩 (color에는 HEX 값 또는 CSS 그라데이션을 넣을 수 있음)
export interface ColorChip {
  name: string;
  color: string;
}

export interface Step1Option {
  id: 'A' | 'B';
  text: string;
  chips?: ColorChip[];
  temperature?: Temperature;
  clarity?: Clarity;
}

export interface Step1Question {
  id: number;
  title: string;
  options: Step1Option[];
}

// ── 문항별 컬러칩 ─────────────────────────────────────────────
// 색을 바꾸고 싶으면 아래 HEX 값을 수정하세요.
const GOLD = 'linear-gradient(135deg, #F8E7A1 0%, #D4AF37 45%, #A97C1F 70%, #F2D675 100%)';
const ROSE_GOLD = 'linear-gradient(135deg, #F7D6C6 0%, #D9967E 45%, #B06A55 70%, #F0C3AE 100%)';
const SILVER = 'linear-gradient(135deg, #FFFFFF 0%, #C9CED5 45%, #8E949C 70%, #EEF0F3 100%)';
const WHITE_GOLD = 'linear-gradient(135deg, #FFFFFF 0%, #DCDDDA 45%, #A9AAA6 70%, #F4F4F1 100%)';
const GUNMETAL = 'linear-gradient(135deg, #8A8F96 0%, #4B4F55 50%, #6E737A 100%)';
const TORTOISE =
  'radial-gradient(circle at 30% 30%, #C8893F 0 18%, transparent 19%), radial-gradient(circle at 70% 65%, #3A2214 0 22%, transparent 23%), linear-gradient(135deg, #8A5426, #5A3418)';

const CHIPS = {
  skinWarm: [
    { name: '아이보리 베이지', color: '#F3DCBD' },
    { name: '웜 베이지', color: '#E3BC8F' },
    { name: '골든 브라운', color: '#C08A5B' },
  ],
  skinCool: [
    { name: '핑크 베이지', color: '#F1D2CC' },
    { name: '로지 핑크', color: '#E2AFAD' },
    { name: '쿨 아이보리', color: '#F6E9EA' },
  ],
  hairWarm: [
    { name: '골드 브라운', color: '#A8703C' },
    { name: '웜 브라운', color: '#7A4A2A' },
    { name: '내추럴 브라운', color: '#5C3A24' },
  ],
  hairCool: [
    { name: '레드 브라운', color: '#6B2D2A' },
    { name: '그레이 브라운', color: '#5A4F4B' },
    { name: '블랙', color: '#1E1B1D' },
  ],
  whiteWarm: [
    { name: '아이보리', color: '#FFF6E2' },
    { name: '크림 화이트', color: '#F5E8CC' },
  ],
  whiteCool: [
    { name: '퓨어 화이트', color: '#FFFFFF' },
    { name: '쿨 화이트', color: '#F1F5FA' },
  ],
  clear: [
    { name: '비비드 레드', color: '#E4002B' },
    { name: '비비드 블루', color: '#0068C8' },
    { name: '비비드 그린', color: '#00A35A' },
  ],
  soft: [
    { name: '더스티 로즈', color: '#C99A9E' },
    { name: '세이지', color: '#A5AE95' },
    { name: '소프트 블루', color: '#9FB1C3' },
  ],
} satisfies Record<string, ColorChip[]>;

// 여성 진단 문항 (기존 배포 버전과 동일)
const FEMALE_QUESTIONS: Step1Question[] = [
  {
    id: 1,
    title: '피부톤',
    options: [
      {
        id: 'A',
        text: '피부에서 노란빛, 베이지빛 또는 따뜻한 브라운빛이 느껴진다.',
        chips: CHIPS.skinWarm,
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '피부에서 핑크빛, 붉은빛 또는 차가운 창백함이 느껴진다.',
        chips: CHIPS.skinCool,
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
        chips: CHIPS.hairWarm,
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '레드 브라운, 그레이 브라운 또는 짙은 블랙 계열에 가깝다.',
        chips: CHIPS.hairCool,
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
        chips: [
          { name: '옐로 골드', color: GOLD },
          { name: '로즈 골드', color: ROSE_GOLD },
        ],
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '실버 액세서리를 착용했을 때 더 자연스럽고 조화롭다.',
        chips: [
          { name: '실버', color: SILVER },
          { name: '화이트 골드', color: WHITE_GOLD },
        ],
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
        chips: CHIPS.whiteWarm,
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '퓨어 화이트나 차가운 흰색이 더 잘 어울린다.',
        chips: CHIPS.whiteCool,
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
        chips: CHIPS.clear,
        clarity: 'clear',
      },
      {
        id: 'B',
        text: '차분하고 부드러우며 은은한 색을 입었을 때 얼굴이 편안해 보인다.',
        chips: CHIPS.soft,
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
        chips: [
          { name: '코랄', color: '#F2735C' },
          { name: '오렌지', color: '#E8622E' },
          { name: '웜 레드', color: '#C4302B' },
        ],
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '핑크, 로즈 또는 마젠타 계열의 립 컬러가 잘 어울린다.',
        chips: [
          { name: '핑크', color: '#E97FA8' },
          { name: '로즈', color: '#C45A78' },
          { name: '마젠타', color: '#B2246E' },
        ],
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
        chips: CHIPS.hairWarm,
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '머리카락과 눈썹, 눈동자가 짙은 블랙이나 그레이 브라운 계열에 가깝다.',
        chips: [
          { name: '블랙', color: '#1E1B1D' },
          { name: '소프트 블랙', color: '#34302F' },
          { name: '그레이 브라운', color: '#5A4F4B' },
        ],
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
        chips: [
          { name: '골드', color: GOLD },
          { name: '브라운', color: '#7A4A2A' },
          { name: '대모(호피)', color: TORTOISE },
        ],
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '실버나 블랙 톤의 시계, 안경테를 착용했을 때 더 자연스럽고 조화롭다.',
        chips: [
          { name: '실버', color: SILVER },
          { name: '블랙', color: '#1E1E20' },
          { name: '건메탈', color: GUNMETAL },
        ],
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
        chips: CHIPS.whiteWarm,
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '깨끗한 퓨어 화이트 셔츠를 입었을 때 얼굴이 더 깔끔해 보인다.',
        chips: CHIPS.whiteCool,
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
        chips: CHIPS.clear,
        clarity: 'clear',
      },
      {
        id: 'B',
        text: '차분하고 부드러우며 은은한 색을 입었을 때 얼굴이 편안하고 단정해 보인다.',
        chips: CHIPS.soft,
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
        chips: [
          { name: '카멜', color: '#C19A6B' },
          { name: '브라운', color: '#7B4B2A' },
          { name: '올리브', color: '#6E6B3A' },
        ],
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '네이비, 차콜 그레이, 버건디 계열의 니트나 재킷이 잘 어울린다.',
        chips: [
          { name: '네이비', color: '#1F2A44' },
          { name: '차콜 그레이', color: '#3F4348' },
          { name: '버건디', color: '#7A1F33' },
        ],
        temperature: 'cool',
      },
    ],
  },
];

export const STEP1_QUESTIONS: Record<Gender, Step1Question[]> = {
  female: FEMALE_QUESTIONS,
  male: MALE_QUESTIONS,
};
