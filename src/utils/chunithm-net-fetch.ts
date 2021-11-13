import type { ChunirecDifficulty } from "src/types/types";
import { getCookie, parseFormattedNumber } from "./utils";

const Difficulty = {
  master: "MAS",
  expert: "EXP",
  advanced: "ADV",
  basic: "BAS",
  ultima: "ULT",
} as Record<string, ChunirecDifficulty>;

export async function getSongList(
  difficulty: typeof Difficulty[keyof typeof Difficulty] = Difficulty.master
) {
  const fd = new FormData();
  fd.append("genre", "99");
  fd.append("token", getCookie("_t"));
  const api = {
    // [Difficulty.ultima]: "sendUltima",
    [Difficulty.master]: "sendMaster",
    [Difficulty.expert]: "sendExpert",
    [Difficulty.advanced]: "sendAdvanced",
    [Difficulty.basic]: "sendBasic",
  };

  const res = await fetch(
    `https://chunithm-net-eng.com/mobile/record/musicGenre/${api[difficulty]}`,
    {
      headers: {
        "Cache-Control": "no-cache",
      },
      method: "POST",
      body: fd,
    }
  );

  const htmlStr = await res.text();
  const el = document.createElement("div");
  el.innerHTML = htmlStr;
  const frag = document.createDocumentFragment();
  frag.appendChild(el);
  const formList = [...frag.querySelectorAll("form")];
  formList.shift();
  return formList;
}

export async function fetchRecordFast() {
  const difficulties = Object.values(Difficulty);

  const rawSongList = await Promise.all(
    difficulties.map((d) => getSongList(d))
  );

  return rawSongList.flatMap((d, diffIndex) =>
    d
      .map((s) => {
        const data = {
          title: (s.querySelector(".music_title") as HTMLDivElement)?.innerText,
          score: parseFormattedNumber(
            (s.querySelector(".text_b") as HTMLSpanElement)?.innerText
          ),
          difficulty: difficulties[diffIndex],
        };
        return data;
      })
      .filter((s) => s.title != null && s.score.isGreaterThanOrEqualTo(0))
  );
}
