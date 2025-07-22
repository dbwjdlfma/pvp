# 새로운 HTML 파일 생성 가이드

이제 새로운 HTML 파일을 만들 때 복잡한 헤더와 사이드바를 복붙할 필요가 없습니다!

## 기본 템플릿

새 HTML 파일을 만들 때는 `template.html` 파일을 복사해서 시작하세요:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>쓸모PVP</title>
<link rel="stylesheet" href="css/style.css">
<link rel="icon" href="videos/diamond.webp">
</head>
<body>
<!-- JavaScript가 자동으로 공통 헤더와 사이드바를 생성합니다 -->

<div class="article-header">
<h1>페이지 제목</h1>
</div>

<!-- 여기에 페이지별 고유 내용을 작성하세요 -->

<script src="js/script.js"></script>
</body>
</html>
```

## 유틸리티 함수 사용법

### 1. 페이지 제목 설정
```javascript
PVPUtils.setPageTitle('새 직업 이름');
```

### 2. 직업 정보 카드 생성
```javascript
const jobData = {
    role: '근거리/단일/딜러',
    stats: 'HP : 30 | 쿨타임 : 15s | 이동속도 : 0.1',
    abilities: '[스킬명] : 스킬 설명'
};
const jobCard = PVPUtils.createJobCard(jobData);
PVPUtils.addContent(jobCard);
```

### 3. 업데이트 카드 생성
```javascript
const updateCard = PVPUtils.createUpdateCard(
    'V1.5.0',           // 버전
    '2025-07-25',       // 날짜
    '새 기능',          // 제목
    '설명 내용',        // 내용
    'rgb(153, 0, 255)', // 제목 색상 (선택사항)
    'white'             // 내용 색상 (선택사항)
);
PVPUtils.addContent(updateCard);
```

### 4. 유튜브 비디오 임베드
```javascript
const video = PVPUtils.createVideoEmbed('VIDEO_ID'); // 유튜브 ID만 입력
PVPUtils.addContent(video);
```

### 5. 맵 정보 카드 생성
```javascript
const mapData = {
    name: '맵 이름',
    size: '크기',
    features: '특징',
    recommendedPlayers: '추천 인원'
};
const mapCard = PVPUtils.createMapCard(mapData);
PVPUtils.addContent(mapCard);
```

## 템플릿 파일들

1. `template.html` - 기본 템플릿
2. `new-job-template.html` - 직업 페이지 템플릿 
3. `new-update-template.html` - 업데이트 페이지 템플릿

## 장점

1. **파일 크기 감소**: 중복 코드 제거로 HTML 파일이 훨씬 작아집니다
2. **일관성**: 모든 페이지가 같은 헤더/사이드바를 공유합니다
3. **유지보수 용이**: 헤더나 사이드바 수정이 필요할 때 script.js만 수정하면 됩니다
4. **빠른 개발**: 새 페이지 생성이 매우 간단해집니다
5. **버전 관리**: 버전 정보를 한 곳에서 관리할 수 있습니다

이제 새로운 HTML 파일을 만들 때는 템플릿을 복사하고, 필요한 내용만 채우면 됩니다!
