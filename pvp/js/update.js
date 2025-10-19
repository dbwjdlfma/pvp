

// 업데이트 버튼
document.addEventListener('DOMContentLoaded', () => {

    // 1. 패치노트 데이터 (실제 데이터는 여기에 추가)
    const patchNotesData = {
        "V1.10.0": `
            <p>V1.10.0<span class="update_date">(2025-10-18)</span></p>
                <hr>
                <h5 class="update_cat">시스템</h5>
                <div class="update_container nojob">
                <div class="update_sub_container">
                직업 선택 시 어떤직업이 선택 되었는지 띄워집니다<br>
                빠른 액션에 직업 선택 탭이 추가됩니다<br>
                직업 선택 탭에선 원하는 직업을 선택 할 수 있습니다
                </div>
                </div>
                <br>
                <h5 class="update_cat">직업</h5>
                <div class="update_container">
                <div class="update_sub_container">
                <span class="update_jobname">신규 직업 [마법사] 추가</span><br>
                <span class="update_content"><br>
                <a href="job.html?id=magic"><b>눌러서 자세히 알아보기</b></a>
                </span>
                </div>
                <div class="update_sub_container">
                <span class="update_jobname">[쿨쿨이]</span><br>
                <span class="update_content">
                자야되는 시간 2.5초 -> <span class="nurf">1.5초</span>
                </span>
                </div>
                <div class="update_sub_container">
                <span class="update_jobname">[광부]</span><br>
                <span class="update_content">
                땅에서 나올 때 대미지를 받는거리 3m -> <span class="buff">4m</span>
                </span>
                </div>
                <div class="update_sub_container">
                <span class="update_jobname">[유튜버]</span><br>
                <span class="update_content">
                저격후 구독자 1.5만명 감소 -> <span class="buff">7천명 감소</span>
                </span>
                </div>
                <div class="update_sub_container">
                <span class="update_jobname">[빙술사]</span><br>
                <span class="update_content">
                빔당 게이지 10증가 -> <span class="nurf">8증가</span>
                </span>
                </div>
                <div class="update_sub_container">
                <span class="update_jobname">[거너]</span><br>
                <span class="update_content">
                총을 버려 다른총기로 바꿀 수 있게 변경<br>
                산탄총의 탄환 수 10발 -> <span class="nurf">5발</span><br>
                킬 할 때마다 총의 대미지 0.3 증가 하게 변경<br>
                킬 할 시 탄환 5발 추가 -> <span class="nurf">3발추가</span>
                </span>
                </div>
                </div>
                <br>`
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


