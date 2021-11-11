export function getCookie(key: string) {
  const cookieEntry = document.cookie
    .split(";")
    .map((e) => decodeURIComponent(e.trim()))
    .map((e) => e.split("="))
    .find((e) => e[0] === key);
  return cookieEntry ? cookieEntry[1] : "";
}

export function strToNum(str: string | null | undefined) {
  if (!str) return -1;
  return Number([...str].filter((e) => e !== ",").join(""));
}
