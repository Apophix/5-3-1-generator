<script>
import { getContext } from "svelte";

	import DayConfig from "./DayConfig.svelte";

	export let workoutConfig;

	let globalConfig = getContext("globalConfig"); 

	function addDay() {
		workoutConfig.days = [...(workoutConfig.days || []), {}];
	}

	function removeDay(index) {
		workoutConfig.days.splice(index, 1); 
		workoutConfig.days = workoutConfig.days; 
	}

	function print() {
		window.print(); 
	}



	function importConfig()	{
		let input = document.createElement('input');
		input.setAttribute("style", "display: none"); 
		input.setAttribute("accept", "application/json")
		input.type = 'file';

		input.onchange = e => { 
			console.log(e); 
   			// @ts-ignore
   			let file = e.target.files[0]; 
			
			let reader = new FileReader(); 
			reader.readAsText(file, 'UTF-8');

			reader.onload = readerEvent => {
				let content = readerEvent.target.result.toString(); 
				workoutConfig = JSON.parse(content); 
			}
		}

		input.click();
	}

	function exportConfig() {
		let textData = JSON.stringify(workoutConfig); 
		let blobData = new Blob([textData], {type: "text/json"});
		let url = window.URL.createObjectURL(blobData);
		//let url = "pathExample/localFile.png"; // LocalFileDownload

		let a = document.createElement("a");
		a.setAttribute("style", "display: none");
		document.body.appendChild(a);
		a.href = url;
		a.download = `5-3-1-config-${Date.now()}.json`;
		a.click();
		window.URL.revokeObjectURL(url);
		a.remove();
	}


</script>

<div class="sidebar">
	<h1>5/3/1 Workout Generator</h1>

	<div class="section">
		<h2>Training Max Numbers</h2>
		
		<div class="config-items">
			{#each [...globalConfig.exercises] as [id, exercise]} 
			<div class="training-max-input">
				<div class="training-max-label">{exercise.name}</div>
				<input type="number" bind:value={workoutConfig.trainingMax[id]} />
			</div>
			{/each} 
		</div>
	</div>

	<div class="section">
		<h2>Lift Days</h2>

		<div class="config-items">
			{#each workoutConfig.days as day, index}
				<DayConfig 
					dayNumber={index + 1} 
					on:requestRemoveSelf="{ (event) => removeDay(index) }" 
					bind:dayConfig={workoutConfig.days[index]}
				/>
			{/each}
		</div>

		<button on:click={addDay}>Add Day</button>
	</div>

	<div class="section">
		<h2>Actions</h2>

		<div class="config-items">
			<button on:click={print}>Print</button>
			<button class="secondary" on:click={importConfig}>Import Config</button>
			<button class="secondary" on:click={exportConfig}>Export Config</button>
		</div>

	</div>
</div>

<style lang="scss">
	@use "../style/main.scss" as *;

	
	.sidebar {
		color: $THEME-COLOR-LIGHT;
		width: 360px;
		background: $THEME-COLOR-DARKEST;
		
		@include box-shadow();
		
		overflow: auto; 

		@media print {
			display: none;
		}
	}

	.training-max-input { 
		display: flex; 
		flex-direction: row;
		height: 28px;

		* {
			flex: 1 100%;
		}

		input 
		{
			border: none;
		}

		.training-max-label 
		{
			font-size: 1.2rem;
			display: grid;
			justify-content: left;
			align-items: center;
		}
	}

	

	h1 {
		text-align: center;
		padding: 20px;
		background: $THEME-COLOR-DARK;
		border-bottom: 1px solid $THEME-COLOR-ACCENT;

		@include box-shadow();
		@include text-shadow();
	}

	h2 {
		margin-bottom: 12px;
	}

	.section {
		// background: rgba(0, 0, 0, 0.25);
		// width: 100%;
		margin: 6px;
		padding: 8px {
			bottom: 12px;
		}

		border-bottom: 1px solid $THEME-COLOR-BRIGHT; 
	}

	.config-items {
		display: grid;
		gap: 8px;
	}

	button {
		margin-top: 10px;
		width: 100%;
	}
</style>
