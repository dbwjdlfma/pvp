class JobLoader {
    constructor() {
        this.jobsData = null;
        this.init();
    }
    
    async init() {
        // URL에서 직업 ID 추출
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('id');
        
        if (!jobId) {
            this.showError('직업을 찾을 수 없습니다.');
            return;
        }
        
        await this.loadJobData();
        this.renderJob(jobId);
    }
    
    async loadJobData() {
        try {
            const response = await fetch('data/jobs.json');
            if (!response.ok) {
                throw new Error('데이터 파일을 찾을 수 없습니다.');
            }
            this.jobsData = await response.json();
        } catch (error) {
            console.error('데이터 로드 실패:', error);
            this.showError('데이터를 불러올 수 없습니다: ' + error.message);
        }
    }
    
    renderJob(jobId) {
        const job = this.jobsData[jobId];
        if (!job) {
            this.showError('존재하지 않는 직업입니다: ' + jobId);
            return;
        }
        
        // 제목 설정
        document.getElementById('job-name').textContent = job.name;
        document.title = `${job.name} - 쓸모PVP`;
        
        // 콘텐츠 렌더링
        let contentHtml = `
            <h2>역할</h2>
            <p>${job.role}</p><br>
            
            <h2>스탯</h2>
            <p class="stat">HP : ${job.stats.hp} | 쿨타임 : ${job.stats.cooltime} | 이동속도 : ${job.stats.speed} | 공격속도 : ${job.stats.attackSpeed} | 공격력 : ${job.stats.damage}</p><br>
            
            <h2>능력</h2>
            <p class="skill">${Array.isArray(job.skill) ? job.skill.join('') : job.skill}</p><br>
        `;
        
        // 무기 정보가 있는 경우 (총잡이 등)
        if (job.weapons) {
            contentHtml += `<h2>무기 정보</h2>`;
            Object.entries(job.weapons).forEach(([key, weapon]) => {
                contentHtml += `
                    <h3>${weapon.name}</h3>
                    <p class="skill">최대 탄창 수 : ${weapon.maxAmmo}발<br>
                    데미지 : ${weapon.damage}<br>
                    ${weapon.description}</p><br>
                `;
            });
        }
        
        // 시너지가 있는 경우만 추가
        if (job.synergy) {
            contentHtml += `
                <h2>시너지</h2>
                <p class="skill">${Array.isArray(job.synergy) ? job.synergy.join('') : job.synergy}</p>
            `;
        }
        
        document.getElementById('job-content').innerHTML = contentHtml;
        
        // 비디오 렌더링
        if (job.video) {
            const videoHtml = `
                <iframe class="job_video" 
                    src="https://www.youtube.com/embed/${job.video}?si=WoKGldnnEUIKX7ud&autoplay=1&mute=1" 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                </iframe>
            `;
            document.getElementById('job-video-container').innerHTML = videoHtml;
        }
    }
    
    showError(message) {
        document.getElementById('job-name').textContent = '오류';
        document.getElementById('job-content').innerHTML = `<p style="color: red;">오류: ${message}</p>`;
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    new JobLoader();
});