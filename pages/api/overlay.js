
import { CacheProvider } from '@emotion/react'
import { renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'

import InfoOverlay from '../../src/components/map/InfoOverlay'

export default async function overlay(req, res) {
    try {
        const key = 'custom'
        const cache = createCache({ key });
        const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

        const parkingLotData = req.body;

        const html = renderToString(<InfoOverlay info={parkingLotData} />);

        const chunks = extractCriticalToChunks(html);
        const styles = constructStyleTagsFromChunks(chunks);

        // res
        //     .status(200).json({ html: `<!DOCTYPE html>
        //     <html lang="en">
        //     <head>
        //         <meta charset="UTF-8">
        //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //         <meta http-equiv="X-UA-Compatible" content="ie=edge">
        //         <title>My site</title>
        //         ${styles}
        //     </head>
        //     <body>
        //         <div id="root">${html}</div>

        //         <script src="./bundle.js"></script>
        //     </body>
        //     </html>` });

        res
        .status(200).json({ html: html });


    } catch(e) {
        return res.status(500).send({ message: 'failed to render overlay' });
    }
}