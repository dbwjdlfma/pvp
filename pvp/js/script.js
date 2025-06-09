
const mb = document.getElementById('mb')
mb.innerHTML = `<button id="mobile-menu-toggle">
  <span style="font-size: 1.2em;">&#8801;</span>
  <span>메뉴</span>
</button>

<nav id="mobile-sidebar" class="mobile-sidebar">
  <div class="mobile-sidebar-section">
    <h3>게임 정보</h3>
    <ul>
      <li><a href="update.html">업데이트 내역</a></li>
      <li><a href="jobs.html">직업</a></li>
      <li><a href="maps.html">맵</a></li>
    </ul>
  </div>
</nav>`

document.addEventListener('DOMContentLoaded', function () {
  console.log("script.js loaded!");

  setTimeout(() => {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('mobile-sidebar');

    if (toggleBtn && sidebar) {
      console.log("이벤트 연결됨 ✅");

      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
      });

      document.addEventListener('click', function (e) {
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
          sidebar.classList.remove('active');
        }
      });
    } else {
      console.warn('❗ 모바일 메뉴 요소가 존재하지 않아 toggle이 비활성화됩니다.');
    }
  }, 50);
});

// 버전 표시
const version = document.getElementById("version");
version.textContent = "V1.1.7";
version.style.fontSize = "0.9em";
version.style.position = "absolute";
version.style.right = "20px";
version.style.bottom = "5px";
version.style.color = "#888";

const sidebar = document.getElementById('sidebar-section')
sidebar.innerHTML = `
<div id="sidebar-section">
<h3>게임 정보</h3>
<ul>
<li><a href="update.html">업데이트 내역</a></li>
<li><a href="jobs.html">직업</a></li>
<li><a href="maps.html">맵</a></li>
</ul>

</div>
`;

// D-Day 설정 (2025-12-24 자정)
const targetDate2 = new Date('2025-09-26T00:00:00');
const late2 = new Date('2026-01-24T00:00:00');

function updateDisplay() {
const now2 = new Date();
const messageElement = document.getElementById('event_soon');

if (now2 < targetDate2) {
messageElement.innerHTML = `
<div id="event_soon">
<h3> <br>???</h3>
<ul>
<li><a href="">곧 공개</a></li>
</ul>
</div>
`;
}
if (now2 > late2) {
messageElement.innerHTML = `
`;
}
}
// 즉시 실행 + 1초마다 업데이트
updateDisplay();

// 검색 기능 구현
const jobSearch = document.getElementById("jobSearch");
const jobCards = document.querySelectorAll(".job-card");

function performSearch() {
const searchTerm = jobSearch.value.toLowerCase().trim();

// 모든 하이라이트 제거
jobCards.forEach(card => {
card.classList.remove("highlight");
});

if (searchTerm === "") return;

let found = false;
let firstMatch = null;

jobCards.forEach(card => {
const jobTitle = card.querySelector("h3").textContent.toLowerCase();
if (jobTitle.includes(searchTerm)) {
card.classList.add("highlight");
if (!found) {
firstMatch = card;
found = true;
}
}
});

if (firstMatch) {
setTimeout(() => {
firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
}, 100);
}
}

// 입력 시 실시간 검색 (500ms 디바운스)
let searchTimeout;
jobSearch.addEventListener("input", function() {
clearTimeout(searchTimeout);
searchTimeout = setTimeout(performSearch, 500);
});

// 엔터키로 검색
jobSearch.addEventListener("keypress", function(e) {
if (e.key === "Enter") {
clearTimeout(searchTimeout); // 타이머 취소
performSearch();
}
});
