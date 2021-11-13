<script lang="ts">
  import BigNumber from "bignumber.js";
  import OverviewTable from "./overview-table.svelte";

  export let songData: SongData[];
  export let userRating: PersonalRating;

  const title = ["#", "Song Name", "Difficulty", "Constant", "Score", "Rating"];
  // const titleSlowFetch = ["Last Play", "Play Count"];

  $: {
    if (songData.length === 0) {
      for (let i = 0; i < 600; i++) {
        songData.push({
          title: "DUMMY SONG",
          score: new BigNumber(1010000),
          difficulty: "ULT",
          const: new BigNumber(16.0),
          rating: new BigNumber(18.15),
        });
      }
    }
  }
</script>

<OverviewTable {userRating} />
<table
  class="max-w-max divide-y divide-gray-200 dark:divide-gray-700"
>
  <thead class="bg-gray-200 dark:bg-gray-800">
    <tr>
      {#each title as head}
        <th
          scope="col"
          class="px-6 py-3 text-center text-xs font-medium text-gray-600 dark:text-gray-300"
        >
          {head}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody class="bg-gray-50 dark:bg-gray-700 divide-y divide-gray-200">
    {#each songData as song, i}
      <tr>
        <td class="px-2 py-1 text-sm text-gray-900 dark:text-gray-50"
          >{i + 1}</td
        >
        <td class="px-2 py-1 text-sm text-gray-900 dark:text-gray-50">
          {song.title}
        </td>
        <td class="px-2 py-1 text-sm text-gray-900 dark:text-gray-50">
          {song.difficulty}
        </td>
        <td class="px-2 py-1 text-sm text-gray-900 dark:text-gray-50">
          {song.const.toFixed(1)}
        </td>
        <td class="px-2 py-1 text-sm text-gray-900 dark:text-gray-50">
          {song.score}
        </td>
        <td class="px-2 py-1 text-sm text-gray-900 dark:text-gray-50">
          {song.rating.toFixed(2)}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
