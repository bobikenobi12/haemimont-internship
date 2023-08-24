export const FormatDate = (date: string) => {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const day = d.getDate();
	const hour = d.getHours();
	const minute = d.getMinutes();
	const second = d.getSeconds();
	return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};
