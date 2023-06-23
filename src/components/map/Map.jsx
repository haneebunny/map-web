import React from "react";
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
import NoticeMessage from "./NoticeMessage";

function Map(props) {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useRecoilState(
        isBottomSheetVisibleState
    );

    const [DB, setDB] = useState([]);

    // DB에서 뽑아낸 하나의 주차장 정보
    const [currentParkingLotInfo, setCurrentParkingLotInfo] = useState(null);

    // 카카오맵 객체
    const [currentParkingLot, setCurrentParkingLot] = useState();

    const [markerImage, setMarkerImage] = useState(null);

    const [isMobileSize, setIsMobileSize] = useState(false);

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

    useEffect(() => {
        console.log(currentParkingLot);
        if (currentParkingLot) {
            currentParkingLot.setMap(map);
        }
    }, [currentParkingLot]);

    const onClickMarker = useCallback(async (_id) => {
        if (!map) return;

        console.log("마커1", currentParkingLot);
        // // 기존 Info창이 있다면 삭제
        // if (currentParkingLot) await currentParkingLot.setMap(null);

        if (currentParkingLot) {
            currentParkingLot.setMap(null);
            // currentParkingLot.setMap(null);
            // setCurrentParkingLot(null);
        }
        console.log(currentParkingLot);

        setIsBottomSheetVisible(true);

        if (currentParkingLot) {
            currentParkingLot.setMap(null);
            setCurrentParkingLot(null);
        }

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

        setCurrentParkingLot(overlay); // currentParkingLot에 overlay 할당

        setCurrentParkingLotInfo(parkingLot);

        if (currentParkingLot) {
            currentParkingLot.setMap(map); // overlay를 지도에 표시
        }

        // // 지도 이동
        // DB.forEach(async (parkingLot) => {
        //     if (parkingLot.parkingCode === _id) {
        //         const moveLatLng = await new kakao.maps.LatLng(
        //             parkingLot.lat,
        //             parkingLot.lng
        //         );

        //         // 지도 확대 레벨 설정
        //         if (map.getLevel() > 8) {
        //             await map.setLevel(8);
        //         }
        //         await map.panTo(moveLatLng); // 지도 중심 좌표 이동

        //         // 커스텀 오버레이 생성 실패했던 것들
        //         // const overlayContent = <InfoOverlay info={parkingLot} />;
        //         // const overlayContent = InfoOverlay((info = { parkingLot }));
        //         // const { html } = renderToStringWithEmotion(
        //         //   <InfoOverlay info={parkingLot} />
        //         // );

        //         // renderToString을 서버에서 하면 emotion이 정상적으로 적용된다. (리액트v18 문제)
        //         const { data } = await axios.post("/api/overlay", parkingLot);

        //         const overlay = new kakao.maps.CustomOverlay({
        //             clickable: true, // 컨텐츠 영역 클릭시 지도 이벤트를 막아준다.
        //             content: data.html,
        //             // map: map,
        //             position: moveLatLng,
        //             xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1사이의 값을 가진다.
        //             yAnchor: 0.5, // 컨텐츠의 y축 위치. 이하 동문
        //         });

        //         setCurrentParkingLot({ ...overlay });

        //         // currentParkingLot.setMap(map);

        //         setCurrentParkingLotInfo(parkingLot);
        //     }
        // });
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

    // useEffect(() => {
    //     if (currentParkingLot) {
    //         currentParkingLot.setMap(null);
    //     }
    //     setCurrentParkingLotInfo(null);
    // }, [markers]);

    // 현재 위치 표시
    const showCurrentLocationMarker = useCallback(() => {
        if (!navigator.geolocation) return;

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

            // 마커 표시
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
                    className="w-20 h-5 z-30 absolute left-1/2 bg-amber-200"
                    onClick={showCurrentLocationMarker}
                >
                    내 위치
                </button>
                {isMobileSize && <BottomSheet info={currentParkingLotInfo} />}
            </div>
        </div>
    );
}

export default React.memo(Map);

