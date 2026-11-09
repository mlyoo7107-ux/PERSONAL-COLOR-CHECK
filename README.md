# COLOR.M 퍼스널컬러 자가진단

나에게 어울리는 컬러의 방향을 가볍게 알아보는 입문용 무료 퍼스널컬러 자가진단입니다. 여성·남성 자가진단을 지원합니다.

- STEP 1: 기본 체크 8문항 — 색상(웜·뉴트럴·쿨) 5, 채도 1, 청탁 1, 명도 1
- STEP 2: 4계절 컬러그룹 비교 (여성 5종, 남성 6종 + 넥타이). 계절 이름은 숨기고 순서는 매번 섞음
- 결과: 계절(동점이면 복합형), 결과 근거·확신도, 추천·워스트 컬러, 여성·남성 스타일 가이드, 결과 이미지 저장

## 판정 방식

계절 점수 = STEP 2에서 고른 개수 + STEP 1 가산점

- 색상: 웜이 쿨보다 많으면 그 차이 × 0.5점을 봄·가을에 (반대면 여름·겨울에)
- 채도·청탁: 선명이 많으면 차이 × 0.5점을 봄·겨울에 (반대면 여름·가을에)
- 명도: 밝은 톤이 많으면 차이 × 0.5점을 봄·여름에 (반대면 가을·겨울에)

가중치는 `src/utils/scoring.ts` 위쪽(`TEMP_WEIGHT` 등)에서 바꿀 수 있습니다.

## 내용 수정 위치

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 여성·남성 문항 | `src/data/questions.ts` |
| 컬러그룹, 추천·워스트 컬러, 결과 문구, 스타일 가이드 데이터 | `src/data/colorData.ts` |
| 판정 가중치, 확신도 기준 | `src/utils/scoring.ts` |
| 스타일 가이드 이미지 | `public/style/`, `public/ties/` |
| 하단 링크 (홈페이지·블로그·인스타그램) | `src/components/Footer.tsx` |
| 브랜드 색상·폰트 | `tailwind.config.js` |

## 실행

```bash
npm install
npm run dev
```

## 배포

`main` 브랜치에 올리면 GitHub Actions가 자동으로 빌드해 GitHub Pages에 배포합니다 (`.github/workflows/deploy.yml`).

© COLOR.M · https://colorm.net
