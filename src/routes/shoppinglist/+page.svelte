<script>
	import { fade } from 'svelte/transition'


	let varor = $state([
		{
			name: 'Ketchup',
			purchased: false
		}
	]);

	let newItem = $state('');

	function addItem() {

		if (newItem.trim().length === 0) {
			return;
		}
		varor.push({
			name: newItem,
			purchased: false
		});
		newItem = '';
	}

	$inspect(varor);
</script>

<main class="container">
	<h1>Shoppinglist</h1>
	<div class="categories-container">
		<h2>Varor att köpa ➡</h2>
		<h2>⬅ Köpta varor</h2>
		<section>
			<div class="list-wrapper">
				{#each varor as vara, i}
					{#if !vara.purchased && vara.name.length > 0}
						<li class="item-wrapper" transition:fade>
							<p>{i + 1}. {vara.name}</p>
							<div>
								<button on:click={() => (vara.purchased = vara.purchased ? false : true)}>➡</button>
								<button on:click={() => (vara.name = '')}>✖</button>
							</div>
						</li>
					{/if}
				{/each}
			</div>
		</section>

		<section>
			<div class="list-wrapper">
				{#each varor as vara}
					{#if vara.purchased && vara.name.length > 0}
						<li class="item-wrapper" transition:fade>
							<p>• {vara.name}</p>
							<div>
								<button on:click={() => (vara.purchased = vara.purchased ? false : true)}>⬅</button>
								<button on:click={() => (vara.name = '')}>✖</button>
							</div>
						</li>
					{/if}
				{/each}
			</div>
		</section>
		<form on:submit|preventDefault={addItem}>
			<input type="text" bind:value={newItem}/>
			<input type="submit" value="<"/>
			
		</form>
	</div>
	<img style="position: fixed; bottom: 10px; right: 10px; width: 100px; opacity: 0.2;" src="https://svgshare.com/i/uQ1.svg" alt="Shopping cart icon"/>

</main>

<style>
	section:first-of-type {
		border-right: solid 2px rgba(0, 0, 0, 0.2);
	}

	.container {
		background-color: lightgrey;
		width: 60vw;
		height: 70vh;
		border-radius: 20px;
		margin: auto;
		overflow: scroll;
	}

	.container > h1 {
		position: relative;

		left: 10px;
		width: calc(100% - 40px);
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.1);
		text-align: center;
		padding: 10px;
	}

	.categories-container {
		display: grid;
		grid-template-rows: 1fr 9fr 1fr;
		grid-template-columns: repeat(2, 1fr);
		background-color: rgba(0, 0, 0, 0.1);
		margin: 10px;
		border-radius: 10px;
	}

	.categories-container > section {
		height: 100%;
	}

	h2,
	.list-wrapper {
		margin: 10px auto;
		transition: width 0.5s;
		width: 70%;
		list-style-type: none;
	}

	h2 {
		text-align: center;
		padding: 10px;
		border-bottom: 2px solid rgba(0, 0, 0, 0.2);
		
	}

	li {
		list-style-position: inside;
		transition: background-color 0.2s;
		border-radius: 5px;
		padding: 5px 10px;
		border-bottom: 2px solid rgba(0, 0, 0, 0.2);
		margin: 5px 0;
	}

	li:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

    li:hover button {
        border-color: rgba(128, 128, 128, 1);
    }
	.item-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	form {
		position: sticky;
		bottom: 10px;
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;

	}
	input {

		background-color: rgba(0, 0, 0, 0.1);
		border: none;
		margin: 0 10px;
		border-radius: 5px;
		font-size: 100%;
		padding: 5px;
		height: 30px;

	}

	button {
		background-color: rgba(0, 0, 0, 0);
		border: solid 1px rgba(0, 0, 0, 0);
		border-radius: 5px;
		margin: 5px;
		padding: 6px 8px;

		transition: background-color 0.2s border 0.2s;
	}
	button:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	button:active {
		background-color: rgba(0, 0, 0, 0.3);
	}
</style>
