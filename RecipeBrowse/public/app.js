(function IIFE(){
	const root = document.querySelector("#root");

	const messageFor = {
    unknown: 'An error occured, please try again',
    network: 'The network failed, please try again',
  	};

	const drawRecipesPage = function(recipes) {
		return `
			<div id="recipe-page">
				<div class="recipe-list">
					<p id="header">Recipes</p>
					<ul class="recipes">` +
					Object.keys(recipes).map(title => formatRecipe(title)).join("") +
				   `</ul>
				</div>
				<div class="status"></div>
				<form class="add-recipe" action="/recipe/" method="GET">
					<button type="submit">New Recipe</button>
				</form>
			</div>
		`;
	};

	const drawAddPage = function() {
		return `
			<div id="add-recipe-page">
				Title: <input class="to-send" value="" name="title" type="text"/>
				Ingredients List: <input class="to-send" value="" name="ingredients" type="text" />
				Instructions: <input class="to-send" value="" name="instructions" type="text" />
				<div class="action">
					<button id="submit" type="submit">Submit</button>
					<a href="http://localhost:3000/" class="to-home">Return to Home</a>
				</div>				
			</div>
		`;
	}

	const drawDetailPage = function(recipe) {
		return `
			<div id="detail">
				<span>Title:</span>
				<br />
				<textaera>${recipe.title}</textaera>
				<br /><br />
				Ingredients List:
				<br />
				<textaera>${recipe.ingredients}</textaera>
				<br /><br />
				Instructions:
				<br />
				<textaera>${recipe.instructions}</textaera>
		 		<div class="action">
					<a href="http://localhost:3000/" class="to-home">Return to Home</a>
				</div>
			</div>
		`;
	};


	const updateStatus = function( code ) {
	    const status = document.querySelector('.status');
	    status.innerText = messageFor[code];
  	};

	function updateRecipes (){
		fetch("/recipes")
		.catch(err => Promise.reject({error : 'network', err}))
		.then(response => {
			if(response.ok){
				return response.json();
			}
			return Promise.reject({error: 'unknown', err: response.statusText});
		})
		.then(allRecipes => {
			root.innerHTML = drawRecipesPage(allRecipes);
			document.querySelector(".add-recipe > button").addEventListener("click", e => {
				e.preventDefault();
				root.innerHTML= drawAddPage();
				addPageSetting();
				toHome();
			});
			document.querySelectorAll(".recipes li").forEach(recipeItem => {
				recipeItem.addEventListener("click", e => {
					e.preventDefault();
					showDetail(e.target.innerHTML);
				});
			});		
		})
		.catch(err => {
			updateStatus(err.error);
		});
	}

	function addRecipe(title,ingredients,instructions){
		fetch("/recipes", {
			method: "PUT",
			headers: new Headers({
				"content-type": "application/json"
			}),
			body: JSON.stringify({title,ingredients,instructions})
		})
		.catch(err => Promise.reject({ error: "network", err }))
		.then( response => {
			if(response.ok){
				return response.json();
			}
			return Promise.reject({error: "unknown", err: response.statusText});
		})
		.then(allRecipes => {
			root.innerHTML = showDetail(title);
		})
		.catch(err => {
			updateStatus(err.error);
		});
	}

	function showDetail(title){
		fetch(`/recipes/${title}`)
		.catch(err => Promise.reject({error : 'network', err}))
		.then(response =>{
			if(response.ok){
				return response.json();
			}
			return Promise.reject({error: 'unknown', err: response.statusText});
		})
		.then(recipe => {
			root.innerHTML = drawDetailPage(recipe);
			toHome();
		})
		.catch(err => {
			updateStatus(err.error);
		})
	}

	function toHome () {
		document.querySelector(".to-home").addEventListener("click", e => {
			e.preventDefault();
			updateRecipes();
		});		
	}

	function addPageSetting(){
		const submitButton = document.querySelector("#submit");
		const toSendRecipe = document.querySelectorAll(".to-send");
		let titleField = document.querySelector("[name='title']");
		let ingredientsField = document.querySelector("[name='ingredients']");
		let instructionsField = document.querySelector("[name='instructions']");		
	 	submitButton.disabled = !submitButton.disabled;
	 	toSendRecipe.forEach(input => {
	 		input.addEventListener("input", e => {	 			
	 			if(titleField.value&&ingredientsField.value&&instructionsField.value){
	 				submitButton.disabled = false;
	 			} else {
	 				submitButton.disabled = true;
	 			}
	 		});
	 	});
	 	submitButton.addEventListener("click", e => {
	 		e.preventDefault();
	 		addRecipe(titleField.value,ingredientsField.value,instructionsField.value);
	 	});
	}
	
	function formatRecipe(title) {
		return `<li class="recipe">${title}</li>`;
	}

	updateRecipes();

})();