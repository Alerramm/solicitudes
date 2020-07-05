export const solicitudesApiGet = async (queryView) => {
	const method = queryView.method;
	const instance = await fetch(queryView.endpoint, {
		method,
		body: JSON.stringify(queryView.data),
	});
	const response = await instance.json();
	return response;
};
