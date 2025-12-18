<script>
	import { derived } from "svelte/store";

    let list = [
        {
            color: "red"
        },
        {
            color: "blue"
        },
        {
            color: "green"
        },
        {
            color: "yellow"
        },
        {
            color: "purple"
        },
        {
            color: "orange"
        }
    ];

    let evenOnly= $state(false)
    $effect (()=> {
        evenOnly;
        let element = document.getElementById("main")
        element.classList.toggle("even")
        
    })
</script>
<div>
    <label for="i">Visa endast jämna</label>
    <input bind:checked={evenOnly} id="i"type="checkbox">
    
</div>

<main id="main">
    {#each list as grid, i}
        <div style="background-color: {grid.color}">{i+1}</div>
    {/each}
</main>
<div class="even"><div></div></div>
<style>
    main {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 15px;
        background-color: lightgray;
        width: 70vw;
        margin: 0 auto;
        padding: 30px;
        height: 300px;
    }

    main div{
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: scale 0.5s;
        padding: 20px;
        font-size: 35px;
    }

    main div:hover {
        scale: 1.05;
    }

    .even div:nth-child(odd) {
        display: none;
    }
</style>