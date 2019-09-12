const express = require("express");
const app = express();
const PORT = 3000;
const recipe = require("./recipe");
const recipeWeb = require("./recipe-web");

app.use(express.static("./public"));

app.get("/", (req, res) => {
	let title = req.query.title;
	// console.log(req.query);
	if(title&&recipe.recipes[title]){
		res.send(recipeWeb.detailPage(recipe.recipes[title]));
	} else {
		res.send(recipeWeb.homePage(recipe.recipes));
	}
	
});

app.get("/add", (req, res) => {
	res.send(recipeWeb.addRecipePage());
});

app.post("/add", express.urlencoded({ extended: false }), (req, res) =>{
	let title = req.body.title;
	let ingredients = req.body.ingredients;
	let instructions = req.body.instructions;
	if(title&&ingredients&&instructions) {
		recipe.recipes[title] = {title,ingredients,instructions};
		res.redirect(`/?title=${title}`);
	} else {
		res.send(recipeWeb.errorPage());
	}
});

app.get("/add/:title", (req, res) => {
	const title = req.params.title;
	if(!recipe.recipes[title]){
		res.redirect("/");
	} else {
		res.send(recipeWeb.detailPage(recipe.recipes[title]));
	}
});


app.get("/recipes", (req,res) => {
	res.json(recipe.recipes);
 });

app.get("/recipes/:title", (req, res) => {
	const title = req.params.title;
	if(!recipe.recipes[title]){
		res.status(404).json({ error: `No such recipe: ${title}`});
	} else {
		res.json(recipe.recipes[title]);
	}
});

app.put("/recipes/", express.json(), (req, res) =>{
	let title = req.body.title;
	let ingredients = req.body.ingredients;
	let instructions = req.body.instructions;
	recipe.recipes[title] = {title,ingredients,instructions};
	res.json(recipe.recipes);
});


app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));