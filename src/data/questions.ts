import type { Temperature, Clarity } from './colorData';

export type Gender = 'female' | 'male';

export const GENDER_LABELS: Record<Gender, string> = {
  female: '여성',
  male: '남성',
};

// 선택지 아래에 보여 줄 컬러칩 (color에는 HEX 값 또는 CSS 그라데이션을 넣을 수 있음)
// name을 비워 두면 칩 아래에 이름을 표시하지 않음
export interface ColorChip {
  name?: string;
  color: string;
}

export type OptionId = 'A' | 'B' | 'C';

/** 웜·쿨에 뉴트럴을 더한 톤 */
export type Tone = Temperature | 'neutral';

/** 명도(밝기): 밝은 톤(봄·여름 쪽) / 깊은 톤(가을·겨울 쪽) */
export type Depth = 'light' | 'deep';

export interface Step1Option {
  id: OptionId;
  /** 선택지 맨 앞에 굵게 표시할 짧은 이름 (예: 웜, 뉴트럴, 쿨) */
  heading?: string;
  text: string;
  chips?: ColorChip[];
  /** 웜·뉴트럴·쿨 중 어느 점수에 1점을 더할지 */
  temperature?: Tone;
  /** 선명(봄·겨울 쪽) / 부드러움(여름·가을 쪽) */
  clarity?: Clarity;
  /** 밝은 톤 / 깊은 톤 */
  depth?: Depth;
}

export interface Step1Question {
  id: number;
  title: string;
  /** 문항 제목 아래 안내 문구 */
  note?: string;
  /** 안내 문구 아래 참고 이미지 (public 폴더 기준 경로) + 이미지 아래 이름표 */
  image?: { src: string; alt: string; labels?: string[]; scale?: [string, string, string] };
  options: Step1Option[];
}

// ── 문항별 컬러칩 ─────────────────────────────────────────────
// 색을 바꾸고 싶으면 아래 HEX 값을 수정하세요.
const GOLD = 'linear-gradient(135deg, #F8E7A1 0%, #D4AF37 45%, #A97C1F 70%, #F2D675 100%)';
const CHAMPAGNE_GOLD = 'linear-gradient(135deg, #FBEBDA 0%, #E3C4A4 45%, #B8936F 70%, #F4DFC9 100%)';
const ROSE_GOLD = 'linear-gradient(135deg, #F7D3C2 0%, #D9917A 45%, #A9624E 70%, #F0BFA9 100%)';
const SOFT_SILVER = 'linear-gradient(135deg, #FBF5F2 0%, #DAD1CD 45%, #A79E9A 70%, #EFE9E6 100%)';
const PLATINUM = 'linear-gradient(135deg, #FFFFFF 0%, #D3D8DE 45%, #979EA7 70%, #EEF1F5 100%)';
const SILVER = 'linear-gradient(135deg, #FFFFFF 0%, #C9CED5 45%, #8E949C 70%, #EEF0F3 100%)';
const GUNMETAL = 'linear-gradient(135deg, #8A8F96 0%, #4B4F55 50%, #6E737A 100%)';
const TORTOISE =
  'radial-gradient(circle at 30% 30%, #C8893F 0 18%, transparent 19%), radial-gradient(circle at 70% 65%, #3A2214 0 22%, transparent 23%), linear-gradient(135deg, #8A5426, #5A3418)';

// 헤어 색·색의 느낌(선명/부드러움) 문항은 칩이 오히려 헷갈려서 넣지 않음
const CHIPS = {
  // 피부톤: 그룹마다 밝은색 → 중간 → 진한색 순서 (세 그룹의 밝기 단계를 맞춰 둠)
  skinWarm: [{ color: '#FCE1C5' }, { color: '#F4CFAA' }, { color: '#F8C19D' }],
  skinNeutral: [{ color: '#FBDAC4' }, { color: '#EECBB2' }, { color: '#E2B89B' }],
  skinCool: [{ color: '#F7D9D7' }, { color: '#F0BFB9' }, { color: '#E3B1A1' }],
  whiteWarm: [
    { name: '아이보리', color: '#FFF6E2' },
    { name: '크림 화이트', color: '#F5E8CC' },
  ],
  whiteCool: [
    { name: '퓨어 화이트', color: '#FFFFFF' },
    { name: '쿨 화이트', color: '#F1F5FA' },
  ],
  // 청탁: 같은 색을 맑은 버전 / 회색빛이 섞인 버전으로 비교
  clearTone: [
    { name: '맑은 핑크', color: '#F2679A' },
    { name: '맑은 블루', color: '#3B8FE0' },
    { name: '맑은 그린', color: '#22B07D' },
  ],
  grayishTone: [
    { name: '그레이시 핑크', color: '#C59AA6' },
    { name: '그레이시 블루', color: '#8B9DB2' },
    { name: '그레이시 그린', color: '#93A597' },
  ],
  // 명도: 같은 계열을 밝은 버전 / 깊은 버전으로 비교
  lightTone: [
    { name: '라이트 핑크', color: '#F7CAD6' },
    { name: '라이트 블루', color: '#BFD9F2' },
    { name: '라이트 베이지', color: '#F1E1C8' },
  ],
  deepTone: [
    { name: '와인', color: '#6E2440' },
    { name: '네이비', color: '#1F2C55' },
    { name: '다크 브라운', color: '#4E3424' },
  ],
} satisfies Record<string, ColorChip[]>;

// 청탁(맑음·탁함) 문항: 여성·남성 공통
const CLEARNESS_QUESTION = (id: number): Step1Question => ({
  id,
  title: '맑은 색 vs 회색빛이 섞인 색',
  note: '같은 색이라도 맑은 쪽과 회색빛이 살짝 섞인 쪽 중, 얼굴이 더 깨끗해 보이는 쪽을 고르세요.',
  options: [
    {
      id: 'A',
      heading: '맑은 색',
      text: '물감을 섞지 않은 듯 맑고 깨끗한 색이 얼굴을 더 화사하게 만든다.',
      chips: CHIPS.clearTone,
      clarity: 'clear',
    },
    {
      id: 'B',
      heading: '회색빛이 섞인 색',
      text: '회색빛이 살짝 섞인 차분한 색(그레이시·뮤트 톤)이 얼굴을 더 편안하게 만든다.',
      chips: CHIPS.grayishTone,
      clarity: 'soft',
    },
  ],
});

// 명도(밝기) 문항: 여성·남성 공통
const DEPTH_QUESTION = (id: number): Step1Question => ({
  id,
  title: '잘 어울리는 색의 밝기',
  note: '색의 종류보다 밝기를 비교해 주세요. 얼굴이 더 환하고 또렷해 보였던 쪽을 고르세요.',
  options: [
    {
      id: 'A',
      heading: '밝은 톤',
      text: '밝고 가벼운 색(라이트·파스텔 톤)을 입었을 때 얼굴이 환해 보인다.',
      chips: CHIPS.lightTone,
      depth: 'light',
    },
    {
      id: 'B',
      heading: '깊은 톤',
      text: '깊고 진한 색(다크 톤)을 입었을 때 얼굴이 또렷하고 안정감 있어 보인다.',
      chips: CHIPS.deepTone,
      depth: 'deep',
    },
  ],
});

// 여성 진단 문항
// 색상(웜·쿨) 5문항 + 채도 1 + 청탁 1 + 명도 1
const FEMALE_QUESTIONS: Step1Question[] = [
  {
    id: 1,
    title: '피부톤',
    note: '내 피부에서 느껴지는 빛과 가장 가까운 줄을 고르세요. 밝기는 상관없어요. 칩은 밝은 피부부터 진한 피부까지의 예시예요.',
    options: [
      {
        id: 'A',
        heading: '웜',
        text: '피부에서 노란빛이나 피치빛이 느껴진다.',
        chips: CHIPS.skinWarm,
        temperature: 'warm',
      },
      {
        id: 'B',
        heading: '뉴트럴',
        text: '노란빛과 붉은빛이 고르게 섞여 있어 어느 한쪽으로 치우치지 않는다.',
        chips: CHIPS.skinNeutral,
        temperature: 'neutral',
      },
      {
        id: 'C',
        heading: '쿨',
        text: '피부에서 핑크빛이나 붉은빛이 느껴진다.',
        chips: CHIPS.skinCool,
        temperature: 'cool',
      },
    ],
  },
  {
    id: 2,
    title: '헤어와 눈동자 색',
    note: '염색한 머리라면 눈썹과 눈동자 색을 기준으로 골라 주세요.',
    options: [
      {
        id: 'A',
        text: '골드빛이나 노란기가 도는 따뜻한 갈색에 가깝다.',
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '붉은기·잿빛이 도는 갈색, 또는 푸른빛이 도는 흑갈색에 가깝다.',
        temperature: 'cool',
      },
    ],
  },
  {
    id: 3,
    title: '액세서리 색',
    note: '착용했을 때 얼굴이 가장 자연스러워 보이는 금속 쪽을 고르세요.',
    image: {
      src: 'style/rings.jpg',
      alt: '골드, 샴페인 골드, 로즈 골드, 소프트 실버, 백금 반지',
      labels: ['골드', '샴페인 골드', '로즈 골드', '소프트 실버', '백금'],
      scale: ['웜', '뉴트럴', '쿨'],
    },
    options: [
      {
        id: 'A',
        heading: '웜',
        text: '노란빛이 도는 골드 액세서리가 더 자연스럽고 조화롭다.',
        chips: [{ name: '골드', color: GOLD }],
        temperature: 'warm',
      },
      {
        id: 'B',
        heading: '뉴트럴',
        text: '샴페인 골드, 로즈 골드, 소프트 실버처럼 중간 톤의 금속이 더 자연스럽다.',
        chips: [
          { name: '샴페인 골드', color: CHAMPAGNE_GOLD },
          { name: '로즈 골드', color: ROSE_GOLD },
          { name: '소프트 실버', color: SOFT_SILVER },
        ],
        temperature: 'neutral',
      },
      {
        id: 'C',
        heading: '쿨',
        text: '하얗게 빛나는 백금이나 실버 액세서리가 더 자연스럽고 조화롭다.',
        chips: [{ name: '백금', color: PLATINUM }],
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
        clarity: 'clear',
      },
      {
        id: 'B',
        text: '차분하고 부드러우며 은은한 색을 입었을 때 얼굴이 편안해 보인다.',
        clarity: 'soft',
      },
    ],
  },
  CLEARNESS_QUESTION(6),
  DEPTH_QUESTION(7),
  {
    id: 8,
    title: '립스틱 색',
    note: '평소 좋아하는 색보다, 실제로 발랐을 때 얼굴이 가장 생기 있어 보였던 줄을 고르세요. 같은 줄 안의 밝기 차이는 상관없어요.',
    options: [
      {
        id: 'A',
        heading: '웜',
        text: '코랄, 레드 오렌지, 브릭처럼 노란빛이 도는 립 컬러가 잘 어울린다.',
        chips: [
          { name: '코랄', color: '#EE7850' },
          { name: '레드 오렌지', color: '#EB5405' },
          { name: '브릭', color: '#A84F25' },
        ],
        temperature: 'warm',
      },
      {
        id: 'B',
        heading: '뉴트럴',
        text: '로즈, 레드처럼 노란빛과 푸른빛이 고르게 섞인 립 컬러가 잘 어울린다.',
        chips: [
          { name: '로즈', color: '#E7667C' },
          { name: '레드', color: '#E53357' },
          { name: '딥 로즈', color: '#A6385B' },
        ],
        temperature: 'neutral',
      },
      {
        id: 'C',
        heading: '쿨',
        text: '핑크, 레드 핑크, 플럼처럼 푸른빛이 도는 립 컬러가 잘 어울린다.',
        chips: [
          { name: '핑크', color: '#E25098' },
          { name: '레드 핑크', color: '#DD017F' },
          { name: '플럼', color: '#A50283' },
        ],
        temperature: 'cool',
      },
    ],
  },
];

// 남성 진단 문항: 메이크업·액세서리 문항을 남성 스타일링 기준으로 교체
// (점수 구조는 여성과 동일: 색상 5문항 + 채도 1 + 청탁 1 + 명도 1)
const MALE_QUESTIONS: Step1Question[] = [
  FEMALE_QUESTIONS[0],
  {
    id: 2,
    title: '헤어·눈썹과 눈동자 색',
    note: '염색한 머리라면 눈썹과 눈동자 색을 기준으로 골라 주세요.',
    options: [
      {
        id: 'A',
        text: '머리카락과 눈썹, 눈동자가 노란기가 도는 따뜻한 갈색에 가깝다.',
        temperature: 'warm',
      },
      {
        id: 'B',
        text: '머리카락과 눈썹, 눈동자가 잿빛 갈색이나 푸른빛이 도는 흑갈색에 가깝다.',
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
        clarity: 'clear',
      },
      {
        id: 'B',
        text: '차분하고 부드러우며 은은한 색을 입었을 때 얼굴이 편안하고 단정해 보인다.',
        clarity: 'soft',
      },
    ],
  },
  CLEARNESS_QUESTION(6),
  DEPTH_QUESTION(7),
  {
    id: 8,
    title: '니트·재킷 색',
    note: '평소 자주 입는 색보다, 입었을 때 얼굴이 밝아 보인다는 말을 들었던 쪽을 고르세요.',
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
