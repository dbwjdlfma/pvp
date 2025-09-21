

// 업데이트 버튼
document.addEventListener('DOMContentLoaded', () => {

    // 1. 패치노트 데이터 (실제 데이터는 여기에 추가)
    const patchNotesData = {
                "V1.8.0": `<p>V1.8.0.2<span class="update_date">(2025-09-21)</span></p>
            <hr>
             <h5 class="update_cat">직업</h5>
                <div class="update_sub_container">
                <span class="update_jobname">[시간관리자]</span><br>
                <span class="update_content">
                능력을 사용한 자리로 돌아갈 때 무적 상태로 변경
                </span></div>
        <br>
                <p>V1.8.0.1<span class="update_date">(2025-09-21)</span></p>
            <hr>
             <h5 class="update_cat">직업</h5>
                <div class="update_sub_container">
                <span class="update_jobname">[시간관리자]</span><br>
                <span class="update_content">
                시공간에 끌리는 강도가 더 쎄짐<br>
                능력을 사용하고 7초 안에 [시공간 부수기]를 사용해야 원래 자리로 돌아가고<br>
                사용 하지 못하면 초기화 되게 변경<br>
                <br>
                능력을 사용하던 자리로 돌아가던 속도가 빨라짐<br>
                능력을 사용하던 자리로 돌아갈 때 투명화 상태이게 변경<br>
                체력이 돌아가지 않던 버그 수정<br>
                쿨타임 15초 -> <span class="buff">12초</span>
                </span></div>
        <br>
        <p>V1.8.0<span class="update_date">(2025-09-21)</span></p>
            <hr>
             <h5 class="update_cat">직업</h5>
                <div class="update_container">
                <div class="update_sub_container">
                <span class="update_jobname">신규 직업 [시간관리자] 추가</span><br>
                <span class="update_content"><br>
                <a href="job-time.html"><b>눌러서 자세히 알아보기</b></a>
                </span></div>
                   <div class="update_sub_container">
                <span class="update_jobname">[로봇]</span><br>
                <span class="update_content">
                버킷 서버 문제로 인해 로봇의 사용이 불가능 해집니다
                </span></div>
                   <div class="update_sub_container">
                <span class="update_jobname">[산타]</span><br>
                <span class="update_content">
                탑승 대기시간 7초 -> <span class="buff">1.5초</span><br>
                탑승 대기중에 대미지가 60% 감소되게 변경 </span><br>
                썰매타고 올라가는 높이가 낮아짐<br>
                탑승 대기시간에 쿨타임이 흐르던 버그 수정(텍스트 상으로만 떴음)<br>
                편안한 휴식에서 힐 되는 기능 삭제<br>
                썰매가 부서지지 않게 변경<br>
                썰매가 1초마다 떨어지지 않던 버그 수정<br>
                썰매가 땅에 떨어지지 않고 벽에 낑겨도 선물이 뿌려지던 버그 수정<br>
                [폭탄]이 땅에 떨어지면 바로 터지게 변경
        [폭탄]의 대미지 5 -> <span class="nurf">4</span>
                </span></div>
               </div>
        <br>`,
            "V1.7.3": `<p>V1.7.3<span class="update_date">(2025-09-18)</span></p>
            <hr>
             <h5 class="update_cat">직업</h5>
                <div class="update_container">
                <div class="update_sub_container">
                <span class="update_jobname">[유튜버]</span><br>
                <span class="update_content">
                공개 저격 시 즉시 정신적고통을 받게 변경
                </span></div>
                   <div class="update_sub_container">
                <span class="update_jobname">[투척수]</span><br>
                <span class="update_content">
                연막 지속시간 4초 -> <span class="nurf">2초</span><br>
                연막이 안생기던 버그 수정<br>
                </span></div>
                <div class="update_sub_container">
                <span class="update_jobname">[광부]</span><br>
                <span class="update_content">
                땅에서 올라올 떄 5m 이내에 대미지를 줌 <span class="nurf">2m</span>
                </span></div>
                   <div class="update_sub_container">
                <span class="update_jobname">[판사]</span><br>
                <span class="update_content">
                살인이 일어났을 때의 판결 확률 비율 65:55 -> <span class="nurf">55:45</span>
                </span></div>
                <div class="update_sub_container">
                <span class="update_jobname">[빙술사]</span><br>
                <span class="update_content">
                빔당 게이지 20 -> <span class="nurf">13</span><br>
                유저에게 주는 빔 대미지 0.7 -> <span class="nurf">0.5</span><br>
                플레이어에게 빔을 쏘면 0.5초뒤에 다시 사옹 할 수 있게 변경
                </span></div>
               </div>

            <h5 class="update_cat">사이트</h5>
            <div class="update_container nojob">
                <div class="update_sub_container">
                사이트의 시스템 및 UI가 전부 개편됩니다
                </div>
            </div>
        <br>
            <h5 class="update_cat">기타</h5>
            <div class="update_container nojob">
                <div class="update_sub_container">
                직업선택을 하여도 빠른액션을 통해 제한시간및 발광발동 시간을 바꿀 수 있던 버그 수정
                </div>
            </div>
        <br>
        `
            // 필요한 만큼 버전 추가...
            };

    // 2. 필요한 요소들 선택
    const versionSelectButton = document.querySelector('.version-select');
    const versionSlot = document.querySelector('.version-slot');
    const dropdown = document.getElementById('version-dropdown');
    const dropdownItems = document.querySelectorAll('.version-dropdown-item');
    const patchNotesContainer = document.getElementById('patch_notes_container');

    // 3. 버전 선택 버튼 클릭 시 드롭다운 토글
    versionSelectButton.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    // 4. 드롭다운 메뉴에서 버전을 선택했을 때의 이벤트 처리
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedVersion = item.textContent; // 클릭한 아이템의 텍스트(버전)
            versionSlot.textContent = selectedVersion; // 메인 버튼의 텍스트를 변경
            dropdown.classList.remove('show'); // 드롭다운 숨기기
            updatePatchNote(selectedVersion); // 선택된 버전에 맞는 패치노트 표시
        });
    });

    // 5. 현재 버전에 맞는 패치노트를 표시하는 함수
    function updatePatchNote(version) {
        if (patchNotesData[version]) {
            patchNotesContainer.innerHTML = `<div class="patch_note">${patchNotesData[version]}</div>`;
        }
    }

    // 6. 페이지 로드 시 가장 최신 버전(첫 번째 슬롯의 텍스트)의 패치노트를 기본으로 표시
    updatePatchNote(versionSlot.textContent);
});


