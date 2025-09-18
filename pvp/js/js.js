// 공통해더
const maincontainer = document.getElementById("main_container");
const headerhtml =`
   <div class="header">
        <button id="sidebar_button"><span class="sidebar_icon">☰</span></button>
        <a href="main.html"><b>쓸모PVP</b></a> 
                   <div id="sidebar_content" class="sidebar_content">
                        <span class="sidebar_cat">주요 탭</span>
                            <hr>
                            <a href="update.html"><span class="sidebar_item">업데이트 내역</span></a>
                            <a href="gameplay.html"><span class="sidebar_item">게임 방식</span></a>
                            <a href="jobs-list.html"><span class="sidebar_item">직업 목록</span></a>
                            <a href="map_list.html"><span class="sidebar_item">맵 목록</span></a>
                        <span class="sidebar_cat">기타</span>
                        <hr>
                        <a href="devnote.html"><span class="sidebar_item">개발 노트</span></a>
                            <a href="suggest.html"><span class="sidebar_item">건의 하기</span></a>
                        
                    </div>
    </div>
    <div class=info_box>
            <p>버전 : 1.21.6 ~ 1.21.8</p>
            <p>서버 주소 : usefulpvp.kro.kr</p>
            <p>서버 온오프 알림 관련 문의는 DM 부탁드립니다 🙏</p>
    </div>    `
maincontainer.insertAdjacentHTML("afterbegin", headerhtml);


// 사이드바
const sidebarButton = document.getElementById("sidebar_button");
const sidebar = document.getElementById("sidebar_content");
sidebarButton.addEventListener("click", () => {
  sidebar.classList.toggle('show');
});

// --- 먼저, 드롭다운과 드롭다운을 여는 버튼 요소를 선택합니다. ---
const dropdown = document.getElementById('version-dropdown');
const dropdownTrigger = document.querySelector('.version-select');


// 사이드바및 업데이트 외부 클릭 시 사이드바를 닫는 이벤트 리스너
window.addEventListener('click', (event) => {

  // 1. 기존 사이드바 외부 클릭 로직
  //    (sidebar와 sidebarButton이 페이지에 있을 때만 실행)
  if (typeof sidebar !== 'undefined' && sidebar.classList.contains('show') && 
      !sidebar.contains(event.target) && 
      !sidebarButton.contains(event.target)) 
  {
    sidebar.classList.remove('show');
  }

  // 2. 새로 추가된 드롭다운 외부 클릭 로직
  //    (dropdown과 dropdownTrigger가 페이지에 있을 때만 실행)
  if (dropdown && dropdown.classList.contains('show') && 
      !dropdown.contains(event.target) && 
      !dropdownTrigger.contains(event.target)) 
  {
    dropdown.classList.remove('show');
  }
});

