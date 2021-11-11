export async function getIntlData() {
  const data = await import("../../chunirec.json");
  return data;
}

export async function getChunirecData() {
  const data = await fetch(
    "https://api.chunirec.net/2.0/music/showall.json?region=jp2&token=252db1d77e53f52fd85c5b346fef7c90e345b3b3f0b12018a2074298e4b35182"
  ).then((d) => d.json());
  return data;
}
