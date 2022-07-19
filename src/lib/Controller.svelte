<script lang="ts">
  import { countones, digits } from "./utils";

  export let minhits: number;
  export let windowsize: number;

  const L = 1 << windowsize;
  let l = L - 1;

  let valid = true;

  $: binary = digits(l, windowsize);
  $: valid = valid && countones(binary) >= minhits;
  $: urgency = getUrgency(l, windowsize);

  function getUrgency(l: number, windowsize: number) {
    let urgency = -1;
    while (countones(digits(l, windowsize)) >= minhits) {
      l = ((l << 1) | 0) & (L - 1);
      urgency++;
    }
    return urgency;
  }

  export function update(hit: boolean) {
    if (hit) {
      l = ((l << 1) | 1) & (L - 1);
    } else {
      l = ((l << 1) | 0) & (L - 1);
    }
  }

  export function reset() {
    l = L - 1;
    valid = true;
  } 
</script>

<div class=controller style:color={valid ? "black" : "red"}>
  {binary}, u = {urgency}
</div>

<style>
  .controller {
    padding: 1em 2em;
    color: #ff3e00;
    background-color: rgba(255, 62, 0, 0.1);
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
  }
</style>
