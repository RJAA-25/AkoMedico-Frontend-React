export const generateKey = () => {
	return (Math.random() + 1).toString(36).substring(7);
};
