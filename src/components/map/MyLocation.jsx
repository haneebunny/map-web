import { useCallback, useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";

export default function MyLocation({ map }) {
    const [currentLocationMarker, setCurrentLocationMarker] = useState([]);

    // 현재 위치 표시 마커 활성화 여부
    const [isActiveCurrentLocation, setIsActiveCurrentLocation] =
        useState(false);

    // 현재 위치 표시 함수 끝난 후 맵에 마커 표시
    useEffect(() => {
        if (currentLocationMarker.length) {
            currentLocationMarker.map((marker) => marker.setMap(map));
        }
    }, [currentLocationMarker]);
    // 현재 위치 표시
    const showCurrentLocationMarker = useCallback(async () => {
        if (!navigator.geolocation) return;
        setIsActiveCurrentLocation(true);

        if (currentLocationMarker.length) {
            currentLocationMarker.map((marker) => marker.setMap(null));

            setCurrentLocationMarker([]);
        }

        // 이전 위치 값 저장
        const previousLocation = currentLocationMarker[0]?.getPosition();

        navigator.geolocation.getCurrentPosition(async function (position) {
            const lat = position.coords.latitude; // 현재 위치의 위도
            const lng = position.coords.longitude; // 현재 위치의 경도

            // 이전 위치 값이 있으면 재사용
            const currentLocation =
                previousLocation || new kakao.maps.LatLng(lat, lng);

            const imageSrc = "./img/point.png"; // 마커이미지의 주소
            const imageSize = new window.kakao.maps.Size(40, 40); // 마커이미지의 크기
            const markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize
                // imageOption
            );

            const markerCurrentLocation = new kakao.maps.Marker({
                position: currentLocation,
                image: markerImage,
                title: "Current Location",
            });

            setCurrentLocationMarker([markerCurrentLocation]);

            // setCurrentLocationMarker((prev) => [
            //     ...prev,
            //     markerCurrentLocation,
            // ]);

            map.panTo(currentLocation);
        });
    });

    return (
        <button
            className="w-8 h-8 z-30 absolute right-1  bottom-1/3 bg-white
          shadow-lg  rounded-md
        "
            onClick={showCurrentLocationMarker}
        >
            <BiCurrentLocation
                className={`text-xl m-auto ${
                    isActiveCurrentLocation
                        ? "text-emerald-500"
                        : "text-gray-600"
                }`}
            />
        </button>
    );
}

