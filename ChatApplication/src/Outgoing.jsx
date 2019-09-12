import React from "react";

class Outgoing extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			disabled: true,
			input: ""
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
			<div className="outgoing">
			  <input className="to-send" onChange={this.handleInput} name="text" placeholder="Enter message to send"/>
			  <button disabled={this.state.disabled} onClick={e => this.props.addMessage(this.state.input)}>Send</button>
			</div>
		);
	}
}

export default Outgoing;
