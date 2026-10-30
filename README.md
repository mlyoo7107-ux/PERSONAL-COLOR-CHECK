# COLOR.M 퍼스널컬러 셀프 체크

나에게 어울리는 컬러의 방향을 알아보는 입문용 퍼스널컬러 셀프 진단입니다. 여성·남성 진단을 지원합니다.

- STEP 1: 기본 체크 6문항 (웜/쿨, 선명/부드러움)
- STEP 2: 4계절 컬러그룹 5종 비교
- 결과: 1·2순위 계절, 추천 팔레트, 결과 이미지 저장

## 내용 수정 위치

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 여성·남성 문항 | `src/data/questions.ts` |
| 컬러그룹 색상, 추천 팔레트, 결과 문구 | `src/data/colorData.ts` |
| 브랜드 색상·폰트 | `tailwind.config.js` |

## 실행

```bash
npm install
npm run dev
```

## 배포

`main` 브랜치에 올리면 GitHub Actions가 자동으로 빌드해 GitHub Pages에 배포합니다 (`.github/workflows/deploy.yml`).

© COLOR.M · https://colorm.net
