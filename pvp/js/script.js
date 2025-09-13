// =================================================================================
// SPA (Single Page Application) 라우팅 및 공통 레이아웃 관리
// =================================================================================

// 페이지 콘텐츠를 동적으로 로드하고 업데이트하는 함수
async function loadPage(url, pushState = true) {
  const article = document.querySelector('.wiki-article');
  try {
    // 1. 현재 콘텐츠를 부드럽게 사라지게 함
    article.classList.add('fade-out');
    await new Promise(resolve => setTimeout(resolve, 150)); // 애니메이션 시간과 동일하게 대기

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('페이지를 불러올 수 없습니다.');
    }
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    // 새 페이지의 타이틀과 콘텐츠 추출
    const newTitle = doc.querySelector('title')?.textContent || '쓸모PVP';
    const newContent = doc.querySelector('body').innerHTML;

    // 2. 새 콘텐츠로 교체
    document.title = newTitle;
    article.innerHTML = newContent;

    // 3. 새 콘텐츠를 부드럽게 나타나게 함
    article.classList.remove('fade-out');

    // 4. 페이지 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // URL 주소 변경 (뒤로가기/앞으로가기 시에는 제외)
    if (pushState) {
      history.pushState({ path: url }, newTitle, url);
    }

    // 콘텐츠 로드 후 필요한 스크립트들 재초기화
    initializePageScripts();

  } catch (error) {
    console.error('페이지 로드 오류:', error);
    article.innerHTML = `<h2>오류</h2><p>페이지를 불러오는 데 실패했습니다.</p>`;
    article.classList.remove('fade-out'); // 오류 발생 시에도 다시 보이도록 처리
  }
}

// 페이지 이동을 처리하는 이벤트 리스너
function handleNavigation(event) {
  const anchor = event.target.closest('a');

  // a 태그가 아니거나, 외부 링크거나, 새 탭에서 여는 링크는 무시
  if (!anchor || anchor.target === '_blank' || anchor.protocol !== location.protocol || anchor.host !== location.host) {
    // 만약 모바일 사이드바의 외부 링크를 클릭했다면 사이드바를 닫아줍니다.
    const sidebar = document.getElementById('mobile-sidebar');
    if (sidebar && sidebar.contains(anchor)) {
      sidebar.classList.remove('active');
    }
    return;
  }

  // 기본 링크 이동 동작 방지
  event.preventDefault();
  const url = anchor.href;

  // 현재 URL과 같은 경우 이동하지 않음
  if (url === window.location.href) {
    // 그래도 모바일 사이드바는 닫아줍니다.
    const sidebar = document.getElementById('mobile-sidebar');
    if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
    return;
  }

  // 모바일 사이드바 닫기
  const sidebar = document.getElementById('mobile-sidebar');
  if (sidebar && sidebar.classList.contains('active')) {
    sidebar.classList.remove('active');
  }

  loadPage(url);
}

// 뒤로가기/앞으로가기 이벤트 처리
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.path) {
    loadPage(event.state.path, false); // pushState는 하지 않음
  }
});

// =================================================================================
// 각 페이지에서 필요한 기능 초기화
// =================================================================================

// 공통 레이아웃 구조를 생성하는 함수
function initCommonLayout() {
  // 이미 레이아웃이 생성되었다면 실행하지 않음
  if (document.querySelector('.wiki-container')) {
    return;
  }

  const body = document.body;
  const existingContent = body.innerHTML;

  body.innerHTML = `
    <div id="mb"></div>
    <div class="wiki-container">
      <header class="wiki-header">
        <h1><a href="index.html" style="color: inherit; text-decoration: none;">쓸모PVP</a></h1>
        <p><span id="server-status">확인 중...</span></p>
        <div id="version"></div>
      </header>
      <div class="wiki-body">
        <aside class="wiki-sidebar">
          <div id="sidebar-section"></div>
        </aside>
        <main class="wiki-content">
          <article class="wiki-article">
            ${existingContent}
          </article>
        </main>
      </div>
    </div>
  `;
}

// 버전 정보 표시
function displayVersion() {
  const version = document.getElementById("version");
  if (version) {
    version.textContent = "V1.7.2";
    Object.assign(version.style, {
      fontSize: "0.9em", position: "absolute", right: "20px", bottom: "5px", color: "#888"
    });
  }
}





// 모바일 메뉴
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
        </ul><br>
        <h3>기타</h3>
        <ul>
        <li><a href="player-list.html">플레이어 목록</a></li>
        <li><a href="suggest.html">건의하기</a></li>
          <li><a href="0event_jobs.html">클래식</a></li>
          <li><a href="http://usefulpvp.kro.kr:8804/" target="_blank" style="color: gray; display: flex; justify-content: space-between; align-items: center;">자세한 통계 보기 <span class="material-symbols-outlined">open_in_new</span></a></li>
        </ul>
      </div>
    </nav>`;

  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('mobile-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      // e.target이 사이드바 내부에 있거나, 메뉴 토글 버튼 자체이면 닫지 않음
      if (sidebar.contains(e.target) || toggleBtn.contains(e.target)) {
        return;
      }
      // 그 외의 경우(외부 클릭) 사이드바를 닫음
      sidebar.classList.remove('active');
    });

    // 창 크기 조절 시 데스크톱 뷰로 전환되면 모바일 사이드바 닫기
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
      }
    });
  }
  
}

// 데스크탑 사이드바
function initSidebar() {
  const sidebar = document.getElementById('sidebar-section');
  if (sidebar) {
    sidebar.innerHTML = `
      <h3>게임 정보</h3>
      <ul>
        <li><a href="update.html">업데이트 내역</a></li>
        <li><a href="jobs.html">직업</a></li>
        <li><a href="maps.html">맵</a></li>
      </ul><br>
      <h3>기타</h3>
      <ul>
      <li><a href="player-list.html">플레이어 목록</a></li>
      <li><a href="suggest.html">건의하기</a></li>
        <li><a href="0event_jobs.html">클래식 모드</a></li>
        <li><a href="http://usefulpvp.kro.kr:8804/" target="_blank" style="color: gray; display: flex; justify-content: space-between; align-items: center;">자세한 통계 보기 <span class="material-symbols-outlined">open_in_new</span></a></li>
      </ul>`;
  }
}

// 마인크래프트 서버 상태 확인
function initServerStatus() {
  const serverAddress = 'usefulpvp.kro.kr';
  const serverStatusElement = document.getElementById('server-status');
  if (!serverStatusElement) return;

  fetch(`https://api.mcstatus.io/v2/status/java/${serverAddress}`)
    .then(response => response.json())
    .then(data => {
      if (data.online) {
        serverStatusElement.innerHTML = `<span style="color: green;">●</span> 열림 (접속자: ${data.players.online} / ${data.players.max})`;
      } else {
        serverStatusElement.innerHTML = `<span style="color: red;">●</span> 닫힘`;
      }
      serverStatusElement.style.color = 'white';
    })
    .catch(error => {
      console.error('서버 상태 확인 오류:', error);
      serverStatusElement.textContent = '상태를 확인할 수 없음';
      serverStatusElement.style.color = 'gray';
    });
}

// 검색 기능
function initSearch() {
  const jobSearch = document.getElementById("jobSearch");
  if (!jobSearch) return;

  function performSearch() {
    const searchTerm = jobSearch.value.toLowerCase().trim();
    const jobCards = document.querySelectorAll(".job-card");
    jobCards.forEach(card => {
      const jobTitle = card.querySelector("h3")?.textContent.toLowerCase();
      card.classList.toggle("highlight", jobTitle?.includes(searchTerm));
    });
    const firstMatch = document.querySelector(".job-card.highlight");
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  jobSearch.addEventListener("input", performSearch);
  jobSearch.addEventListener("keypress", (e) => e.key === "Enter" && performSearch());
  document.getElementById("searchButton")?.addEventListener("click", performSearch);
}



// 토글 버튼 (update.html)
function initToggleButtons() {
  document.querySelectorAll('.toggle-sub-updates').forEach(button => {
    button.addEventListener('click', function() {
      const content = this.nextElementSibling;
      content.classList.toggle('active');
      this.textContent = content.classList.contains('active') ? '▲ 서브 업데이트 숨기기' : '▼ 서브 업데이트 보기';
    });
  });
}

// 플레이어 목록 (player-list.html)
function initPlayerList() {
  const playerListContainer = document.getElementById('player-list-container');
  if (!playerListContainer) return;

  const refreshButton = document.getElementById('refresh-player-list');
  const serverAddress = 'usefulpvp.kro.kr';

  const fetchPlayerList = (isInitialLoad = false) => {
    if (refreshButton) {
      refreshButton.disabled = true;
      refreshButton.textContent = '로딩 중...';
    }
    
    // 처음 로드할 때만 "불러오는 중" 메시지 표시
    if (isInitialLoad) {
      playerListContainer.innerHTML = '<p>플레이어 목록을 불러오는 중입니다...</p>';
    }

    fetch(`https://api.mcstatus.io/v2/status/java/${serverAddress}`)
      .then(response => response.json())
      .then(data => {
        if (data.online && data.players.list?.length > 0) {
          playerListContainer.innerHTML = '';
          const playerList = document.createElement('div');
          playerList.className = 'player-list';
          data.players.list.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            playerCard.innerHTML = `<img src="https://cravatar.eu/helmavatar/${player.uuid}/64.png" alt="${player.name_raw}" class="player-skin"><span class="player-name">${player.name_raw}</span>`;
            playerList.appendChild(playerCard);
          });
          playerListContainer.appendChild(playerList);
        } else if (data.online) {
          playerListContainer.innerHTML = '<p>현재 접속 중인 플레이어가 없습니다.</p>';
        } else {
          playerListContainer.innerHTML = '<p>서버가 닫혀있어 플레이어 목록을 불러올 수 없습니다.</p>';
        }
      })
      .catch(error => {
        console.error('플레이어 목록 조회 오류:', error);
        playerListContainer.innerHTML = '<p>플레이어 목록을 불러오는 데 실패했습니다.</p>';
      })
      .finally(() => {
        if (refreshButton) {
          refreshButton.disabled = false;
          refreshButton.textContent = '새로고침';
        }
      });
  };

  // 처음에는 로딩 메시지를 표시하도록 true 전달
  fetchPlayerList(true); 
  // 새로고침 버튼 클릭 시에는 로딩 메시지 없이 갱신하도록 false 전달
  refreshButton?.addEventListener('click', () => fetchPlayerList(false));
}


// =================================================================================
// 메인 초기화 함수
// =================================================================================

// 뒤로가기 버튼 초기화
function initBackButton() {
  const article = document.querySelector('.wiki-article');
  if (!article) return;

  const currentPath = window.location.pathname;
  const fileName = currentPath.split('/').pop();
  
  // job-xxx.html 또는 map-xxx.html 패턴 확인 (0event_jobs.html은 제외)
  const isJobDetail = fileName.startsWith('job-') && fileName.endsWith('.html');
  const isMapDetail = fileName.startsWith('map-') && fileName.endsWith('.html');
  const isEventDetail = fileName.startsWith('0event_') && fileName.endsWith('.html') && fileName !== '0event_jobs.html';
  
  if (isJobDetail || isMapDetail || isEventDetail) {
    // 기존 article-header 찾기
    const existingHeader = article.querySelector('.article-header');
    if (existingHeader) {
      // 기존 헤더가 있으면 새로운 헤더로 교체
      const newHeader = document.createElement('div');
      newHeader.className = 'article-header-with-back';
      
      // 뒤로가기 버튼 생성
      const backButton = document.createElement('a');
      backButton.className = 'back-button';
      
      const backIcon = document.createElement('span');
      backIcon.className = 'material-symbols-outlined';
      backIcon.textContent = 'arrow_back';
      backButton.appendChild(backIcon);
      
      if (isJobDetail) {
        backButton.href = 'jobs.html';
        backButton.title = '직업 목록으로 돌아가기';
      } else if (isMapDetail) {
        backButton.href = 'maps.html';
        backButton.title = '맵 목록으로 돌아가기';
      } else if (isEventDetail) {
        backButton.href = '0event_jobs.html';
        backButton.title = '클래식 목록으로 돌아가기';
      }
      
      // 기존 제목 복사
      const existingTitle = existingHeader.querySelector('h1');
      const newTitle = existingTitle ? existingTitle.cloneNode(true) : document.createElement('h1');
      
      // 새 헤더에 버튼과 제목 추가
      newHeader.appendChild(backButton);
      newHeader.appendChild(newTitle);
      
      // 기존 헤더를 새 헤더로 교체
      existingHeader.parentNode.replaceChild(newHeader, existingHeader);
    }
  }
}

// 페이지 콘텐츠가 바뀔 때마다 실행되어야 할 스크립트 모음
function initializePageScripts() {
  initSearch();
  initCountdown();
  initToggleButtons();
  initPlayerList();
  initBackButton(); // 뒤로가기 버튼 초기화 추가
}

// 최초 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
  // 0. body가 로드 완료되면 보이도록 처리
  document.body.classList.add('loaded');

  // 0.5. Material Symbols 폰트 동적 로드
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
  document.head.appendChild(fontLink);

  // 1. 공통 레이아웃 생성 (최초 한 번만 실행)
  initCommonLayout();

  // 2. 헤더/사이드바 등 정적 요소 초기화 (최초 한 번만 실행)
  displayVersion();
  initMobileMenu();
  initSidebar();
  initServerStatus();

  // 3. SPA 라우팅 설정 (최초 한 번만 실행)
  document.body.addEventListener('click', handleNavigation);

  // 4. 현재 페이지에 맞는 동적 스크립트 실행
  initializePageScripts();
  
  // 5. URL 직접 입력으로 들어온 경우를 위해 현재 상태를 history에 저장
  history.replaceState({ path: window.location.href }, document.title, window.location.href);
});