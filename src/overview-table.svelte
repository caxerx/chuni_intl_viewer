<script lang="ts">
  import DarkModeButton from "./dark-mode-button.svelte";
  import OverviewTableItem from "./overview-table-item.svelte";

  let date = new Date().toLocaleDateString();
  export let userRating: PersonalRating;
</script>

<div
  class="bg-gray-50 dark:bg-gray-900 sm:rounded-md w-full max-w-sm px-4 my-2 mb-4 shadow dark:shadow-dark"
>
  <h3 class="font-medium text-gray-900 dark:text-gray-50">Chuni Intl Viewer</h3>
  <dl
    class="mt-2 border-t border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700"
  >
    <OverviewTableItem title={"Generated at"} content={date} />
    <OverviewTableItem
      title={"Best 30 Average"}
      content={userRating.best30Avg.toFixed(2)}
    />
    <OverviewTableItem
      title={"Maximum Achievable Rating"}
      content={userRating.maxAchievable.toFixed(2)}
    />
  </dl>
</div>
