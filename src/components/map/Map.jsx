import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { getParkingList } from "../../common/api/shine-vill";
import { getParkingLotParams } from "../../common/config/parkingLot";
import useMap from "../../common/hook/useMap";
import { isBottomSheetVisibleState } from "../../common/store/atom";
import BottomSheet from "../bottomSheet/BottomSheet";
import Modal from "../modal/Modal";

const POSITIONS = [
  "서울시 서초구 방배로18길 16",
  "서울시 동작구 여의대방로22아길 22",
];

export default function Map(props) {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useRecoilState(
    isBottomSheetVisibleState
  );

  const [DB, setDB] = useState([]);

  // 지도가 표시될 HTML element
  const mapContainer = useRef(null);

  const [markerImage, setMarkerImage] = useState(null);

  const { makeMap, makeMarkers, map } = useMap(
    mapContainer,
    setMarkerImage,
    markerImage,
    DB
  );

  const router = useRouter();

  const { _id } = router.query;

  // const { data: parkingDB } = useQuery(["DB", DB], () => getParkingList(), {
  //   enabled: true,
  // });

  useEffect(() => {
    const getParkingLotData = async () => {
      const { data } = await axios.get(`/api/parking-lot`, {
        params: getParkingLotParams,
      });

      setDB(data);
    };
    getParkingLotData();
  }, []);
  // console.log(parkingDB);
  // 지도 생성
  useEffect(() => {
    kakao.maps.load(() => {
      makeMap();
    });
    // setDB(defaultDB);
  }, [makeMap, setDB]);

  // 마커 생성
  useEffect(() => {
    kakao.maps.load(() => {
      makeMarkers();
    });
  }, [DB, makeMarkers, markerImage]);

  useEffect(() => {
    moveMap(_id);
  }, [_id, map]);

  const moveMap = useCallback((_id) => {
    if (!map) return;

    // bookstoreId에 해당하는 마커로 지도 이동
    DB.forEach((parkingLot) => {
      if (parkingLot.parkingCode === _id) {
        const moveLatLng = new kakao.maps.LatLng(
          parkingLot.lat,
          parkingLot.lng
        );

        // 지도 확대 레벨 설정
        if (map.getLevel() > 8) {
          map.setLevel(8);
        }
        map.panTo(moveLatLng); // 지도 중심 좌표 이동

        // 커스텀 오버레이 생성
        // const overlayContent = ReactDOMServer.renderToString(
        //   <Overlay info={parkingLot} />
        // );
        // const overlay = new kakao.maps.CustomOverlay({
        //   content: overlayContent,
        //   map: map,
        //   position: moveLatLng,
        //   xAnchor: 0.5,
        //   yAnchor: 0.5,
        // });

        // setCurrentOverlayStoreId(overlay);
      }
    });
  });

  return (
    <div className="w-full">
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "80vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isBottomSheetVisible && <BottomSheet />}

        <button className="absolute z-10 bg-green-400">버튼버튼버튼</button>
      </div>
      {/* <BaseLayer /> */}
    </div>
  );
}
