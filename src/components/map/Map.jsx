import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import * as ReactDOMServer from "react-dom/server";
import { useRecoilState } from "recoil";

import { isBottomSheetVisibleState } from "../../common/store/atom";

import { getParkingLotParams } from "../../common/config/parkingLot";
import useMap from "../../common/hook/useMap";

// Components
import BottomSheet from "../bottomSheet/BottomSheet";
import InfoOverlay from "./InfoOverlay";
import { renderStylesToString } from "@emotion/server";
import { renderToStringWithEmotion } from "../../../pages/api/function";

const POSITIONS = [
    "서울시 서초구 방배로18길 16",
    "서울시 동작구 여의대방로22아길 22",
];

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
        axios.postL;
        // setDB(defaultDB);
    }, [makeMap, setDB]);

    // 마커 생성
    useEffect(() => {
        kakao.maps.load(() => {
            makeMarkers();
        });
    }, [DB, makeMarkers, markerImage]);

    useEffect(() => {
        onClickMarker(_id);
    }, [_id, map]);

    const onClickMarker = useCallback((_id) => {
        if (!map) return;

        // 기존 Info창이 있다면 삭제
        if (currentParkingLot) currentParkingLot.setMap(null);

        setIsBottomSheetVisible(true);

        // 지도 이동
        DB.forEach(async (parkingLot) => {
            if (parkingLot.parkingCode === _id) {
                const moveLatLng = await new kakao.maps.LatLng(
                    parkingLot.lat,
                    parkingLot.lng
                );

                // 지도 확대 레벨 설정
                if (map.getLevel() > 8) {
                    await map.setLevel(8);
                }
                await map.panTo(moveLatLng); // 지도 중심 좌표 이동

                // 커스텀 오버레이 생성
                // const overlayContent = renderStylesToString(
                //   ReactDOMServer.renderToString(<InfoOverlay info={parkingLot} />)
                // );

                // const { html } = renderToStringWithEmotion(
                //   <InfoOverlay info={parkingLot} />
                // );

                const { data } = await axios.post("/api/overlay", parkingLot);

                const overlay = await new kakao.maps.CustomOverlay({
                    content: data.html,
                    map: map,
                    position: moveLatLng,
                    xAnchor: 0.5,
                    yAnchor: 0.5,
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

                <button className="absolute z-10 bg-green-400">
                    버튼버튼버튼
                </button>
            </div>
            {/* <BaseLayer /> */}
        </div>
    );
}
