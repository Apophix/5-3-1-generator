<script>
	export let dayNumber = 1;
	export let dayConfig;

	import { createEventDispatcher, getContext } from "svelte";

	let globalConfig = getContext("globalConfig");

	const dispatch = createEventDispatcher();

	function removeSelf() {
		dispatch("requestRemoveSelf", dayNumber);
	}

	function addExercise() {
		dayConfig.chosenExercises = [...dayConfig.chosenExercises || [], "squat"]; 
	}

	function removeExercise(index) {
		dayConfig.chosenExercises.splice(index, 1); 

		dayConfig.chosenExercises = dayConfig.chosenExercises; 
	}

	console.log(dayConfig); 
</script>

<div class="day-config">
	<h3>Day {dayNumber}</h3>
	<div class="exercise-list">
		{#each dayConfig.chosenExercises ?? [] as chosenExersize, index}
			<div class="exercise">
				<select bind:value={dayConfig.chosenExercises[index]}>
					{#each [...globalConfig.exercises] as [id, exercise]}
						<option 
							value={id}
							selected={id == dayConfig.chosenExercises[index].id || null}
						>
							{exercise.name}
						</option>
					{/each}
				</select>
				<button class="close" on:click={(event) => {removeExercise(index)}}>X</button>
			</div>
		{/each}
	</div>
	<button class="secondary add-exercise" on:click={addExercise}>Add Exercise</button>
	<div class="stretched grd top-righter click-through">
		<button class="close clickable" on:click={removeSelf}>X</button>
	</div>
</div>

<style lang="scss">
	@use "../style/main.scss" as *;

	.day-config {
		position: relative;

		padding: 8px 4px 4px 4px;
		// background: rgba(0, 0, 0, 0.25);
		@include box-shadow();
	}

	h3 
	{
		margin-bottom: 16px;
	}

	.exercise-list 
	{
		display: grid;
		gap: 4px;
	}

	button.add-exercise {
		width: 100%;
		margin-top: 8px;
	}

	.exercise {
		width: 100%; 
		display: flex;

		height: 36px;

		gap: 2px;

		// display: relative; 

		button {
			height: 100%;
		}
	}

	select {
		width: 100%;
		height: 100%;
		padding: 6px 4px;

		flex-grow: 1; 
	}

	option {
		display: block;
		padding: 6px 4px; 
	}
</style>
