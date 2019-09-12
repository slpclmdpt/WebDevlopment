export const sendMessage = (username,message) => {
	return fetch("/messages", {
		method: "PUT",
		headers: new Headers({"content-type": "application/json"}),
		body: JSON.stringify({message,username})
	})
	.catch(err => Promise.reject({error: "Network error, try again later.", err}))
	.then(response => {
		if(response.ok) {
			return response.json();
		}
		return Promise.reject({error: "Message sent failed, try again later.", err: response.statusText});
	});
}

export const refresh = () => {
	return fetch("/messages")
	.catch(err => Promise.reject({error: "Network error, try again later.", err}))
	.then(response =>{
		if(response.ok){
			return response.json();
		}
		return Promise.reject({error: "Data fetch failed, try again later.", err: response.statusText});
	});
}

export const login = (name) => {
	return fetch("/login", {
		method: "PUT",
		headers: new Headers({"content-type": "application/json"}),
		body: JSON.stringify({name})
	})
	.catch(err => Promise.reject({error: "Network error, try again later.", err}))
	.then(response =>{
		if(response.ok){
			return response.json();
		}
		return Promise.reject({error: "Login failed, try again later.", err: response.statusText});
	});	
}