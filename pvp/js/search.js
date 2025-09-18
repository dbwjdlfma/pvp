// js/search.js (파일 내용 전체를 이걸로 교체)

// 직업 목록 페이지의 검색 기능을 초기화합니다.
initializeSearch(
    'job-search-input', // 검색창 ID
    '.list > a',          // 필터링할 카드 선택자
    '.list_box h3'        // 카드 내의 제목 선택자
);