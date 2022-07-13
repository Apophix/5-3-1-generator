<script>
	export let config; 

	$: days = config.days.length; 

	console.log(days); 
</script>

<div class="paper" style="--days:{days}">
	<slot></slot>
</div>

<style lang="scss">
	@use '../style/main.scss' as *; 

	.paper {
		// height: 90%;
		width: 11in;
		height: 8.5in;
		// width: 90%;
		// height: auto;
		overflow: hidden;
		aspect-ratio: 11 / 8.5;
		background: white; 
		padding: 0.5in;

		display: grid; 

		@include box-shadow();
	}	

</style>
