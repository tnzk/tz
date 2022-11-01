<script lang="ts">
  import { DateTime } from 'luxon';

  export let tz1:string;
  export let tz2:string|undefined = undefined;
  export let time:string|undefined = undefined;

  const TIMEZONES = ['CET', 'EST', 'PST', 'JST', 'GMT']; // TODO
  const set = (dt:DateTime) => dt.toISO();
  const isDay = (dt:DateTime) => dt.hour >= 8 && dt.hour <=19

  $: console.debug(time)
  $: value = time ? DateTime.fromSeconds(parseInt(time)).toISO() : set(DateTime.local());
  $: date = DateTime.fromISO(value);

  $: dateTz1 = date.setZone(tz1);
  $: dateTz2 = date.setZone(tz2);
  $: dateUtc = date.toUTC();

  const reset = () => {
    value = set(DateTime.local());
  };

  $: path = '/' + [tz1, tz2, time ? encodeURIComponent(time) : undefined].join('/');

  $: slots = Array(24).fill(0).map((_, i) => ({
    tz1: dateTz1.plus({ hours: i - 12 }),
    tz2: dateTz2.plus({ hours: i - 12 }),
    utc: dateUtc.plus({ hours: i - 12 }),
  }))

  const FORMAT = 'yyyy-MM-dd hh:mm';
</script>


<div class="hero bg-base-200">
  <div class="hero-content text-center">
    <div class="">
      <div class="my-3 text-sm border border-gray-700 text-left px-5 py-2 rounded-xl bg-gray-300 text-gray-700  ">
        <a class="font-mono" href={path}>https://host{path}</a>
      </div>
      <div class="stats bg-primary text-primary-content">
        <div class="stat">
          <div class="stat-title">Timezone A</div>
          <div class="stat-value">{tz1}</div>
          <div class="stat-actions">
            <button class="btn btn-sm btn-success">{dateTz1.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</button>
          </div>
          <div class="my-2">
            {#if isDay(dateTz1)}
              <div class="badge badge-warning gap-2">
                Day
              </div>
            {:else}
              <div class="badge badge-neutral gap-2">
                Night
              </div>
            {/if}
          </div>
        </div>
        {#if tz2}
          <div class="stat">
            <div class="stat-title">Timezone B</div>
            <div class="stat-value">{tz2}</div>
            <div class="stat-actions">
              <button class="btn btn-sm btn-success">{dateTz2.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</button>
            </div>
            <div class="my-2">
              {#if isDay(dateTz2)}
                <div class="badge badge-warning gap-2">
                  Day
                </div>
              {:else}
                <div class="badge badge-neutral gap-2">
                  Night
                </div>
              {/if}
            </div>
          </div>
        {:else}
          <div class="stat bg-gray-500">
            <div class="stat-title">Choose Another Timezone</div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

{#if tz1 && tz2}
  <div class="text-center my-3">
    <button class="btn btn-primary" on:click={reset}>Now</button>
  </div>
{/if}

{#if tz1 && tz2}
  <div class="max-w-xl mx-auto">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>{tz1}</th>
          <th>-</th>
          <th>{tz2}</th>
        </tr>
      </thead>
      <tbody>
        {#each slots as slot, i}
          <tr>
            <td>
              <div class="badge {isDay(slot.tz1) ? 'badge-warning' : 'badge-nautral'} gap-2 mr-1"></div>
              {slot.tz1.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
            </td>
            <td>
              {#if i === 12}
                Selected
              {:else}
                <a href="/{tz1}/{tz2}/{encodeURIComponent(Math.round(slot.utc.toSeconds()))}" class="link-secondary">
                  Use this
                </a>
              {/if}
            </td>
            <td>
              <div class="badge {isDay(slot.tz2) ? 'badge-warning' : 'badge-nautral'} gap-2 mr-1"></div>
              {slot.tz2.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}