<script lang="ts">
  export let songData: SongData[];

  const title = ["#", "Song Name", "Difficulty", "Constant", "Score", "Rating"];
  const titleSlowFetch = ["Last Play", "Play Count"];
</script>

<div>
  Chuni Intl Viewer
  <table>
    <thead>
      <tr>
        {#each title as head}
          <td>{head}</td>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each songData as song}
        <tr>
          <td>_</td>
          <td>{song.title}</td>
          <td>{song.difficulty}</td>
          <td>CONST</td>
          <td>{song.score}</td>
          <td>RAT</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
