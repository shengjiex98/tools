<script lang="ts">
  import logo from './assets/svelte.png';
  import Controller from './lib/Controller.svelte';

  const controllers: Controller[] = [];
  const constraints: [number, number][] = [
    [1, 3],
    [1, 4],
    [1, 3],
    [1, 4],
    [5, 6]
  ];
  const cores: number = 2;

  const hits: boolean[] = new Array(3).fill(false);
  let counter = 0;

  function step(controllerID: number) {
    console.assert(controllerID < controllers.length);
    if (hits[controllerID]) {
      return;
    }

    hits[controllerID] = true;
    counter++;
    if (counter === cores) {
      for (const [i, c] of controllers.entries()) {
        c.update(hits[i]);
      }
      counter = 0;
      hits.fill(false);
    }
  }

  function reset() {
    for (const c of controllers) {
      c.reset();
    }
    counter = 0;
    hits.fill(false);
  }
</script>

<main>
  <h1>Deadline Simulator by Jerry</h1>

  <div class=container>
    {#each constraints as c, index}
      <Controller bind:this={controllers[index]} minhits={c[0]} windowsize={c[1]} />
    {/each}
  </div>

  <p>
    There are {cores - counter} controllers to hit for this time slot. 
  </p>
  {#each controllers as c, index}
    <button on:click={() => step(index)}>Hit {index+1}</button>
  {/each}
  <button on:click={reset}>Reset</button>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  .container {
    display: flex;
    padding: auto;
    flex-direction: column;
    align-items: center;
    row-gap: 0.25em;
    margin-bottom: 1em;
  }

  h1 {
    color: #ff3e00;
    /* text-transform: capitalize; */
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

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

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
