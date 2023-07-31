// Function to render time, this function convert mili (thousands) seconds to hours

export const convertTime = (time) => {
	try {
		if (typeof time === 'number') {
			const hours = Math.floor(time / (1000 * 60 * 60));
			const minutes = Math.floor((time / (1000 * 60)) % 60);
			// console.log(`${hours}:${minutes}`);
			return `${hours}:${minutes.toString().padStart(2, '0')} hs`;
		} else {
			console.log('error in convertTime: time is not a number');
			return `${'N/A'}`;
		}
	} catch (error) {
		console.log({ 'error in convertTime': error.message });
	}
};
