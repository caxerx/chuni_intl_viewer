import BigNumber from "bignumber.js";

export function getCookie(key: string) {
  const cookieEntry = document.cookie
    .split(";")
    .map((e) => decodeURIComponent(e.trim()))
    .map((e) => e.split("="))
    .find((e) => e[0] === key);
  return cookieEntry ? cookieEntry[1] : "";
}

export function parseFormattedNumber(str?: string) {
  if (!str) return new BigNumber(-1);
  return new BigNumber(+[...str].filter((e) => e !== ",").join(""));
}
