export const refresh = () => {
	return fetch("/articles")
	.catch(err => Promise.reject({error: "Network error, try again later.", err}))
	.then(response =>{
		if(response.ok){
			return response.json();
		}
		return Promise.reject({error: "Articles fetch failed, try again later.", err: response.statusText});
	});
}

export const getDetail = (title) => {
	return fetch(`/articles/${title}`)
	.catch(err => Promise.reject({error: "Network error, try again later.", err}))
	.then(response =>{
		if(response.ok){
			return response.json();
		}
		return Promise.reject({error: "This article fetch failed, try again later.", err: response.statusText});
	});
}

export const addBlog = (title,content) => {
	return fetch("/articles", {
		method: "PUT",
		headers: new Headers({"content-type": "application/json"}),
		body: JSON.stringify({title,content})
	})
	.catch(err => Promise.reject({error: "Network error, try again later.", err}))
	.then(response => {
		if(response.ok) {
			return response.json();
		}
		return Promise.reject({error: "Blog added failed, try again later.", err: response.statusText});
	});
}