import type BigNumber from "bignumber.js";

type ChunirecDifficulty = "BAS" | "ADV" | "EXP" | "MAS" | "ULT";

interface SongData {
  title: string;
  score: BigNumber;
  difficulty: ChunirecDifficulty;
  const: BigNumber;
  rating: BigNumber;
}

interface PersonalRating {
  best30Avg: BigNumber;
  maxAchievable: BigNumber;
}

interface ChunirecMeta {
  title: string;
}

interface ChunirecDataRecord {
  const: number;
}

type ChunirecData = Record<ChunirecDifficulty, ChunirecDataRecord>;

interface ChunirecRecord {
  meta: ChunirecMeta;
  data: ChunirecData;
}
