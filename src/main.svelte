<script lang="ts">
  let isFastFetch: boolean | null = null;
  function setFetchMode(fast: boolean) {
    isFastFetch = fast;
  }
</script>

{#if isFastFetch == null}
  <div>
    Fast Fetch?
    <button on:click={() => setFetchMode(true)}>Yes</button>
    <button on:click={() => setFetchMode(false)}>No</button>
    {isFastFetch}
  </div>
{:else}
  <div>Slow</div>
{/if}
