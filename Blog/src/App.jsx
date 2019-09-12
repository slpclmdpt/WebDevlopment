import React, {Component} from 'react';
import './App.css';
import Catalog from './Catalog';
import Header from './Header';
import Article from './Article';
import AddNewArticle from './AddNewArticle';
import {refresh,getDetail,addBlog} from './services';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      catalog: true,
      titles:[],
      addPage: false,
      detail:null,
      newBlogTitle:"",
      newBlogContent:"",
      defaultArticle:{title:"Welcome", content: "Select an article to read!"}
    }
    this.showCatalog = this.showCatalog.bind(this);
    this.showAddPage = this.showAddPage.bind(this);
    this.showHome = this.showHome.bind(this);
    this.showDetail = this.showDetail.bind(this);
    this.submitNew = this.submitNew.bind(this);
    this.updateNewArticleINFO = this.updateNewArticleINFO.bind(this);
  }

  componentWillMount(){
    refresh()
    .then( articles => {
      this.setState({
        titles: Object.keys(articles),
        articles: articles
      });   
    });
  }

  componentDidMount(){
    const intervalId = setInterval(() => {
      refresh()
      .then( articles => {
        this.setState({
          titles: Object.keys(articles),
          articles: articles
        });   
      });
    }, 5000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  showCatalog(){
    this.setState({catalog: !this.state.catalog});
  }

  showAddPage(){
    this.setState({addPage: !this.state.addPage})
  }

  showDetail(title){
    getDetail(title)
    .then(
      response => {
        this.setState({
          detail: response
        });
      }
    );
  }

  showHome(){
    this.setState({addPage: !this.state.addPage})
  }

  submitNew(){
    addBlog(this.state.newBlogTitle,this.state.newBlogContent)
    .then( response => {
      this.setState({
        titles: Object.keys(response.articles),
        detail: response.newArticle,
        addPage: false
      });
    })
  }

  updateNewArticleINFO(e){
    if(e.target.className === "title-to-send"){
      this.setState({
        newBlogTitle: e.target.value
      });
    } else {
      this.setState({
        newBlogContent: e.target.value
      });
    }
  }

  render(){
    if(!this.state.addPage){
      return (
        <div className="App">
          {this.state.catalog && 
          <div className="blog-left app-child">
             <Catalog titles={this.state.titles} showDetail={this.showDetail} /> 
          </div>}
          <div className="blog-right app-child">  
            <Header showCatalog={this.showCatalog} showAddPage={this.showAddPage} />
            {this.state.detail && <Article article={this.state.detail}/>}
            {!this.state.detail && <Article article={this.state.defaultArticle}/>}
          
          </div>
        </div>
      );    
    }else {
      return (
        <div className="add-new-article">
          <AddNewArticle updateNewArticleINFO={this.updateNewArticleINFO} showHome={this.showHome} submitNew={this.submitNew} />
        </div>
      );
    }
    
  }

}

export default App;
