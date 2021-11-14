<script lang="ts">
  import OverviewTable from "./overview-table.svelte";
  import type { PersonalRating, SongData } from "./types/types";

  export let songData: SongData[];
  export let userRating: PersonalRating;

  const title = ["#", "Song Name", "Difficulty", "Constant", "Score", "Rating"];

  let filterBest30 = false;
  $: filteredSongData = filterBest30 ? songData.slice(0, 30) : songData;

  // const titleSlowFetch = ["Last Play", "Play Count"];

  // $: {
  //   if (songData.length === 0) {
  //     for (let i = 0; i < 600; i++) {
  //       songData.push({
  //         title: "DUMMY SONG",
  //         score: new BigNumber(1010000),
  //         difficulty: "ULT",
  //         const: new BigNumber(16.0),
  //         rating: new BigNumber(18.15),
  //       });
  //     }
  //   }
  // }
</script>

<div class="flex flex-row space-x-4">
  <OverviewTable {userRating} />
  <div>
    <button
      type="button"
      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-900 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm shadow-sm dark:shadow-dark-sm"
      on:click={() => {
        filterBest30 = !filterBest30;
      }}
    >
      {filterBest30 ? "Show All" : "Best 30"}
    </button>
  </div>
</div>
<table class="max-w-max divide-y divide-gray-200 dark:divide-gray-700">
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
    {#each filteredSongData as song, i}
      <tr>
        <td class="px-2 py-1 text-sm text-gray-900 dark:text-gray-50"
          >{i + 1}</td
        >
        <td class="px-2 py-1 text-sm text-gray-900 dark:text-gray-50 max-w-xs">
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
