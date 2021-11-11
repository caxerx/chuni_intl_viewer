<script lang="ts">
  export let songData: SongData[];
  export let userRating: PersonalRating;

  let date = new Date().toLocaleDateString();

  const title = ["#", "Song Name", "Difficulty", "Constant", "Score", "Rating"];
  const titleSlowFetch = ["Last Play", "Play Count"];
</script>

<div class="bg-white shadow sm:rounded-md w-full max-w-sm px-4 mb-2">
  <h3 class="font-medium text-gray-900">Chuni Intl Viewer</h3>
  <dl class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
    <div class="py-1 flex justify-between text-sm font-medium">
      <dt class="text-gray-500">Generated at</dt>
      <dd class="text-gray-900">{date}</dd>
    </div>

    <div class="py-1 flex justify-between text-sm font-medium">
      <dt class="text-gray-500">Best 30 Average</dt>
      <dd class="text-gray-900">{userRating.best30Avg.toFixed(2)}</dd>
    </div>

    <div class="py-1 flex justify-between text-sm font-medium">
      <dt class="text-gray-500">Maximum Achievable Rating</dt>
      <dd class="text-gray-900">{userRating.maxAchievable.toFixed(2)}</dd>
    </div>
  </dl>
</div>

<table class="min-w-full max-w-sm divide-y divide-gray-200">
  <thead class="bg-gray-50">
    <tr>
      {#each title as head}
        <th
          scope="col"
          class="px-6 py-3 text-center text-xs font-medium text-gray-500"
        >
          {head}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    {#each songData as song, i}
      <tr>
        <td class="px-2 py-2  text-sm text-gray-900">{i + 1}</td>
        <td class="px-2 py-2 text-sm text-gray-900" style="max-width: 20%">
          {song.title}
        </td>
        <td class="px-2 py-2  text-sm text-gray-900">
          {song.difficulty}
        </td>
        <td class="px-2 py-2  text-sm text-gray-900">
          {song.const.toFixed(1)}
        </td>
        <td class="px-2 py-2  text-sm text-gray-900">
          {song.score}
        </td>
        <td class="px-2 py-2  text-sm text-gray-900">
          {song.rating.toFixed(2)}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
