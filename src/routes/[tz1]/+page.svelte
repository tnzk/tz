<script lang="ts">
	import { DateTime } from "luxon";
	import Intel from "../Intel.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  const { tz1 } = data;
  const dt = DateTime.local();
</script>

<Intel {tz1} />

<div class="hero bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold mb-6">Another Timezone is...</h1>
      <a href="/{tz1}/{dt.offsetNameShort}" class="btn btn-primary">
        {dt.zoneName}, aka {dt.offsetNameShort}
      </a>
      <p class="py-6">
        Or, you can use your timezones:
        {#each ['CET', 'EST', 'PST', 'JST', 'GMT'] as tz}
          <a href="/{tz1}/{tz}" class="link">
            {tz}
          </a>,
        {/each}
      </p>
    </div>
  </div>
</div>
