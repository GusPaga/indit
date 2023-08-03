//this function is a helper for searchBar
export const FindNeedle = (haystack, needle) => {
	for (let i = 0; i < haystack.length; i++) {
		if (haystack.slice(i, needle.length + i) === needle) return i;
	}
	return -1;
};
