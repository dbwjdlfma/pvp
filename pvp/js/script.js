
// DOM 요소 선택 및 버전 표시
function displayVersion() {
  const version = document.getElementById("version");
  if (version) {
    version.textContent = "V1.3.3";
    Object.assign(version.style, {
      fontSize: "0.9em",
      position: "absolute",
      right: "20px",
      bottom: "5px",
      color: "#888"
    });
  }
}

// 모바일 메뉴 초기화
function initMobileMenu() {
  const mb = document.getElementById('mb');
  if (!mb) return;

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
          <li><a href="speedrun.html">스피드런</a></li>
          
        </ul>
      </div>
    </nav>`;

  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('mobile-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('active');
      }
    });
  }
}

// 사이드바 초기화
function initSidebar() {
  const sidebar = document.getElementById('sidebar-section');
  if (sidebar) {
    sidebar.innerHTML = `
      <div id="sidebar-section">
        <h3>게임 정보</h3>
        <ul>
          <li><a href="update.html">업데이트 내역</a></li>
          <li><a href="jobs.html">직업</a></li>
          <li><a href="maps.html">맵</a></li>
          <li><a href="speedrun.html">스피드런</a></li>
        </ul>
      </div>`;
  }
}

// 검색 기능
function initSearch() {
  const jobSearch = document.getElementById("jobSearch");
  if (!jobSearch) return;

  let jobCards = document.querySelectorAll(".job-card");
  
  function performSearch() {
    const searchTerm = jobSearch.value.toLowerCase().trim();
    jobCards = document.querySelectorAll(".job-card");

    jobCards.forEach(card => {
      card.classList.remove("highlight");
      const jobTitle = card.querySelector("h3")?.textContent.toLowerCase();
      if (jobTitle?.includes(searchTerm)) {
        card.classList.add("highlight");
      }
    });

    const firstMatch = document.querySelector(".job-card.highlight");
    if (firstMatch) {
      setTimeout(() => {
        firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }

  // 디바운스 함수
  function debounce(func, delay) {
    let timeoutId;
    return function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  }

  jobSearch.addEventListener("input", debounce(performSearch, 500));
  jobSearch.addEventListener("keypress", (e) => e.key === "Enter" && performSearch());
  document.getElementById("searchButton")?.addEventListener("click", performSearch);
}

// 카운트다운 기능 (jobs.html 전용)
function initCountdown() {
  if (!window.location.pathname.includes('jobs.html')) return;

  const targetDate = new Date('2025-12-24T00:00:00');
  const lateDate = new Date('2026-01-24T00:00:00');
  const messageElement = document.getElementById('soon');
  
  if (!messageElement) return;

  function updateCountdown() {
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
        </div>`;
    } else if (now > lateDate) {
      messageElement.innerHTML = ``;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// 토글 기능
function initToggleButtons() {
  document.querySelectorAll('.toggle-sub-updates').forEach(button => {
    button.addEventListener('click', function() {
      const content = this.nextElementSibling;
      content.classList.toggle('active');
      this.textContent = content.classList.contains('active') 
        ? '▲ 서브 업데이트 숨기기' 
        : '▼ 서브 업데이트 보기';
    });
  });
}

// 메인 초기화 함수
function init() {
  displayVersion();
  initMobileMenu();
  initSidebar();
  initSearch();
  initCountdown();
  initToggleButtons();
}

// DOM 로드 후 초기화 실행
document.addEventListener('DOMContentLoaded', init);