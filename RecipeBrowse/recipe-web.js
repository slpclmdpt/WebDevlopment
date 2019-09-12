const recipeWeb = {
	root: function(content) {
		return `
			<!DOCTYPE html>
			<html>
				<head>
					<link rel="stylesheet" href="app.css" >
				</head>
				<body>
					<div id="root">
						${content}
					</div>
				<script src="/app.js"></script>
				</body>
			</html>
		`;
	},

	homePage: function(recipes) {
		return this.root(`
			<div id="root">
				<div class="recipe-list">
					<p id="header">Recipes</p>
					${this.getRecipes(recipes)}
				</div>
				<div class="status"></div>
				<form class="add-recipe" action="/add" method="GET">
					<button type="submit">New Recipe</button>
				</form>
				<script src="/app.js"></script>
			</div>
		`);
	},

	addRecipePage: function() {
		return this.root(`
			<div id="add-recipe-page">
				<form action="/add" method="POST">
					Title: <input class="to-send" value="" name="title" type="text"/>
					Ingredients List: <input class="to-send" value="" name="ingredients" type="text" />
					Instructions: <input class="to-send" value="" name="instructions" type="text" />
					<div class="action">
						<button id="submit" type="submit">Submit</button>
						<a href="http://localhost:3000/" class="to-home">Return to Home</a>
					</div>
				</form>			
			</div>
		`);
	},

	detailPage: function(recipe) {
		return this.root(`
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
		`);
	},

	errorPage: function() {
		return this.root(`
			<p>Cannot add recipe without all information filled.</p>
			<a href="http://localhost:3000/" class="to-home">Return to Home</a>
		`);
	},

	getRecipes: function(recipes) {
		return `<ul class=recipes>` +
					Object.keys(recipes).map(title => this.formatRecipe(title))
					.join('') +
			   `</ul>`;
	},

	formatRecipe: function (title) {
		return `<li class="recipe"><a href="http://localhost:3000/?title=${title}" class="recipe-link">${title}</a></li>`;
	}
};

module.exports = recipeWeb;
