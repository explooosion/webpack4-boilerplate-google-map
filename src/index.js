// import scss
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';

// import libs
import $ from 'jquery';
import 'bootstrap';

// import js
import Map from './lib/map';

if (process.env.NODE_ENV !== 'production') {
    console.warn('Looks like we are in development mode!');
}

// testing jquery and javascript
console.log($('h1').text());
console.log(document.querySelector('h1').innerText);

// initial map
const lat = 24.799448;
const lng = 120.979021;
const zoom = 14;
const map = new Map();

window.onload = () => {
    map.init(lat, lng, zoom);
};

// Search Event
$('#btnMarker').click(() => searchLocation());
$('#txtAdd').keypress(e => {
    if (e.keyCode === 13) searchLocation();
});


function searchLocation() {
    const addr = $('#txtAdd').val();
    if (addr === '') return;
    map.search(addr, result => {
        const { status, location, lat, lng } = result;

        if (!status) return;

        // 定位地址
        map.addMarker(location, 18);

        // 設定經緯度標籤
        $('#txtLat').text(`Lat：${lat}`);
        $('#txtLng').text(`Lng：${lng}`);
    });
}