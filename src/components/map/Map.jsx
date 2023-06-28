import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import useMap from "../../common/hook/useMap";

//
import {
    currentParkingLotState,
    isBottomSheetVisibleState,
} from "../../common/store/atom";
import { getParkingLotParams } from "../../common/config/parkingLot";

// Components
import BottomSheet from "../bottomSheet/BottomSheet";
import NoticeMessage from "./NoticeMessage";
import MyLocation from "./MyLocation";

function Map(props) {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useRecoilState(
        isBottomSheetVisibleState
    );

    const [DB, setDB] = useState([]);

    // DB에서 뽑아낸 하나의 주차장 정보
    const [currentParkingLotInfo, setCurrentParkingLotInfo] = useState(null);

    // 카카오맵 객체
    const [currentParkingLot, setCurrentParkingLot] = useRecoilState(
        currentParkingLotState
    );

    const [markerImage, setMarkerImage] = useState(null);
    const [markerImageB, setMarkerImageB] = useState(null);
    const [markerImageY, setMarkerImageY] = useState(null);

    const [isMobileSize, setIsMobileSize] = useState(false);

    const router = useRouter();

    const { _id } = router.query;

    // 지도가 표시될 HTML element
    const mapContainer = useRef(null);

    const handleResize = () => {
        if (window.innerWidth <= 767) {
            setIsMobileSize(true);
        } else {
            setIsMobileSize(false);
        }
    };

    useEffect(() => {
        if (window.innerWidth <= 767) {
            setIsMobileSize(true);
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isMobileSize]);

    // useEffect(() => {
    //     console.log(currentParkingLot);
    //     if (currentParkingLot) {
    //         currentParkingLot.setMap(map);
    //     }
    // }, [currentParkingLot]);

    const onClickMarker = useCallback(async (_id) => {
        if (!map) return;

        // // 기존 Info창이 있다면 삭제
        // if (currentParkingLot) await currentParkingLot.setMap(null);

        let copiedParkingLot = [...currentParkingLot];

        if (currentParkingLot.length) {
            currentParkingLot.map((overlay) => overlay.setMap(null));
            setCurrentParkingLot([]);
        }

        console.log("하이", currentParkingLot);

        // 바텀시트 활성화
        setIsBottomSheetVisible(true);

        const parkingLot = DB.find((lot) => lot.parkingCode === _id);
        if (!parkingLot) return;

        const moveLatLng = new kakao.maps.LatLng(
            parkingLot.lat,
            parkingLot.lng
        );

        // 지도 확대 레벨 설정
        if (map.getLevel() > 8) {
            map.setLevel(8);
        }
        map.panTo(moveLatLng); // 지도 중심 좌표 이동

        // renderToString을 서버에서 하면 emotion이 정상적으로 적용된다. (리액트v18 문제)
        const { data } = await axios.post("/api/overlay", parkingLot);

        const overlay = new kakao.maps.CustomOverlay({
            clickable: true, // 컨텐츠 영역 클릭시 지도 이벤트를 막아준다.
            content: data.html,
            position: moveLatLng,
            xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1사이의 값을 가진다.
            yAnchor: 0.5, // 컨텐츠의 y축 위치. 이하 동문
        });

        copiedParkingLot.push(overlay);
        setCurrentParkingLot((prev) => [overlay]);

        // overlay에 들어갈 Info
        setCurrentParkingLotInfo(parkingLot);
    });

    const { makeMap, makeMarkers, map, markers } = useMap({
        mapContainer,
        setMarkerImageB,
        setMarkerImageY,
        markerImageB,
        markerImageY,
        DB,
        onClickMarker,
    });

    useEffect(() => {
        if (!map) return;
        console.log(map);
        console.log(currentParkingLot);
        if (currentParkingLot.length) {
            console.log("안", currentParkingLot);
            currentParkingLot.map((overlay) => overlay && overlay.setMap(null));
        }
    }, [map, currentParkingLot]);

    // 서버에 api요청해 데이터 받아오기
    useEffect(() => {
        const getParkingLotData = async () => {
            const { data } = await axios.get(`./api/parking-lot`, {
                params: getParkingLotParams,
            });
            setDB(data);
        };
        getParkingLotData();
    }, []);

    // 지도 생성
    useEffect(() => {
        console.log("지도 생성");
        window.kakao.maps.load(() => {
            makeMap();
        });
    }, []);

    // 마커 생성
    useEffect(() => {
        console.log("마커 생성");
        window.kakao.maps.load(() => {
            makeMarkers();
        });
    }, [DB]);

    // 마커 클릭 후 router 변경 시
    // useEffect(() => {
    //     onClickMarker(_id);
    // }, [_id]);

    return (
        <div className="w-full sm:text-sm">
            <div
                ref={mapContainer}
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <NoticeMessage />
                <MyLocation map={map} />
                {isMobileSize && currentParkingLotInfo && (
                    <BottomSheet
                        info={currentParkingLotInfo}
                        setCurrentParkingLotInfo={setCurrentParkingLotInfo}
                    />
                )}
            </div>
        </div>
    );
}

export default React.memo(Map);

