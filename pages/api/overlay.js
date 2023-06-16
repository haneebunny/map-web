import { renderToString } from "react-dom/server";

import InfoOverlay from "../../src/components/map/InfoOverlay";

export default async function overlay(req, res) {
    try {
        const parkingLotData = req.body;

        const html = renderToString(<InfoOverlay info={parkingLotData} />);

        res.status(200).json({ html: html });
    } catch (e) {
        return res.status(500).send({ message: "failed to render overlay" });
    }
}

