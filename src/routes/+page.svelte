<script lang="ts">
  import { DateTime, Zone } from 'luxon';

  const dt = DateTime.local();
</script>


<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold mb-6">Your Timezone is...</h1>
      <a href="/{dt.offsetNameShort}" class="btn btn-primary">
        {dt.zoneName}, aka {dt.offsetNameShort}
      </a>
      <p class="py-6">
        Or, you can use your timezones:
        {#each ['CET', 'EST', 'PST', 'JST', 'GMT'] as tz}
          <a href="/{tz}" class="link">
            {tz}
          </a>,
        {/each}
      </p>
    </div>
  </div>
</div>