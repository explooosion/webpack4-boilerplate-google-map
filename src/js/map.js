class Map {
    constructor() {
        this.map = null;
        this.geocoder = null;
        this.centerMarker = null;
        this.markers = [];
    }

    init(lat, lng, zoom) {
        this.map = new google.maps.Map(document.querySelector('.map'), {
            center: { lat: lat, lng: lng },
            zoom: zoom,
        });
        this.map.addListener('click', this.onClick);

        this.geocoder = new google.maps.Geocoder;
    }

    onClick(args) {
        const { latLng } = args;
        console.log('click', latLng.lat(), latLng.lng());
        return latLng;
    }

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

    search(address, callback) {
        return this.geocoder.geocode({ 'address': address }, (results, status) => {
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