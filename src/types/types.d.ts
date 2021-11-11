interface SongData {
  title: string;
  score: number;
  difficulty: "MAS" | "EXP" | "ADV" | "BAS";
  const: number;
  rating: number;
}

interface PersonalRating {
  best30Avg: number;
  maxAchievable: number;
}
