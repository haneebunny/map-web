// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const PARKING_LIST_URL = `http://211.252.37.224/rest/parking`;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let { data } = await axios.get(
        `${PARKING_LIST_URL}/?keyword=광주&parkingFee=무료&page=1&pageSize=30`
      );

      console.log("dd", data);
      return res.status(200).send(data.parkingInfoList);
    } catch (e) {
      console.log(e.message);
      return res.status(500).send(e.message);
    }
  }

  return res.status(405).end();
}
