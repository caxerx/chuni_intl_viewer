import BigNumber from "bignumber.js";
import Svelte from "./main.svelte";
import { calculateRating, calculateRatingNew } from "./utils/rating";

import { getCookie } from "./utils/utils";

window.BigNumber = BigNumber;
window.calculateRating = calculateRating;
window.calculateRatingNew = calculateRatingNew;

const main = async () => {
  if (window.location.hostname !== "chunithm-net-eng.com") {
    alert(
      "[chuni_intl_viewer] This tools could only be used under chunithm-net international."
    );
    window.location.href = "https://chunithm-net-eng.com/";
    return;
  }

  if (!getCookie("_t")) {
    alert("[chuni-intl-viewer] Token not found. Please login first.");
    window.location.href = "https://chunithm-net-eng.com/";
    return;
  }

  // const mainBody = document.createElement("div");
  const mainBody = document.body;
  const shadow = mainBody.attachShadow({ mode: "open" });
  // document.body?.prepend(mainBody);

  new Svelte({
    target: shadow,
  });
};

main();
