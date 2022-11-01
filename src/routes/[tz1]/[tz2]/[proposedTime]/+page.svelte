<script lang="ts">
	import Intel from "../../../Intel.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  const { tz1, tz2, time } = data;
</script>

<Intel {tz1} {tz2} {time} />