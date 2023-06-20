import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import useMap from "../../common/hook/useMap";

//
import { isBottomSheetVisibleState } from "../../common/store/atom";
import { getParkingLotParams } from "../../common/config/parkingLot";

// Components
import BottomSheet from "../bottomSheet/BottomSheet";

export default function Map(props) {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useRecoilState(
        isBottomSheetVisibleState
    );

    const [DB, setDB] = useState([]);

    // DB에서 뽑아낸 하나의 주차장 정보
    const [currentParkingLotInfo, setCurrentParkingLotInfo] = useState(null);

    // 카카오맵 객체
    const [currentParkingLot, setCurrentParkingLot] = useState(null);

    // 지도가 표시될 HTML element
    const mapContainer = useRef(null);

    const [markerImage, setMarkerImage] = useState(null);

    const { makeMap, makeMarkers, map, markers } = useMap(
        mapContainer,
        setMarkerImage,
        markerImage,
        DB
    );

    const router = useRouter();

    const { _id } = router.query;

    // 서버에 api요청해 데이터 받아오기
    useEffect(() => {
        const getParkingLotData = async () => {
            const { data } = await axios.get(`/api/parking-lot`, {
                params: getParkingLotParams,
            });

            setDB(data);
        };
        getParkingLotData();
    }, []);

    // 지도 생성
    useEffect(() => {
        kakao.maps.load(() => {
            makeMap();
        });
    }, []);

    // 마커 생성
    useEffect(() => {
        kakao.maps.load(() => {
            makeMarkers();
        });
    }, [DB, _id]);

    // 마커 클릭시
    useEffect(() => {
        onClickMarker(_id);
    }, [_id, map]);

    // useEffect(() => {
    //     if (currentParkingLot) {
    //         currentParkingLot.setMap(null);
    //     }
    //     setCurrentParkingLotInfo(null);
    // }, [markers]);

    const onClickMarker = useCallback((_id) => {
        if (!map) return;

        // 기존 Info창이 있다면 삭제
        if (currentParkingLot) currentParkingLot.setMap(null);

        console.log("기존꺼삭제", currentParkingLot);

        setIsBottomSheetVisible(true);

        // 지도 이동
        DB.forEach(async (parkingLot) => {
            if (parkingLot.parkingCode === _id) {
                const moveLatLng = await new kakao.maps.LatLng(parkingLot.lat);

                // 지도 확대 레벨 설정
                if (map.getLevel() > 8) {
                    await map.setLevel(8);
                }
                await map.panTo(moveLatLng); // 지도 중심 좌표 이동

                // 커스텀 오버레이 생성 실패했던 것들
                // const overlayContent = <InfoOverlay info={parkingLot} />;
                // const overlayContent = InfoOverlay((info = { parkingLot }));
                // const { html } = renderToStringWithEmotion(
                //   <InfoOverlay info={parkingLot} />
                // );

                // renderToString을 서버에서 하면 emotion이 정상적으로 적용된다. (리액트v18 문제)
                const { data } = await axios.post("/api/overlay", parkingLot);

                const overlay = await new kakao.maps.CustomOverlay({
                    clickable: true, // 컨텐츠 영역 클릭시 지도 이벤트를 막아준다.
                    content: data.html,
                    map: map,
                    position: moveLatLng,
                    xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1사이의 값을 가진다.
                    yAnchor: 0.5, // 컨텐츠의 y축 위치. 이하 동문
                });

                setCurrentParkingLot(overlay);
                setCurrentParkingLotInfo(parkingLot);
            }
        });
    });

    return (
        <div className="w-full">
            <div
                ref={mapContainer}
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <BottomSheet info={currentParkingLotInfo} />
            </div>
        </div>
    );
}

