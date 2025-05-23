// 모바일 감지 함수
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (window.innerWidth <= 768 && window.innerHeight <= 1024);
}

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    if (isMobileDevice()) {
        console.log('모바일 기기 감지됨, 리다이렉트 중...');
        window.location.href = 'https://example.com/mobile-page.html';
        // 또는 window.location.replace() 사용 가능
    }
});

const version = document.getElementById("version");
version.textContent = "V1.1.7";
version.style.fontSize = "0.9em";
version.style.position = "absolute";
version.style.right = "20px";
version.style.bottom = "5px";
version.style.color = "#888";

  
// DOM 요소 선택
const modal = document.getElementById("myModal");
const openBtn = document.getElementById("customAlertBtn");
const closeBtn = document.querySelector(".close-btn");

// 모달 열기
openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

// 모달 닫기
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
// 배경 클릭 시 닫기
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

