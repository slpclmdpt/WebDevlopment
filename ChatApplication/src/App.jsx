import React, { Component } from 'react';
import './App.css';
import Login from "./Login";
import Chat from "./Chat";
import {login} from "./services"

class App extends Component {
	constructor() {
		super();
		this.state = {
			users: {},
			username: ""
		};
		this.loginUser = this.loginUser.bind(this);
	}

	loginUser(name){
		login(name)
		.then(response =>{
			this.setState({username: response.username, users: response.users});
		})

	}

	render() {
		if(!this.state.username){
			return (
	   			<Login loginUser={this.loginUser}/>
			);
		} else {
			return (
				<Chat users={this.state.users} username={this.state.username} />
			);
		}
	}
}

export default App;
