/**
 * 將地圖工具的按鈕切換樣式
 * @param {element} element 
 */
function toggleToolButton(element) {
    const isActive = $(element).hasClass('active');
    $('#btnMarker').removeClass('active');
    $('#btnDelete').removeClass('active');

    if (!isActive) $(element).addClass('active');
}

/**
 * 地址與關鍵字搜尋
 */
function searchLocation(map) {
    const addr = $('#txtAdd').val();
    if (addr === '') return;
    map.search(addr, result => {
        const { status, location, lat, lng } = result;

        if (!status) return;

        // 定位地址
        map.addCenterMarker(location, 18);
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

export {
    toggleToolButton,
    searchLocation,
};