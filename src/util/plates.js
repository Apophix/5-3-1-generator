const plateOptions = [
	45, 35, 25, 10, 5, 2.5
]; 


export function calculatePlates(targetWeight, barbellWeight = 45) {
	// start off with the barbell 
	let currentWeight = barbellWeight; 

	let plateConfig = new Map(); 

	while (currentWeight < targetWeight) {
		// this is to handle edge cases where you can't actually make the weight with the combination of plates
		// if you enter weird numbers for your TMs
		let bDidSomething = false; 

		for (let plate of plateOptions) {
			if (currentWeight + (plate * 2) <= targetWeight) {
				plateConfig.set(plate, (plateConfig.get(plate) || 0) + 2); 

				currentWeight += (plate * 2); 

				bDidSomething = true; 
				break; 
			}
		}

		if (!bDidSomething) break; 
	}

	return plateConfig; 
}

export function getPlateString(targetWeight, barbellWeight) {
	let plateConfig = calculatePlates(targetWeight, barbellWeight);

	let arr = []; 

	for (const [plateSize, numPlates] of plateConfig) {
		 arr.push(`${plateSize}x${numPlates}`); 
	}

	return arr.join(', ');
}