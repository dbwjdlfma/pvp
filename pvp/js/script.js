// 버전 표시
const version = document.getElementById("version");
version.textContent = "V1.1.7";
version.style.fontSize = "0.9em";
version.style.position = "absolute";
version.style.right = "20px";
version.style.bottom = "5px";
version.style.color = "#888";

// 모바일 메뉴 토글 기능
const mb = document.getElementById('mb');
mb.innerHTML = `
<button id="mobile-menu-toggle">
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
</nav>`;

// 사이드바 내용 설정
const sidebar = document.getElementById('sidebar-section');
sidebar.innerHTML = `
<div id="sidebar-section">
  <h3>게임 정보</h3>
  <ul>
    <li><a href="update.html">업데이트 내역</a></li>
    <li><a href="jobs.html">직업</a></li>
    <li><a href="maps.html">맵</a></li>
  </ul>
</div>`;

// 검색 기능 구현 (모바일 대응 수정)
function initializeSearch() {
  const jobSearch = document.getElementById("jobSearch");
  let jobCards = document.querySelectorAll(".job-card");
  
  // 요소가 없으면 0.5초 후에 다시 시도 (동적 로딩 대응)
  if (!jobSearch || jobCards.length === 0) {
    setTimeout(initializeSearch, 500);
    return;
  }

  function performSearch() {
    const searchTerm = jobSearch.value.toLowerCase().trim();
    jobCards = document.querySelectorAll(".job-card"); // 항상 최신 카드 목록 가져오기

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
      clearTimeout(searchTimeout);
      performSearch();
    }
  });
}

// D-Day 설정 (2025-12-24 자정)
const targetDate2 = new Date('2025-09-26T00:00:00');
const late2 = new Date('2026-01-24T00:00:00');

function updateEventDisplay() {
  const now2 = new Date();
  const messageElement = document.getElementById('event_soon');

  if (!messageElement) return;

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
    messageElement.innerHTML = ``;
  }
}

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', function() {
  console.log("script.js loaded!");

  // 모바일 메뉴 토글 설정
  setTimeout(() => {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('mobile-sidebar');

    if (toggleBtn && sidebar) {
      console.log("이벤트 연결됨 ✅");

      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
      });

      document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
          sidebar.classList.remove('active');
        }
      });
    } else {
      console.warn('❗ 모바일 메뉴 요소가 존재하지 않아 toggle이 비활성화됩니다.');
    }
  }, 50);

  // 검색 기능 초기화
  initializeSearch();
  
  // D-Day 표시 초기화
  updateEventDisplay();
});

// 산타 이벤트 D-Day 카운트다운 (jobs.html에 직접 포함된 스크립트 대체)
function startSantaCountdown() {
  const targetDate = new Date('2025-12-24T00:00:00');
  const late = new Date('2026-01-24T00:00:00');
  const messageElement = document.getElementById('soon');

  if (!messageElement) return;

  function updateDisplay() {
    const now = new Date();
    
    if (now < targetDate) {
      const diff = targetDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      messageElement.innerHTML = `
        <div class="job-card">
          <h3>곧 공개됩니다!</h3>
          <span class="job-role">
            남은 시간 : ${days}일 ${hours}시간 ${minutes}분 ${seconds}초
          </span>
        </div>
      `;
    } else if (now > late) {
      messageElement.innerHTML = ``;
    }
  }

  updateDisplay();
  setInterval(updateDisplay, 1000);
}

// 산타 카운트다운 시작 (jobs.html에서 호출)
if (window.location.pathname.includes('jobs.html')) {
  startSantaCountdown();
}
