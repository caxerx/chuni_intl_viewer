import Svelte from "./main.svelte";

import { getCookie } from "./utils/utils";

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

  const mainBody = document.createElement("div");
  document.body?.prepend(mainBody);

  new Svelte({
    target: mainBody,
  });
};

main();
