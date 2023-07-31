export const scroll = () => {
	try {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		});
	} catch (error) {
		console.log({ 'error in scroll': error.message });
	}
};
