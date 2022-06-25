<script lang="ts">
    export let minhits: number;
    export let windowsize: number;

    const L = 1 << windowsize;
    let l = L - 1

    const update = (hit: boolean) => {
      if (hit) {
        l = ((l << 1) | 1) & (L - 1);
      } else {
        l = ((l << 1) | 0) & (L - 1);
      }
    }
  </script>
  
  <button on:click={increment}>
    Clicks: {count}
  </button>
  
  <style>
    button {
      font-family: inherit;
      font-size: inherit;
      padding: 1em 2em;
      color: #ff3e00;
      background-color: rgba(255, 62, 0, 0.1);
      border-radius: 2em;
      border: 2px solid rgba(255, 62, 0, 0);
      outline: none;
      width: 200px;
      font-variant-numeric: tabular-nums;
      cursor: pointer;
    }
  
    button:focus {
      border: 2px solid #ff3e00;
    }
  
    button:active {
      background-color: rgba(255, 62, 0, 0.2);
    }
  </style>
  