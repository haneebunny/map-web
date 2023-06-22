import React from "react";
import Map from "../../../src/components/map/Map";
import MySocket from "../../socket";

export default function MapMarkerPage() {
    return (
        <div>
            <MySocket />
            <Map />
        </div>
    );
}

