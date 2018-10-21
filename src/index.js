// import scss
import './scss/index.scss';

// import libs
import $ from 'jquery';
import 'bootstrap';
import '@claviska/jquery-minicolors';

// import js
import Map from './lib/map';

if (process.env.NODE_ENV !== 'production') {
    console.warn('Looks like we are in development mode!');
}

// testing jquery and javascript
console.log($('h1').text());
console.log(document.querySelector('h1').innerText);

// initial map
const lat = 25.048853;
const lng = 121.518709;
const zoom = 17;
const map = new Map();

window.onload = () => {
    map.init(lat, lng, zoom);
    searchLocation();
};

// Search Event
$('#btnMarker').click(() => searchLocation());
$('#txtAdd').keypress(e => {
    if (e.keyCode === 13) searchLocation();
});

// circle update
$('#txtRange').bind('keyup mouseup', e => {
    if (!map.centerCircle) return;
    map.centerCircle.setRadius(Number(e.target.value));
});

// circle color and update
$('#txtColor').minicolors();
$('#txtColor').change(e => {
    if (!map.centerCircle) return;
    map.centerCircle.setOptions({
        strokeColor: e.target.value,
        fillColor: e.target.value,
    });
});

function searchLocation() {
    const addr = $('#txtAdd').val();
    if (addr === '') return;
    map.search(addr, result => {
        const { status, location, lat, lng } = result;

        if (!status) return;

        // 定位地址
        map.addMarker(location, 18);
        map.addCircle(
            location,
            $('#txtRange').val(),
            $('#txtColor').val()
        );

        // 設定經緯度標籤
        $('#txtLat').text(`Lat：${lat}`);
        $('#txtLng').text(`Lng：${lng}`);
    });
}