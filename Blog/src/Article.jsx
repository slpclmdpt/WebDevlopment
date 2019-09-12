import React from "react";

const Article = ({article}) => {
	const title = article.title;
	if(title === "Welcome"){
		return (
			<div className="article">
				<h1>{article.title}</h1>
				<article className="default-content">
					{article.content}
				</article>
			</div>
		);
	} else {
		return (
			<div className="article">
				<h1>{article.title}</h1>
				<article className="content">
					{article.content}
				</article>
			</div>
		);
	}
};

export default Article;

