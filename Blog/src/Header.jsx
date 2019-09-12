import React from "react";

const Header = ({showCatalog,showAddPage}) => {
	return (
		<div className="header">
			<button onClick={showCatalog} className="button">Catalog</button>
			<button onClick={showAddPage} className="button">Add New Article</button>
		</div>
	);
};

export default Header;