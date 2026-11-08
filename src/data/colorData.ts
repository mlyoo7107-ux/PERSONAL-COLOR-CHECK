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
  /** 색 대신 보여 줄 이미지 (public 폴더 기준 경로, 예: ties/spring-s8.png) */
  images?: string[];
  description: string;
}

export interface ColorGroup {
  id: 'red' | 'yellow' | 'green' | 'blue' | 'basic' | 'tie';
  name: string;
  /** 화면 제목 (없으면 "{name} 컬러") */
  title?: string;
  /** 화면 안내 문구 (없으면 기본 문구) */
  guide?: string;
  palettes: SeasonPalette[];
}

/** public 폴더의 이미지 경로를 배포 경로에 맞게 변환 */
export const assetUrl = (path: string): string => `${import.meta.env.BASE_URL}${path}`;

// ── 남성 넥타이 (COLOR.M 사계절 넥타이 원본에서 잘라 public/ties 에 저장) ──
// 파일 이름: {계절}-s{번호}.png = 단색, {계절}-p{번호}.png = 무늬

// STEP 2 남성 전용 비교 문항: 같은 계열(블루·레드)을 계절 톤만 다르게 비교
export const TIE_GROUP: ColorGroup = {
  id: 'tie',
  name: 'NECKTIE',
  title: '넥타이 컬러',
  guide: '같은 계열의 넥타이를 얼굴 아래에 맸다고 생각했을 때, 얼굴이 가장 자연스러워 보이는 쪽을 선택하세요.',
  palettes: [
    { season: 'spring', colors: ['#8FD3E6', '#D45F4F'], images: ['ties/spring-s8.png', 'ties/spring-s3.png'], description: '맑은 아쿠아 블루와 코랄 레드' },
    { season: 'autumn', colors: ['#127FA0', '#8B1A12'], images: ['ties/autumn-s7.png', 'ties/autumn-s4.png'], description: '깊은 틸 블루와 딥 레드' },
    { season: 'summer', colors: ['#B3DCF5', '#E83E78'], images: ['ties/summer-s2.png', 'ties/summer-s5.png'], description: '파우더 블루와 라즈베리' },
    { season: 'winter', colors: ['#2B4A9E', '#5A0F2B'], images: ['ties/winter-s5.png', 'ties/winter-s9.png'], description: '로열 블루와 버건디' },
  ],
};

// 남성 결과 화면의 계절별 추천 넥타이 (단색 4 + 무늬 2)
export const RESULT_TIES: Record<Season, string[]> = {
  spring: ['s3', 's4', 's6', 's8', 'p1', 'p3'].map((t) => `ties/spring-${t}.png`),
  summer: ['s2', 's4', 's8', 's10', 'p4', 'p9'].map((t) => `ties/summer-${t}.png`),
  autumn: ['s1', 's3', 's7', 's10', 'p4', 'p9'].map((t) => `ties/autumn-${t}.png`),
  winter: ['s1', 's5', 's8', 's9', 'p4', 'p10'].map((t) => `ties/winter-${t}.png`),
};

// ── 남성 결과 스타일 가이드 (COLOR.M 남성패션_명함4.ai, public/style/men) ──
export interface MaleStyle {
  /** 계절 스타일 일러스트 */
  illustration: string;
  /** Basic·Fashion 컬러 팔레트 카드 */
  palette: string;
  /** 추천 패턴 3종 */
  patterns: string[];
  /** 이름이 붙은 대표 컬러 8개 */
  keyColors: { name: string; hex: string }[];
  /** 어울리는 헤어 컬러 */
  hair: string[];
  /** 헤어 견본 사진 */
  hairImage: string;
}

const menImg = (season: Season) => ({
  illustration: `style/men/${season}-style.png`,
  palette: `style/men/${season}-palette.png`,
  patterns: [1, 2, 3].map((n) => `style/men/${season}-pattern${n}.png`),
  hairImage: `style/hair/${season}-hair-men.jpg`,
});

export const MALE_STYLE: Record<Season, MaleStyle> = {
  spring: {
    ...menImg('spring'),
    keyColors: [
      { name: '옐로우', hex: '#F5DE39' },
      { name: '애플 그린', hex: '#7EBB85' },
      { name: '캐멀', hex: '#D3A760' },
      { name: '브라이트 아쿠아', hex: '#459E94' },
      { name: '코럴 핑크', hex: '#E8A17D' },
      { name: '웜 그레이', hex: '#CECDBB' },
      { name: '오렌지 레드', hex: '#CC593A' },
      { name: '브라이트 네이비', hex: '#23596F' },
    ],
    hair: ['옐로 브라운', '골든 브라운', '코럴 브라운', '오렌지 브라운'],
  },
  summer: {
    ...menImg('summer'),
    keyColors: [
      { name: '화이트', hex: '#EDEBEA' },
      { name: '파스텔 그린', hex: '#AED5C5' },
      { name: '핑크', hex: '#EBB2D0' },
      { name: '퍼플 그레이', hex: '#8F98AD' },
      { name: '로즈 레드', hex: '#CA6D86' },
      { name: '미스트 블루', hex: '#5E788C' },
      { name: '로즈 브라운', hex: '#9F7A7F' },
      { name: '브라이트 네이비', hex: '#474E65' },
    ],
    hair: ['레드 브라운', '그레이 브라운', '다크 브라운', '와인 블랙'],
  },
  autumn: {
    ...menImg('autumn'),
    keyColors: [
      { name: '모스 베이지', hex: '#E6E3CF' },
      { name: '모스 그린', hex: '#708757' },
      { name: '새먼', hex: '#E8A289' },
      { name: '올리브 그린', hex: '#4B6148' },
      { name: '시나몬', hex: '#986740' },
      { name: '다크 브라운', hex: '#70594B' },
      { name: '레드 브라운', hex: '#9A4945' },
      { name: '딥 틸', hex: '#226177' },
    ],
    hair: ['레드 브라운', '골든 브라운', '오렌지 브라운', '애시 브라운'],
  },
  winter: {
    ...menImg('winter'),
    keyColors: [
      { name: '스노우 화이트', hex: '#FFFFFF' },
      { name: '차콜 그레이', hex: '#686A69' },
      { name: '아이스 블루', hex: '#C3D1E1' },
      { name: '파인 그린', hex: '#236763' },
      { name: '애시 로즈', hex: '#A43073' },
      { name: '로열 블루', hex: '#383668' },
      { name: '와인 레드', hex: '#6A324A' },
      { name: '블랙', hex: '#2D2D2D' },
    ],
    hair: ['레드 브라운', '네이비 브라운', '와인 블랙', '블루 블랙'],
  },
};

// ── 여성 결과 스타일 가이드 (public/style/women) ──
// 일러스트·파운데이션: 사계절 일러스트 차트(A4가로)3.ai
// 립·피부·섀도·헤어·향·컬러 카드: 사계절 컬러 톤_핸드폰용(RGB)_여성용2.ai
export interface FemaleStyle {
  illustration: string;
  description: string;
  tags: string[];
  foundation: { code: string; hex: string }[];
  lipTags: string[];
  lips: string[];
  skinTags: string[];
  skin: string;
  hair: string[];
  hairImage: string;
  scents: string[];
  perfume: string;
  /** 전체 컬러 차트 (컬러 카드 3장 + 립 컬러 카드) */
  colorCards: string[];
}

const womenImg = (season: Season) => ({
  illustration: `style/women/${season}-illust.jpg`,
  lips: [1, 2, 3, 4, 5].map((n) => `style/women/${season}-lip${n}.png`),
  skin: `style/women/${season}-skin.jpg`,
  hairImage: `style/women/${season}-hair.jpg`,
  perfume: `style/women/${season}-perfume.png`,
  colorCards: [1, 2, 3, 4].map((n) => `style/women/${season}-color${n}.jpg`),
});

export const FEMALE_STYLE: Record<Season, FemaleStyle> = {
  spring: {
    ...womenImg('spring'),
    description: '경쾌하고 발랄하며 귀여운 스타일입니다.',
    tags: ['#경쾌', '#발랄', '#귀여운', '#청색', '#봄라이트', '#봄소프트', '#봄브라이트', '#봄비비드'],
    foundation: [
      { code: '23W', hex: '#F8C3A0' },
      { code: '21W', hex: '#F5D1AD' },
      { code: '17W', hex: '#FDE1C6' },
      { code: '17N', hex: '#FBDBC6' },
      { code: '21N', hex: '#F0CDB4' },
      { code: '23N', hex: '#E3BB9E' },
    ],
    lipTags: ['#코랄', '#코랄핑크', '#코랄레드', '#레드', '#오렌지', '#오렌지 레드'],
    skinTags: ['#코랄', '#코랄핑크', '#코랄레드', '#레드', '#오렌지', '#오렌지 레드'],
    hair: ['옐로우 브라운', '골든 브라운', '코랄 브라운', '오렌지 브라운', '내추럴 브라운'],
    scents: ['달콤한 향', '상큼한 향', '시트러스 향'],
  },
  summer: {
    ...womenImg('summer'),
    description: '로맨틱하고 조용한 여성스러운 스타일입니다.',
    tags: ['#조용한', '#여성스러운', '#우아한', '#탁색', '#여름페일', '#여름라이트', '#여름뮤트', '#여름소프트'],
    foundation: [
      { code: '23C', hex: '#E4B3A4' },
      { code: '21C', hex: '#F1C2BB' },
      { code: '17C', hex: '#F8DBD9' },
      { code: '17N', hex: '#FCDECB' },
      { code: '21N', hex: '#F0CDB4' },
      { code: '23N', hex: '#E3BB9E' },
    ],
    lipTags: ['#로즈', '#플럼', '#쿨핑크', '#핑크베리'],
    skinTags: ['#로즈베이지', '#로즈퍼플', '#연한그레이', '#로즈피치'],
    hair: ['로즈 브라운', '그레이 브라운', '와인 블랙', '다크 브라운'],
    scents: ['비누 향', '플로럴 향', '자스민 향', '은은한 향'],
  },
  autumn: {
    ...womenImg('autumn'),
    description: '차분하고 내추럴한 클래식한 스타일입니다.',
    tags: ['#차분', '#내추럴', '#클래식', '#탁색', '#가을뮤트', '#가을소프트', '#가을딥', '#가을다크'],
    foundation: [
      { code: '25W', hex: '#D7AB77' },
      { code: '23W', hex: '#E9C9A7' },
      { code: '21W', hex: '#FBE1C5' },
      { code: '21N', hex: '#FCDFC7' },
      { code: '23N', hex: '#ECC2A7' },
      { code: '25N', hex: '#D2A485' },
    ],
    lipTags: ['#베이지', '#딥오렌지', '#딥레드', '#브라운', '#버건디'],
    skinTags: ['#베이지', '#브라운', '#버건디', '#올리브 그린'],
    hair: ['레드 브라운', '골든 브라운', '블랙 브라운', '애시 브라운'],
    scents: ['우디 향', '럭셔리 향', '고혹적인 향'],
  },
  winter: {
    ...womenImg('winter'),
    description: '심플하고 세련된 모던한 스타일입니다.',
    tags: ['#심플', '#모던', '#세련', '#대비감', '#청색', '#겨울브라이트', '#겨울비비드', '#겨울딥', '#겨울다크'],
    foundation: [
      { code: '25C', hex: '#D49984' },
      { code: '23C', hex: '#EABBA5' },
      { code: '21C', hex: '#FBDACE' },
      { code: '21N', hex: '#FCDFC7' },
      { code: '23N', hex: '#ECC2A7' },
      { code: '25N', hex: '#D2A485' },
    ],
    lipTags: ['#마젠타', '#퍼플', '#베리', '#플럼', '#블러드레드'],
    skinTags: ['#아이보리', '#스모크 그레이', '#딥퍼플'],
    hair: ['블루 블랙', '다크 브라운', '그레이 브라운', '실버 그레이'],
    scents: ['머스크 향', '시크한 향', '독특한 향', '매혹적인 향'],
  },
};

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
