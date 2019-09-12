import React from "react";

const Catalog = ({titles,showDetail}) => {
	return (
		<ul className="titles">
			{titles.map(title => (<li onClick={e => showDetail(e.target.innerHTML)} className="title" key={title}>{title}</li>))}
		</ul>
	);
};

export default Catalog;

