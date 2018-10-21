class Map {
    constructor() {
        this.map = null;
        this.geocoder = null;
        this.centerMarker = null;
        this.centerCircle = null;
        this.markers = [];
    }

    /**
     * 初始化地圖
     * @param {number} lat 
     * @param {number} lng 
     * @param {number} zoom 
     */
    init(lat, lng, zoom) {
        this.map = new google.maps.Map(document.querySelector('.map'), {
            center: { lat: lat, lng: lng },
            zoom: zoom,
        });
        this.map.addListener('click', this.onClick);
        this.geocoder = new google.maps.Geocoder;
    }

    /**
     * 地圖 Click 事件
     * @param {*} args 
     */
    onClick(args) {
        const { latLng } = args;
        console.log('click', latLng.lat(), latLng.lng());
        return latLng;
    }

    /**
     * 新增標記點
     * @param {object} location 
     * @param {number} zoom 
     */
    addMarker(location, zoom) {
        // 移除當前標記
        if (this.centerMarker) {
            this.centerMarker.setMap(null);
        }
        this.centerMarker = new google.maps.Marker({
            position: location,
            map: this.map,
        });
        // 將定位點置中
        this.map.setCenter(location);
        this.map.setZoom(zoom || 14);
    }

    /**
     * 新增圓形範圍
     * @param {object} location 
     * @param {number} radius 
     */
    addCircle(location, radius, color = '#FF0000') {
        // 移除當前標記
        if (this.centerCircle) {
            this.centerCircle.setMap(null);
        }
        this.centerCircle = new google.maps.Circle({
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            map: this.map,
            center: location,
            radius: Number(radius),
        });
    }

    /**
     * 地址搜尋經緯度
     * @param {string} address 
     * @param {object} callback 
     */
    search(address, callback) {
        this.geocoder.geocode({ 'address': address }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                const location = results[0].geometry.location;
                const lat = Number(results[0].geometry.location.lat()).toFixed(6);
                const lng = Number(results[0].geometry.location.lng().toFixed(6));
                callback({ status: true, lat, lng, location });
            }
        });
    }
}

export default Map;