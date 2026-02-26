
<script>
    import { search_store } from '$lib/search'
    import { onMount } from 'svelte';
    /** @type {import('./$types').PageData} */
    export let data;

    let showShiny = false;
    let isLoaded = false;
    let latestEntries = [];
    const MAX_RECENT = 5;

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    onMount(() => {
        latestEntries = JSON.parse($search_store)
    });
    function formatName(string) {
        if (!string.includes("-")) {
            return capitalize(string)
        }
        const [first, ...rest] = string.split("-");
        const restJoined = rest.join(" ").replace(/-/g, " ");
        const restCapitalized = restJoined
            .split(" ")
            .map(capitalize)
            .join(" ");
        return `${capitalize(first)} (${restCapitalized})`;
    }
    function updateLatestEntries(pokemonResponse, showEntries = true) {
        // Current entry
        const entry = {name: pokemonResponse.name, sprite: pokemonResponse.sprites.front_default}

        // Check if latestEntries has entry name, filters out if they match
        latestEntries = latestEntries.filter(e => e.name !== entry.name)

        // Removes first if too long
        if (latestEntries.length >= MAX_RECENT) {
            latestEntries.shift()
        }
        // Updates latestEntries and search store
        latestEntries.push(entry);
        $search_store = JSON.stringify(latestEntries);

        // Loads entries
        isLoaded = showEntries ? true : false
    }
    async function main() {
        const pokemon = await data;
        updateLatestEntries(pokemon.response)

    }
</script>

{#await data}
    <p>.. waiting</p>
{:then pokemon} 
<article class="sprite-wrapper">
    {#each Object.entries(pokemon.response.sprites) as sprite}
        {#if typeof sprite[1] === "string"}
            <img
                class="sprite"
                src={sprite[1]}
                alt="{capitalize(pokemon.response.name)} sprite ({sprite[0]})"
                class:hidden={sprite[0].includes('shiny') ? !showShiny : showShiny}
            />
        {/if}
    {/each}
    <div style="order: -1;">
        <label for="shiny-checkbox">Shiny?</label>
        <input id="shiny-checkbox" type="checkbox" bind:checked={showShiny}/>
    </div>
</article>
<h1><u>{formatName(pokemon.response.name)}</u> <i>#{pokemon.response.id}</i></h1>
<section  style="display:none;">
    <h2>Moves</h2>
    <div class="moves-container">
        
        {#each pokemon.response.moves as move}
            <p>{capitalize(move.move.name)}</p>
        {/each}
    </div>
</section>


{#if isLoaded}
    <h2>Latest searches:</h2>
    <footer>
        {#each latestEntries as entry}
            <div class="entry-container">
                <h2><u>{formatName(entry.name)}</u></h2>
                <img src={entry.sprite} alt={entry.name}/>
            </div>
        {/each}
    </footer>
{:else}
<button id="load" onclick={() => updateLatestEntries(pokemon.response)}>Load Latest...</button>
{/if}




{/await}  




<style>
    :global(body) {
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif    }
    footer {
        display: flex;
        flex-direction: row-reverse;
    }
    i {
        font-size: large;
        color: gray;
    }
    article {
        display: flex;
        width: 90%;
        height: 30%;
        gap: 1em;
        justify-content: center;
        align-items: center;
    }
    .sprite {
        height: 100%;
        min-height: 150px;
        max-width: 100%;
        transition: all 1s;
    }
    .moves-container {
        max-height: 200px;
        overflow-y: scroll;
        margin: 10px 0;
    }
    .sprite-wrapper {
        display: flex;
        flex-direction: row-reverse;
        position: relative;
    }
    .entry-container {
        display: flex;
        padding: 10px 0px 10px 10px;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.2);
        margin: 5px;
    }
    .hidden {
        opacity: 0;
        display: none;
    }
</style>