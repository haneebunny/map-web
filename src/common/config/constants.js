import { useEffect, useState } from "react";

export const MIN_Y = 60;

export const MAX_Y = typeof window !== "undefined" && window.innerHeight - 160;
export const BOTTOM_SHEET_HEIGHT =
  typeof window !== "undefined" && window.innerHeight - MIN_Y;

// export let TEMP;
// if (process.browser) {
//   TEMP = window.innerHeight;
// }
