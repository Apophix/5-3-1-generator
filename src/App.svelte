<script>
	import { setContext } from "svelte";
	import DayDisplay from "./components/DayDisplay.svelte";

	import Paper from "./components/Paper.svelte";
	import Sidebar from "./components/Sidebar.svelte";

	let globalConfig = {
		exercises: new Map([
			["squat", { name: "Squat" }], 
			["deadlift", { name: "Deadlift" }], 
			["bench", { name: "Bench" }]
		]),
		weeks: [
			{
				name: "Light",
				weightData: [
					{ mult: 0.65, sets: 1, reps: 5 },
					{ mult: 0.75, sets: 1, reps: 5 },
					{ mult: 0.85, sets: 1, reps: 5, plus: true },
					{ mult: 0.65, sets: 5, reps: 5 },
				],
			},
			{
				name: "Moderate",
				weightData: [
					{ mult: 0.7, sets: 1, reps: 3 },
					{ mult: 0.8, sets: 1, reps: 3 },
					{ mult: 0.9, sets: 1, reps: 3, plus: true },
					{ mult: 0.7, sets: 5, reps: 5 },
				],
			},
			{
				name: "Heavy",
				weightData: [
					{ mult: 0.75, sets: 1, reps: 5 },
					{ mult: 0.85, sets: 1, reps: 3 },
					{ mult: 0.95, sets: 1, reps: 1, plus: true },
					{ mult: 0.75, sets: 5, reps: 5 },
				],
			},
			{
				name: "Deload",
				weightData: [
					{ mult: 0.5, sets: 1, reps: 5 },
					{ mult: 0.6, sets: 1, reps: 5 },
					{ mult: 0.6, sets: 1, reps: 5, plus: true },
					{ mult: 0.5, sets: 5, reps: 5 },
				],
			},
		],
	};

	setContext("globalConfig", globalConfig);

	import { config as sidebarConfig } from './stores/config.js'; 

	for (let [id, e] of globalConfig.exercises) 
		$sidebarConfig.trainingMax[id] = $sidebarConfig.trainingMax[id] || 0; 
</script>

<main>
	<Sidebar bind:workoutConfig={$sidebarConfig} />

	<div class="content">
		<Paper bind:config={$sidebarConfig}>
			{#each globalConfig.weeks as week, weekIndex}
				<div class="week">
					<!-- <div class="week-header"><h2>{week.name}</h2></div> -->
					<div class="weekdays">
						{#each $sidebarConfig.days as day, index}
							<DayDisplay dayData={day} dayNumber={index + 1} {week} trainingMax={$sidebarConfig.trainingMax} />
						{/each}
					</div>
				</div>
			{/each}
		</Paper>
	</div>
</main>

<style lang="scss">
	@use "./style/main.scss" as *;

	main {
		width: 100%;
		height: 100vh;
		background: $THEME-COLOR-LIGHT;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: auto 1fr;
	}

	.content {
		display: grid;
		align-items: center;
		justify-items: center;
	}

	h2 {
		font-size: 1.2rem; 
		font-weight: bold; 
	}

	.week-header {
		grid-column: 1/-1;
		background: $THEME-COLOR-BRIGHTEST; 
		color: black;
		padding: 4px;
		text-align: center;
		display: grid;
		align-content: center;
		margin-top: 4px;

		&:first-child {
			margin-top: 0;
		}
		// height: 30px;
	}

	.week 
	{
		display: grid; 
		grid-template-rows: auto 1fr;
	}

	.weekdays 
	{
		display: flex; 
		flex-direction: row;

		gap: 4px;
	}
	
</style>
