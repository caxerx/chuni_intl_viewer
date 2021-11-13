<script lang="ts">
  export let title: string;
  export let content: string;
</script>

<div class="py-1 flex justify-between text-sm font-medium">
  <dt class="text-gray-600 dark:text-gray-300">{title}</dt>
  <dd class="text-gray-900 dark:text-gray-50">{content}</dd>
</div>
