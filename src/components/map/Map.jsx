import { useEffect } from "react";

export default function KakaoMap(props) {
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

          const imageSrc = "/img/marker.png"; // 마커이미지의 주소입니다
          const imageSize = new window.kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
          const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          // 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
          function setMapType(maptype) {
            var roadmapControl = document.getElementById("btnRoadmap");
            var skyviewControl = document.getElementById("btnSkyview");
            if (maptype === "roadmap") {
              map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
              roadmapControl.className = "selected_btn";
              skyviewControl.className = "btn";
            } else {
              map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
              skyviewControl.className = "selected_btn";
              roadmapControl.className = "btn";
            }
          }

          // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
          function zoomIn() {
            map.setLevel(map.getLevel() - 1);
          }

          // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
          function zoomOut() {
            map.setLevel(map.getLevel() + 1);
          }

          const geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.addressSearch(
            "서울시 서초구 방배로18길 16",
            function (result, status) {
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

                map.setCenter(coords);
              }
            }
          );
        });
      };
    }
  }, []);

  return (
    <div class="map_wrap">
      <div
        id="map"
        style={{
          width: "500px",
          height: "500px",
          position: "relative",
          overflow: "hidden",
        }}
        // style="width:100%;height:100%;position:relative;overflow:hidden;"
      ></div>
    </div>
  );
}
