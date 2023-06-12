import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";

// This is a solution to this problem: https://github.com/emotion-js/emotion/issues/2691
// Did some basic testing and doesn't seem to degrade performance, some optimizations are most likely possible
// Maybe turn it into a hook that returns a render function and have tempEl and root only be initialized once?

const elementToString = (element) => {
  const tempEl = document.createElement("div");
  const root = createRoot(tempEl);

  flushSync(() => {
    root.render(element);
  });

  return tempEl.innerHTML;
};

export default elementToString;
