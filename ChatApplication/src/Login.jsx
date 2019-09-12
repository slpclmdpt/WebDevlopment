import React from "react";

class Login extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			disabled: true,
			input : ""
		};
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		if(e.target.value){
			this.setState({disabled: false, input: e.target.value});
		} else {
			this.setState({disabled: true});
		}
	}

	render(){
		return (
			<div className="login">
		          <input onChange={this.handleInput} value={this.state.input}  name="username" placeholder="Enter Username"/>
		          <button disabled={this.state.disabled} onClick={ (e) => this.props.loginUser(this.state.input)}>Login</button>
	      	</div>
		);
	}
}

export default Login;