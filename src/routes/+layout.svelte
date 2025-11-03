<script>
	import favicon from '$lib/assets/favicon.svg';
	import { base } from '$app/paths';
	let { children } = $props();
</script>
<nav>
	<a href="{base}/">Home</a>
	<a href="{base}/about">About</a>
	<a href="/photoapp">Photo App</a>
</nav>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
