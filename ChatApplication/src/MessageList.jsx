import React from "react";
import Message from "./Message";

const messageList = ({messages}) => {
	return (
		<ul className="messages">
			<Message messages={messages}/>
		</ul>
	);
};

export default messageList;