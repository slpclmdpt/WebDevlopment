import React from "react";
import UserList from "./UserList";
import MessageList from "./MessageList";
import Outgoing from "./Outgoing";
import {sendMessage,refresh} from "./services"

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: props.users,
			messages: [],
			username: props.username
		};
		this.addMessage = this.addMessage.bind(this);
	}

	componentWillMount(){
		refresh()
		.then( response => {
			this.setState({users: response.users, messages: response.messages});
		});
	}

	componentDidMount(){
		const intervalId = setInterval(() => {
			refresh()
			.then(response => {
				this.setState({users: response.users, messages: response.messages});
			});
		}, 5000);
	}

	componentWillUnmount(){
		clearInterval(this.intervalId);
	}

	addMessage(message){
		if(message){
			sendMessage(this.state.username,message)
			.then( response => {
				this.setState({users: response.users, messages: response.messages});
			});
		}
	}


	render() {
		return (
			<div className="chat-app">
				<div className="display-panel">
					<UserList users={this.state.users}/>
					<MessageList messages={this.state.messages}/>
				</div>
				<Outgoing addMessage={this.addMessage}/>				
			</div>
		);
	}
}

export default Chat;