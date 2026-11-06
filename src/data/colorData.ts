export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type Temperature = 'warm' | 'cool';
export type Clarity = 'clear' | 'soft';

export interface ColorChip {
  hex: string;
  name: string;
}

export interface SeasonPalette {
  season: Season;
  colors: [string, string];
  description: string;
}

export interface ColorGroup {
  id: 'red' | 'yellow' | 'green' | 'blue' | 'basic';
  name: string;
  palettes: SeasonPalette[];
}

export const SEASON_META: Record<Season, { label: string; color: string; temp: Temperature }> = {
  spring: { label: '봄', color: '#F4D94E', temp: 'warm' },
  summer: { label: '여름', color: '#78B8D8', temp: 'cool' },
  autumn: { label: '가을', color: '#D3A04A', temp: 'warm' },
  winter: { label: '겨울', color: '#315F9D', temp: 'cool' },
};

export const COLOR_GROUPS: ColorGroup[] = [
  {
    id: 'red',
    name: 'RED',
    palettes: [
      { season: 'spring', colors: ['#F15A4A', '#E63D2F'], description: '밝고 생기 있는 레드' },
      { season: 'autumn', colors: ['#C96A5B', '#B7282E'], description: '깊고 따뜻한 레드' },
      { season: 'summer', colors: ['#E8B7CA', '#CB73A0'], description: '부드럽고 차분한 로즈' },
      { season: 'winter', colors: ['#D91E3F', '#781E3D'], description: '선명하고 강한 레드' },
    ],
  },
  {
    id: 'yellow',
    name: 'YELLOW',
    palettes: [
      { season: 'spring', colors: ['#FFE58A', '#FFD23F'], description: '밝고 화사한 옐로우' },
      { season: 'autumn', colors: ['#DDAE32', '#C77E1B'], description: '골드빛 깊은 옐로우' },
      { season: 'summer', colors: ['#F3ECB4', '#D7CE76'], description: '부드럽고 은은한 옐로우' },
      { season: 'winter', colors: ['#E6FF00', '#B7BE00'], description: '강한 대비의 옐로우' },
    ],
  },
  {
    id: 'green',
    name: 'GREEN',
    palettes: [
      { season: 'spring', colors: ['#7BB932', '#309B48'], description: '싱그럽고 밝은 그린' },
      { season: 'autumn', colors: ['#9BAA7F', '#505B29'], description: '자연스럽고 깊은 그린' },
      { season: 'summer', colors: ['#DCE9E0', '#35AC91'], description: '부드럽고 맑은 그린' },
      { season: 'winter', colors: ['#198C79', '#0D564D'], description: '차갑고 선명한 그린' },
    ],
  },
  {
    id: 'blue',
    name: 'BLUE',
    palettes: [
      { season: 'spring', colors: ['#8FD8E5', '#28A8C7'], description: '맑고 경쾌한 블루' },
      { season: 'autumn', colors: ['#518A9B', '#086E78'], description: '차분하고 깊은 블루' },
      { season: 'summer', colors: ['#9CCAE5', '#8293B8'], description: '부드럽고 우아한 블루' },
      { season: 'winter', colors: ['#2457D6', '#1D2855'], description: '강하고 차가운 블루' },
    ],
  },
  {
    id: 'basic',
    name: 'BASIC',
    palettes: [
      { season: 'spring', colors: ['#FFF2CB', '#FFDDA0'], description: '라이트 베이지와 크림' },
      { season: 'autumn', colors: ['#D8B36C', '#69491F'], description: '골드 베이지와 브라운' },
      { season: 'summer', colors: ['#BBB8BC', '#8A626A'], description: '소프트 그레이와 로즈 브라운' },
      { season: 'winter', colors: ['#F7F7F7', '#151515'], description: '퓨어 화이트와 블랙' },
    ],
  },
];

export interface ColorChipWithName extends ColorChip {}

export const RESULT_PALETTES: Record<Season, ColorChip[]> = {
  spring: [
    { hex: '#F5A58C', name: '피치' },
    { hex: '#F47F6B', name: '코랄' },
    { hex: '#F8E18A', name: '크림 옐로우' },
    { hex: '#91BD53', name: '애플 그린' },
    { hex: '#55B9B0', name: '웜 아쿠아' },
  ],
  summer: [
    { hex: '#D996AD', name: '소프트 로즈' },
    { hex: '#AAA0CF', name: '라벤더' },
    { hex: '#9FC6DE', name: '파우더 블루' },
    { hex: '#596B8B', name: '소프트 네이비' },
    { hex: '#B6B5BC', name: '쿨 그레이' },
  ],
  autumn: [
    { hex: '#B75B38', name: '테라코타' },
    { hex: '#C99A32', name: '머스터드' },
    { hex: '#788044', name: '올리브' },
    { hex: '#B88755', name: '카멜' },
    { hex: '#5B3B2C', name: '딥 브라운' },
  ],
  winter: [
    { hex: '#C83278', name: '마젠타' },
    { hex: '#D62839', name: '퓨어 레드' },
    { hex: '#2855A5', name: '로열 블루' },
    { hex: '#1E294B', name: '딥 네이비' },
    { hex: '#151515', name: '블랙' },
  ],
};

export const RESULT_DESCRIPTIONS: Record<Season, string> = {
  spring: '밝고 따뜻하며 생기 있는 컬러에서 얼굴이 화사하게 표현될 가능성이 있습니다.',
  summer: '차갑고 부드러우며 은은한 컬러에서 얼굴이 편안하고 우아하게 표현될 가능성이 있습니다.',
  autumn: '따뜻하고 차분하며 깊이 있는 컬러에서 안정감 있고 자연스럽게 표현될 가능성이 있습니다.',
  winter: '차갑고 선명하며 대비가 강한 컬러에서 또렷하고 세련되게 표현될 가능성이 있습니다.',
};

export const RESULT_TITLES: Record<Season, string> = {
  spring: '봄 웜톤',
  summer: '여름 쿨톤',
  autumn: '가을 웜톤',
  winter: '겨울 쿨톤',
};

// 결과 카드에 표시할 계절별 키워드 (공유 이미지용)
export const RESULT_KEYWORDS: Record<Season, string[]> = {
  spring: ['#밝은', '#화사한', '#생기있는'],
  summer: ['#부드러운', '#우아한', '#청량한'],
  autumn: ['#깊이있는', '#차분한', '#내추럴한'],
  winter: ['#선명한', '#또렷한', '#세련된'],
};

export const TIE_MESSAGES: Record<string, string> = {
  'spring|autumn':
    '따뜻한 색이 잘 어울리는 웜톤 특성이 나타나며, 밝고 화사한 컬러와 차분하고 깊은 컬러를 함께 비교해볼 필요가 있습니다.',
  'summer|winter':
    '차가운 색이 잘 어울리는 쿨톤 특성이 나타나며, 부드러운 컬러와 선명한 컬러를 함께 비교해볼 필요가 있습니다.',
  'spring|summer':
    '밝고 가벼운 컬러가 잘 어울릴 가능성이 있으며, 따뜻한 색과 차가운 색의 방향을 추가로 확인해보는 것이 좋습니다.',
  'autumn|summer':
    '부드럽고 차분한 컬러가 잘 어울릴 가능성이 있으며, 웜톤과 쿨톤의 경계에 있을 수 있습니다.',
  'winter|spring':
    '선명하고 생기 있는 컬러가 잘 어울릴 가능성이 있으며, 따뜻한 선명색과 차가운 선명색을 비교해보는 것이 좋습니다.',
  'autumn|winter':
    '깊고 무게감 있는 컬러가 잘 어울릴 가능성이 있으며, 브라운 계열과 블랙·네이비 계열을 비교해보는 것이 좋습니다.',
};
