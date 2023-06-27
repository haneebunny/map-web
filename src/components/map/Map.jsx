import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import useMap from "../../common/hook/useMap";

import { BiCurrentLocation } from "react-icons/bi";
//
import {
    currentParkingLotState,
    isBottomSheetVisibleState,
} from "../../common/store/atom";
import { getParkingLotParams } from "../../common/config/parkingLot";

// Components
import BottomSheet from "../bottomSheet/BottomSheet";
import NoticeMessage from "./NoticeMessage";

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

    const [isMobileSize, setIsMobileSize] = useState(false);

    const [currentLocationMarker, setCurrentLocationMarker] = useState([]);

    // 현재 위치 표시 마커 활성화 여부
    const [isActiveCurrentLocation, setIsActiveCurrentLocation] =
        useState(false);

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

        let copiedParkingLot = { ...currentParkingLot };

        let isEmpty = Object.entries(copiedParkingLot).length === 0;
        console.log(currentParkingLot, copiedParkingLot);

        if (!isEmpty) {
            console.log(copiedParkingLot !== {});
            console.log(copiedParkingLot);
            copiedParkingLot.setMap(null).then((result) => {
                console.log(result);
                copiedParkingLot = {};
            });
        }

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

        // overlay에 들어갈 Info
        setCurrentParkingLotInfo(parkingLot);

        // setCurrentParkingLot((parkingLot) => {
        //     parkingLot.forEach((infoOverlay) => infoOverlay.setMap(null));
        //     return [overlay];
        // });

        copiedParkingLot = overlay;

        console.log("null", copiedParkingLot);

        console.log(copiedParkingLot);

        if (!isEmpty) {
            console.log(copiedParkingLot);

            copiedParkingLot.setMap(map); // overlay를 지도에 표시
        }

        setCurrentParkingLot({ ...copiedParkingLot });
    });

    const { makeMap, makeMarkers, map, markers } = useMap(
        mapContainer,
        setMarkerImage,
        markerImage,
        DB,
        onClickMarker
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
        console.log("지도 생성");
        kakao.maps.load(() => {
            makeMap();
        });
    }, []);

    // 마커 생성
    useEffect(() => {
        console.log("마커 생성");
        kakao.maps.load(() => {
            makeMarkers();
        });
    }, [DB]);

    // 마커 클릭 후 router 변경 시
    // useEffect(() => {
    //     onClickMarker(_id);
    // }, [_id]);

    // 현재 위치 표시
    const showCurrentLocationMarker = useCallback(() => {
        console.log(map);
        if (!navigator.geolocation) return;
        setIsActiveCurrentLocation(true);

        // const newMarkers = markerPositions.map(
        //     (position) =>
        //         new kakao.maps.Marker({
        //             map: map,
        //             position,
        //             image: markerImage,
        //         })
        // );
        // setMarkers(
        //     (markers) => markers.forEach((marker) => marker.setMap(null))

        //     //이전에 생성된 마커도 관리하려면 아래와 같이 return 해주세요.
        //     // return markers.concat(newMarkers); //이전에 생성된 마커 + 새로 생성한 마커
        // );

        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude; // 현재 위치의 위도
            const lng = position.coords.longitude; // 현재 위치의 경도

            const currentLocation = new kakao.maps.LatLng(lat, lng);

            const imageSrc = "/img/point.png"; // 마커이미지의 주소
            const imageSize = new window.kakao.maps.Size(40, 40); // 마커이미지의 크기
            const markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize
                // imageOption
            );

            const markerCurrentLocation = new kakao.maps.Marker({
                position: currentLocation,
                image: markerImage,
                // message : '<div>여기에 계신가요?</div>',
                title: "Current Location",
            });

            // await setCurrentLocationMarker(markerCurrentLocation);
            // // 마커 표시
            // if (currentLocationMarker) {
            //     currentLocationMarker.setMap(map);
            // }

            markerCurrentLocation.setMap(map);

            // 마커 좌표로 이동
            map.panTo(currentLocation);
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
                <NoticeMessage />
                <button
                    className="w-8 h-8 z-30 absolute right-1  bottom-1/3 bg-white
                      shadow-lg  rounded-md
                    "
                    onClick={showCurrentLocationMarker}
                >
                    <BiCurrentLocation
                        className={`text-xl m-auto ${
                            isActiveCurrentLocation
                                ? "text-amber-400"
                                : "text-gray-600"
                        }`}
                    />
                </button>
                {isMobileSize && <BottomSheet info={currentParkingLotInfo} />}
            </div>
        </div>
    );
}

export default React.memo(Map);

