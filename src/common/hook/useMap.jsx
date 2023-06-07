import { useCallback } from "react";
import { useState } from "react";

export default function useMap() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const makeMap = useCallback(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=9d0f0e60b8c9641a75a00620cda24d1b&autoload=false&libraries=services`;
    document.head.appendChild(script);

    window.kakao.maps.load(function () {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3, // 지도 확대 레벨
      };

      const map = new window.kakao.maps.Map(container, options);
      // 지도 생성

      const mapTypeControl = new kakao.maps.MapTypeControl();
      // 지도 컨트롤 생성

      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      // 지도 오른쪽 위에 지도 컨트롤

      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      // 확대, 축소 제어 줌  컨트롤 생성

      // *마커이미지*
      const imageSrc = "img/marker.png"; // 마커이미지의 주소
      const imageSize = new window.kakao.maps.Size(64, 69); // 마커이미지의 크기
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      // 지도 주소로 검색
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 현재 위치 마커
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도

          const markerPosition = new kakao.maps.LatLng(lat, lng);

          // 마커를 생성하고 지도에 표시합니다.
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

          // 지도의 중심을 현재 위치로 이동시킵니다.
          map.setCenter(markerPosition);
        });
      }

      // 주소로 검색한 마커
      POSITIONS.map((position) => {
        geocoder.addressSearch(position, function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );

            const marker = new window.kakao.maps.Marker({
              map,
              position: coords,
              image: markerImage,
            });

            // 마커 클릭
            window.kakao.maps.event.addListener(marker, "click", function () {
              console.log("1");
              setIsBottomSheetVisible(!isBottomSheetVisible);
              console.log("is", isBottomSheetVisible);
            });

            // 지도의 초점
            map.setCenter(coords);
          }
        });
      });
    });

    //
  });
}
