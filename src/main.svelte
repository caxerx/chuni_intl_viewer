<script lang="ts">
  import MainTable from "./main-table.svelte";
  import { fetchRecordFast } from "./utils/chunithm-net-fetch";
  import { getChunirecData, getIntlData } from "./utils/music-data";
  import merge from "lodash/merge";
  import keyBy from "lodash/keyBy";

  let isLoading: boolean | null = null;

  let songData = [] as SongData[];

  async function setFetchMode(fast: boolean) {
    isLoading = true;
    songData = await fetchRecordFast();
    if (fast) {
      const songConst = await getIntlData();
      console.log(
        merge(keyBy(songData, "title"), keyBy(songConst, "meta.title"))
      );
    } else {
      const songConst = await getChunirecData();
      console.log(
        merge(keyBy(songData, "title"), keyBy(songConst, "meta.title"))
      );
    }
    isLoading = false;
  }
</script>

{#if isLoading == null}
  <div>
    Rank
    <button on:click={() => setFetchMode(true)}>Old</button>
    <button on:click={() => setFetchMode(false)}>New</button>
  </div>
{:else if isLoading}
  <div>Loading...</div>
{:else}
  <MainTable {songData} />
{/if}
