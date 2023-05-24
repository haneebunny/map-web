import { useEffect } from "react";

const POSITIONS = [
  "서울시 서초구 방배로18길 16",
  "서울시 동작구 여의대방로22아길 22",
];
export default function BaseLayer() {
  //지도

  useEffect(() => {
    if (true) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=9d0f0e60b8c9641a75a00620cda24d1b&autoload=false&libraries=services`;
      document.head.appendChild(script);

      script.onload = () => {
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

                // 지도의 초점
                map.setCenter(coords);
              }
            });
          });

          // geocoder.addressSearch(
          //   "서울시 서초구 방배로18길 16",
          //   function (result, status) {
          //     if (status === window.kakao.maps.services.Status.OK) {
          //       const coords = new window.kakao.maps.LatLng(
          //         result[0].y,
          //         result[0].x
          //       );

          //       const marker = new window.kakao.maps.Marker({
          //         map,
          //         position: coords,
          //         image: markerImage,
          //       });

          //       map.setCenter(coords);
          //     }
          //   }
          // );
        });
      };
    }
  }, []);
  return (
    <div>
      <img src="/img/marker.png" />
    </div>
  );
}