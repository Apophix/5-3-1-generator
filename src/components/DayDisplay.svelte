<script>
	import { getPlateString } from "../util/plates.js"
	import { mRound } from "../util/round.js";
	import { getContext } from "svelte";

	export let dayData = {};
	export let dayNumber = 1;
	export let week = {}; 

	export let trainingMax; 

	let globalConfig = getContext("globalConfig");
</script>

<div class="day">
	<h3>{week.name} Day {dayNumber}</h3>

	<div class="exercises">
		{#each dayData.chosenExercises || [] as chosenExerciseId}
			<div class="exercise">
				<h4>{globalConfig.exercises.get(chosenExerciseId)?.name}</h4>
				<table>
					<tr>
						<th>%</th>
						<th>Weight</th>
						<th class="bigger">Plates</th>
						<th>Sets</th>
						<th>Reps</th>
					</tr>
					{#each week.weightData || [] as weightSet}
						<tr>
							<td>{weightSet.mult * 100 + "%"}</td>
							<td class="weight">{mRound(trainingMax[chosenExerciseId] * weightSet.mult)}</td>
							<td>{getPlateString(mRound(trainingMax[chosenExerciseId] * weightSet.mult))}</td>
							<td>{weightSet.sets}</td>
							<td>{weightSet.reps}{#if weightSet.plus}+{/if}</td>
						</tr>
					{/each}
				</table>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use "../style/main.scss" as *;

	.day {
		height: 100%;
		flex: 1;
		padding: 2px;
	}

	h3 {
		font-size: 1.2rem;
		text-align: center;
		border-bottom: 1px solid BLACK;
		padding-bottom: 2px;
		margin-bottom: 4px;
	}

	h4 {
		text-align: center;
		font-size: 1.1rem;
		font-weight: bold;
		margin-top: 4px;
		margin-bottom: 4px
	}

	
	table {
		width: 100%;

		table-layout: fixed;

		border: 1px solid black;

		tr:first-child {
			border-bottom: 1px solid BLACK; 
		}

		tr:nth-child(even) {
			background: $COLOR-LIGHT-GRAY; 
		}
		
		td.weight {
			font-weight: bold;
		}

		th, td {
			text-align: center;

			width: 15%;
			

			&.bigger {
				width: 60%;
			}
		}
	}
</style>
