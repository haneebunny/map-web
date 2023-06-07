import { useCallback } from "react";
import { useState } from "react";

export default function useMap(mapContainer, setMarkerImage, markerImage, DB) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const makeMap = useCallback(() => {
    const options = {
      center: new window.kakao.maps.LatLng(37.4932385, 126.9175228),
      level: window.innerHeight < 1300 ? 4 : 3, // 지도 확대 레벨
    };
    // 지도를 표시할 div와 지도 옵션으로 지도를 생성함
    const newMap = new window.kakao.maps.Map(mapContainer.current, options);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
    const zoomControl = new window.kakao.maps.ZoomControl();
    newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    // *마커이미지*
    const imageSrc = "img/marker.png"; // 마커이미지의 주소
    const imageSize = new window.kakao.maps.Size(64, 69); // 마커이미지의 크기
    const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    setMarkerImage(new kakao.maps.MarkerImage(imageSrc, imageSize));

    setMap(newMap);

    // makeMap
  }, [mapContainer, setMarkerImage]);

  // 마커를 생성하는 함수
  const makeMarkers = useCallback(() => {
    if (!markerImage) return;

    // 기존 마커 제거
    if (markers.length > 0) {
      markers.forEach((marker) => marker.setMap(null));
    }

    // 마커 표시하기

    const newMarkers = [];
    DB.forEach((store) => {
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        title: store.FCLTY_NM, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨
        position: new kakao.maps.LatLng(store.FCLTY_LA, store.FCLTY_LO), // 마커를 표시할 위치(위도, 경도)
        image: markerImage, // 커스텀 마커 이미지 설정
        id: store.ESNTL_ID, // 마커에 ESNTL_ID를 id로 설정
      });

      // 마커 클릭시 해당 bookstoreId로 라우터 이동
      kakao.maps.event.addListener(marker, "click", () =>
        navigate(`/map/${store.ESNTL_ID}`)
      );

      // 마커를 배열에 저장
      newMarkers.push(marker);
    });

    // 마커 배열을 state에 저장
    setMarkers(newMarkers);

    // eslint-disable-next-line
  }, [DB, map, markerImage]);

  return { makeMap, makeMarkers, map };
}
