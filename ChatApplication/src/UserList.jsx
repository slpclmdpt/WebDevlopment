import React from "react";

const userList = ({users}) => {
	return (
		<ul className="users">
			{Object.keys(users).map(user => (<li className="user" key={user}>{user}</li>))}
		</ul>
	);
};

export default userList;