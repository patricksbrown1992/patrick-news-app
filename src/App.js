import React from 'react';
import './App.css';
import $ from 'jquery';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {loaded: false, articles: [], search: ''};
    this.getArticles = this.getArticles.bind(this);
    this.receiveArticles = this.receiveArticles.bind(this);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.handleChange = this.handleChange.bind(this);
  
  }

  componentDidMount(){
    this.getArticles().then(articles => (this.receiveArticles(articles)))
    // this.setState({loaded: true})
  }

  handleChange() {

    return (e) => {
        this.setState({ search: e.target.value })
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.fetchArticles(this.state.search).then(articles => (this.receiveArticles(articles)))
  }

  receiveArticles(articles){

    let arr = articles.articles.map(article => {
      return <li style={{ 'backgroundImage': `url(${article.urlToImage})`}}>{article.title}</li>
    })
    this.setState({articles: arr})
  
  }

  getArticles(){
    if(this.state.search.length){
      debugger
      return $.ajax({
        
        url: `https://newsapi.org/v2/everything?q=${this.state.search}&apiKey=e5040c51bda24558962c4af06ff1ee2b`
      })
    } else {
      return $.ajax({
        
        url: 'http://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=e5040c51bda24558962c4af06ff1ee2b'
      })
    }

  }

  fetchArticles(){
    this.getArticles(this.state.search).then(articles => (this.receiveArticles(articles)))
  }


  render(){

    if(!this.state.articles.length){
      return null;
    }
   
    return (
      <div className="App">
        <h1>News App</h1>
        <input type="text" value={this.state.seach} placeholder='search' onChange={this.handleChange()} />
        <button onClick={this.fetchArticles}>submit</button>
        {this.state.articles}
      </div>
    );
  }
  
}

export default App;
