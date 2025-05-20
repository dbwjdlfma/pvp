const version = document.getElementById("version");
version.textContent = "V1.1.6";
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

// 날짜
