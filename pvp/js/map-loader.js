class MapLoader {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const mapId = urlParams.get('id');
            const mapType = urlParams.get('type');

            if (!mapId || !mapType) {
                this.showError('맵 ID 또는 타입이 지정되지 않았습니다.');
                return;
            }

            await this.loadMapData(mapId, mapType);
        } catch (error) {
            console.error('맵 로더 초기화 실패:', error);
            this.showError('맵 정보를 불러오는 중 오류가 발생했습니다.');
        }
    }

    async loadMapData(mapId, mapType) {
        try {
            const response = await fetch('data/maps.json');
            if (!response.ok) {
                throw new Error('맵 데이터를 불러올 수 없습니다.');
            }

            const mapsData = await response.json();
            const mapData = mapsData[mapType]?.[mapId];

            if (!mapData) {
                throw new Error(`맵을 찾을 수 없습니다: ${mapType}/${mapId}`);
            }

            this.renderMap(mapData);
        } catch (error) {
            console.error('맵 데이터 로딩 실패:', error);
            this.showError(error.message);
        }
    }

    renderMap(mapData) {
        // 페이지 제목 업데이트
        document.getElementById('page-title').textContent = `${mapData.name} - 쓸모PVP`;
        document.getElementById('map-name').textContent = mapData.name;

        // 맵 이미지 렌더링
        this.renderMapImages(mapData.images);

        // 맵 타입 설정
        document.getElementById('map-type').textContent = `맵 형태: ${mapData.mapType}`;

        // 맵 이벤트 렌더링 (있는 경우에만)
        this.renderMapEvents(mapData.events);

        // 유리한 직업 설정
        document.getElementById('map-jobs').textContent = mapData.favorableJobs;
    }

    renderMapImages(images) {
        const imagesContainer = document.getElementById('map-images');
        imagesContainer.innerHTML = '';

        if (images && images.length > 0) {
            images.forEach(imagePath => {
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = '';
                img.className = 'map_img';
                imagesContainer.appendChild(img);
                
                // 이미지 사이에 줄바꿈 추가
                const br = document.createElement('br');
                imagesContainer.appendChild(br);
            });
        }
    }

    renderMapEvents(events) {
        const eventsSection = document.getElementById('map-events-section');
        const eventsContent = document.getElementById('map-events');

        if (events) {
            eventsSection.style.display = 'block';
            eventsContent.innerHTML = events;
        } else {
            eventsSection.style.display = 'none';
        }
    }

    showError(message) {
        const container = document.getElementById('map-content');
        container.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2>오류 발생</h2>
                <p>${message}</p>
                <a href="map_list.html">맵 목록으로 돌아가기</a>
            </div>
        `;
    }
}

// DOM이 로드되면 맵 로더 초기화
document.addEventListener('DOMContentLoaded', () => {
    new MapLoader();
});