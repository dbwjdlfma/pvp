/**
 * 범용 검색 필터 함수
 * @param {string} inputId - 검색창의 ID
 * @param {string} cardSelector - 필터링할 각 항목(카드)의 CSS 선택자
 * @param {string} titleSelector - 각 카드 내에서 검색할 제목의 CSS 선택자
 */
function initializeSearch(inputId, cardSelector, titleSelector) {
    const searchInput = document.getElementById(inputId);
    const cards = document.querySelectorAll(cardSelector);

    // 검색창 요소가 페이지에 없을 경우 오류를 방지하기 위해 종료
    if (!searchInput) {
        return;
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const titleElement = card.querySelector(titleSelector);
            // 제목 요소가 카드 내에 있는지 확인
            if (titleElement) {
                const title = titleElement.textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
}