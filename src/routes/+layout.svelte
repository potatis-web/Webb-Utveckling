<script>
	import favicon from '$lib/assets/favicon.svg';
	import { base } from '$app/paths';
	let { children } = $props();
</script>
<nav>
	<a href="{base}/">Home</a>
	<a href="{base}/photoapp">Photo App</a>
	<a href="{base}/register">Register</a>
</nav>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<style>

	:global(body), :global(html){
	margin: 0%;
	padding: 0%;
	height: 100vh;
	width: 100vw;
	}    

</style>
{@render children?.()}
