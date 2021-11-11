import Svelte from "./main.svelte";

const mainBody = document.createElement("div");
document.querySelector("#wrap")?.prepend(mainBody);

new Svelte({
  target: mainBody,
});
