

// 업데이트 버튼
document.addEventListener('DOMContentLoaded', () => {

    // 1. 패치노트 데이터 (실제 데이터는 여기에 추가)
    const patchNotesData = {
        "V1.7.3": `<p>개발 노트가 없는 버전입니다</p>`,


        "V1.7.30": `<p>V1.7.3</p>
        <hr>
        <h5 class="update_cat">직업</h5>
<div class="update_container">
    <div class="update_sub_container">
        <span class="update_jobname">[크리퍼]</span><br>
        <span class="update_content">
        크리퍼는 무난한 성능을 가지고 있었지만 <br>
        제가 싫어하는 직업이라 너프합니다
   </span></div>
   
    <div class="update_sub_container">
        <span class="update_jobname">[유령]</span><br>
        <span class="update_content">
        이미 좋은 성능을 가지고 있었지만<br>
        제가 좋아하는 직업이라 버프합니다
   </span></div>
    <div class="update_sub_container">
        <span class="update_jobname">[기생충]</span><br>
        <span class="update_content">
        유저들의 피드백을 받아 버프합니다
   </span></div>
   </div>
   
<br><h5 class="update_cat">게임</h5>   
<div class="update_container">
        <div class="update_sub_container">
        현재 패작을 하는 사람이 있어서 <br>
        10연패하면 그냥 게임을 못하게 하겠습니다
        </div>
</div>`
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


