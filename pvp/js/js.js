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
                            <a href="jobs-list.html"><span class="sidebar_item">직업 목록</span></a>
                            <a href="map_list.html"><span class="sidebar_item">맵 목록</span></a>
                        <span class="sidebar_cat">기타</span>
                        <hr>

                        <a href="known.html"><span class="sidebar_item">알려진 버그</span></a>
                        <a href="devnote.html"><span class="sidebar_item">개발 노트</span></a>
                        
                    </div>
    </div>
    <div class=info_box>
            <p>버전 : 1.21.9 ~ 1.21.10</p>
            <p>서버 주소와 서버의 켜짐 유무는 디스코드에 올려집니다</p>
    </div>    `
maincontainer.insertAdjacentHTML("afterbegin", headerhtml);

// 마인크래프트 서버 상태 확인
function checkServerStatus() {
  const serverAddress = 'usefulpvp.kro.kr'; // 확인할 서버 주소
  const serverStatusElement = document.getElementById('server-status');

  if (!serverStatusElement) {
    console.warn("server-status element not found.");
    return;
  }

  fetch(`https://api.mcstatus.io/v2/status/java/${serverAddress}`)
    .then(response => response.json())
    .then(data => {
      if (data.online) {
        serverStatusElement.innerHTML = `<span style="color: green;">현재 서버는 열려 있습니다.</span> ${data.players.online} / ${data.players.max} )`;
      } else {
        serverStatusElement.innerHTML = `<span style="color: red;">현재 서버는 닫혀 있습니다.</span>`;
      }
    })
    .catch(error => {
      console.error('서버 상태를 가져오는 중 오류 발생:', error);
      serverStatusElement.textContent = '상태 확인 실패';
    });
}

// 페이지가 로드될 때 서버 상태 확인 함수를 호출합니다.
document.addEventListener('DOMContentLoaded', checkServerStatus);

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

