<script lang="ts">
  import MainTable from "./main-table.svelte";
  import { fetchRecordFast } from "./utils/chunithm-net-fetch";
  import { getChunirecData, getIntlData } from "./utils/music-data";
  import {
    calculateBest30,
    calculateMaxAchievable,
    calculateRating,
    calculateRatingNew,
  } from "./utils/rating";

  let isLoading: boolean | null = null;

  let songData = [] as SongData[];
  let userRating = { best30Avg: 0, maxAchievable: 0 } as PersonalRating;

  async function setFetchMode(intlConst: boolean) {
    isLoading = true;
    const data = await fetchRecordFast();

    let songConstList = [] as any[];
    if (intlConst) {
      songConstList = await getIntlData();
    } else {
      songConstList = await getChunirecData();
    }

    songData = data
      .map((song) => {
        const songConst = songConstList.find(
          (c) => c.meta.title === song.title
        );
        const cons = songConst?.data[song.difficulty]?.const ?? 0;
        return {
          ...song,
          const: cons,
          rating: (intlConst ? calculateRating : calculateRatingNew)(
            song.score,
            cons
          ),
        };
      })
      .sort((s1, s2) => s2.rating - s1.rating);

    const ratingList = songData.map((s) => s.rating);
    userRating = {
      best30Avg: calculateBest30(ratingList),
      maxAchievable: calculateMaxAchievable(ratingList),
    };

    isLoading = false;
  }
</script>

<div class="bg-white min-w-max">
  {#if isLoading == null}
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <div>
            <div class="mt-3 text-center sm:mt-5">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Select Version
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500 mb-2">
                  Select the Chunithm version you want to use for rating
                  calculation.
                </p>
                <p class="text-xs text-gray-500">
                  This is a fork of <a
                    class="text-blue-600"
                    target="_blank"
                    href="https://github.com/kyroslee/chuni_intl_viewer"
                  >
                    kyroslee/chuni_intl_viewer
                  </a>. If you prefer the user interface of original version,
                  please revert to the old script.
                </p>
              </div>
            </div>
          </div>
          <div
            class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
          >
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
              on:click={() => setFetchMode(true)}>International</button
            >
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              on:click={() => setFetchMode(false)}>Chunithm New</button
            >
          </div>
        </div>
      </div>
    </div>
  {:else if isLoading}
    <div class="w-screen h-screen">Loading...</div>
  {:else}
    <div class="p-4">
      <MainTable {songData} {userRating} />
    </div>
  {/if}
</div>

<style windi:preflights:global windi:safelist:global>
</style>
