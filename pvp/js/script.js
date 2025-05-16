const version = document.getElementById("version");
version.textContent = "V1.1.6";
version.style.fontSize = "0.9em";
version.style.position = "absolute";
version.style.right = "20px";
version.style.bottom = "5px";
version.style.color = "#888";

document.addEventListener('DOMContentLoaded', function() {
    // 동영상 컨트롤 설정
    const videos = document.querySelectorAll('video[poster]');
    
    videos.forEach(video => {
        // 기본 설정
        video.autoplay = false;
        video.playsInline = true;
        video.muted = false;
        
        // 썸네일 클릭 시 동영상 재생
        const container = video.parentElement;
        const overlay = container.querySelector('.play-button-overlay');
        
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                e.preventDefault();
                video.play();
                video.classList.add('playing');
            });
        }
        
        // 동영상 재생 상태 추적
        video.addEventListener('play', function() {
            this.classList.add('playing');
        });
        
        video.addEventListener('pause', function() {
            this.classList.remove('playing');
        });
    });

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

});