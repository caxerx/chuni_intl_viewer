export function calculateRating(score: number, songRating: number) {
  let offset = 0;
  if (score >= 1007500) {
    offset = 2;
  } else if (score >= 1005000) {
    offset = 1.5 + ((score - 1005000) * 10) / 50000;
  } else if (score >= 1000000) {
    offset = 1 + ((score - 1000000) * 5) / 50000;
  } else if (score >= 975000) {
    offset = ((score - 975000) * 2) / 50000;
  } else if (score >= 950000) {
    offset = -1.5 + ((score - 950000) * 3) / 50000;
  } else if (score >= 925000) {
    offset = -3 + ((score - 925000) * 3) / 50000;
  } else {
    offset = -5 + ((score - 900000) * 4) / 50000;
  }

  return +(Math.floor((songRating + offset) * 100) / 100).toFixed(2);
}

export function calculateRatingNew(score: number, songRating: number) {
  let offset = 0;
  if (score >= 1009000) {
    offset = 2.15;
  } else if (score >= 1007500) {
    offset = 2 + ((score - 1007500) * 5) / 50000;
  } else if (score >= 1005000) {
    offset = 1.5 + ((score - 1005000) * 10) / 50000;
  } else if (score >= 1000000) {
    offset = 1 + ((score - 1000000) * 5) / 50000;
  } else if (score >= 975000) {
    offset = ((score - 975000) * 2) / 50000;
  } else if (score >= 950000) {
    offset = -1.5 + ((score - 950000) * 3) / 50000;
  } else if (score >= 925000) {
    offset = -3 + ((score - 925000) * 3) / 50000;
  } else {
    offset = -5 + ((score - 900000) * 4) / 50000;
  }

  return Math.floor((songRating + offset) * 100) / 100;
}

export function calculateBest30(ratingList: number[]) {
  return (
    ratingList
      .sort((a, b) => b - a)
      .slice(0, 30)
      .reduce((acc, val) => acc + val, 0) / 30
  );
}

export function calculateMaxAchievable(ratingList: number[]) {
  let maxRating = ratingList.reduce((acc, val) => (val > acc ? val : acc), 0);
  let best30Avg = calculateBest30(ratingList);
  return (best30Avg * 30 + maxRating * 10) / 40;
}
