import React from 'react';

class AddNewArticle extends React.Component{
  	constructor(props){
    	super(props);
    	this.state = {
    		canSubmit: false,
    		title: false,
    		content: false
    	}
    	this.submitButtonChange = this.submitButtonChange.bind(this);
	}

	submitButtonChange(e){
		if(e.target.className === "title-to-send" && e.target.value){
			this.setState({title: true});
		}
		if(e.target.className === "content-to-send" && e.target.value){
			this.setState({content: true});
		}
		if(this.state.title && this.state.content){
			this.setState({
				canSubmit: true
			});
		}
	}

	render(){
		return (
			<div className="add-new-article">
				<div className="add-title">
					Title: <textarea onChange={(e) => {this.props.updateNewArticleINFO(e);this.submitButtonChange(e)}} className="title-to-send"></textarea>
				</div>
				<div className="add-content">
					Content: <textarea onChange={(e) => {this.props.updateNewArticleINFO(e);this.submitButtonChange(e)}} className="content-to-send"></textarea>
				</div>
				<div className="actions">
					<button disabled={!this.state.canSubmit} onClick={this.props.submitNew} id="submit" className="button">Submit</button>
					<button onClick={this.props.showHome} id="to-home" className="button">Return to Home</button>
				</div>			
			</div>
		);		
	}
}

export default AddNewArticle;