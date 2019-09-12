const express = require("express");
const app = express();
const PORT = 4000;
const blog = require("./blog");

app.use(express.static('./public'));

app.get("/articles", (req,res) => {
	res.json(blog.articles);
});

app.get("/articles/:title", (req,res) => {
	const title = req.params.title;
	if(blog.articles[title]){
		res.json(blog.articles[title]);
	} else {
		res.status(400).json({ error: ` Article doesn't exist.`});
	}
});

app.put("/articles", express.json(), (req,res) => {
	const title = req.body.title;
	const content = req.body.content;
	if(title&&content){
		blog.addArticle({title,content});
		res.json({articles:blog.articles, newArticle:{title,content}});
	} else {
		res.status(400).json({ error: ` 'title' and 'content' are required.`});
	}
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));