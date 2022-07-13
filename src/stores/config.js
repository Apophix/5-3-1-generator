import { writable } from "svelte/store";

const initial = JSON.parse(localStorage.getItem("config")) || {
	days: [],
	trainingMax: {},
}

export const config = writable(initial); 

config.subscribe(value => {
	localStorage.setItem("config", JSON.stringify(value))
})