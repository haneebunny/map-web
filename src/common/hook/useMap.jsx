import { useRouter } from "next/router";
import { useCallback } from "react";
import { useState } from "react";

export default function useMap(mapContainer, setMarkerImage, markerImage, DB) {
  const router = useRouter();
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const makeMap = useCallback(() => {
    const options = {
      center: new window.kakao.maps.LatLng(35.1611293182418, 126.915927683652),
      level: window.innerHeight < 1300 ? 4 : 3, // 지도 확대 레벨 낮을 수록 좁은 범위
    };
    // 지도를 표시할 div와 지도 옵션으로 지도를 생성함
    const newMap = new window.kakao.maps.Map(mapContainer.current, options);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성(오른쪽 위에)
    const zoomControl = new window.kakao.maps.ZoomControl();
    newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    // *마커이미지*
    const imageSrc = "/img/marker.png"; // 마커이미지의 주소
    const imageSize = new window.kakao.maps.Size(64, 69); // 마커이미지의 크기
    const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    setMarkerImage(markerImage);

    setMap(newMap);

    // makeMap
  }, [mapContainer, setMarkerImage]);

  // 마커, 클러스터 생성
  const makeMarkers = useCallback(() => {
    if (!markerImage) return;

    // 기존 마커 제거
    if (markers.length > 0) {
      markers.forEach((marker) => marker.setMap(null));
    }

    // 마커 표시하기

    const newMarkers = [];
    DB.forEach((parkingLot) => {
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        title: parkingLot.parkingName, // 마커의 이름
        position: new kakao.maps.LatLng(parkingLot.lat, parkingLot.lng), // 마커를 표시할 위치(위도, 경도)
        image: markerImage,
        id: parkingLot.parkingCode,
      });

      // 마커를 배열에 저장
      newMarkers.push(marker);

      // 마커 클릭시 해당 bookstoreId로 라우터 이동
      kakao.maps.event.addListener(marker, "click", () =>
        router.push(`/map/${parkingLot.parkingCode}`)
      );
    });

    // 마커 배열을 state에 저장
    setMarkers(newMarkers);

    // Cluster 생성
    const cluster = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 7, // 클러스터 할 최소 지도 레벨
    });

    // 마커 클러스터에 추가
    cluster.addMarkers(newMarkers);
  }, [DB, map, markerImage]);

  const makeCluster = useCallback(() => {}, []);

  return { makeMap, makeMarkers, map };
}
