// import scss
import './scss/index.scss';

// import libs
import $ from 'jquery';
import 'bootstrap';
import '@claviska/jquery-minicolors';

// import js
import Map from './lib/map';
import { toggleToolButton, searchLocation } from './lib/map.tool';

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
    searchLocation(map);
};

// Search Event
$('#btnPosotion').click(() => searchLocation(map));
$('#txtAdd').keypress(e => {
    if (e.keyCode === 13) searchLocation(map);
});

// circle update
$('#txtRange').bind('keyup mouseup', e => {
    if (!map.centerCircle) return;
    map.centerCircle.setRadius(Number(e.target.value));
});

// 圓形顏色與更新
$('#txtColor').minicolors();
$('#txtColor').change(e => {
    if (!map.centerCircle) return;
    map.centerCircle.setOptions({
        strokeColor: e.target.value,
        fillColor: e.target.value,
    });
});

// 地圖標記新增
$('#btnMarker').click(e => {
    map.currentMode = map.currentMode === map.modes.DRAW ? map.modes.POINT : map.modes.DRAW;
    toggleToolButton(e.target);
});

// 地圖標記刪除
$('#btnDelete').click(e => {
    map.currentMode = map.currentMode === map.modes.DELETE ? map.modes.POINT : map.modes.DELETE;
    toggleToolButton(e.target);
});

// 地圖標記清空
$('#btnDeleteAll').click(e => map.deleteAllMarkers());