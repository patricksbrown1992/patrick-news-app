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
    let arr = [];
    let i = 0;
    
    while(i < articles.articles.length-1){
      let first_article = articles.articles[i];
      let second_article = articles.articles[i+1];
      
      let div_1 = <div id={i} className='article-div'><div className = 'article-div-upper' style={{ 'backgroundImage': `url(${first_article.urlToImage})`}}></div><div className = 'article-div-lower'>{first_article.title}{first_article.description}<a href="google.com">Read More</a></div></div>
      let div_2 = <div id={i} className='article-div'><div className = 'article-div-upper' style={{ 'backgroundImage': `url(${second_article.urlToImage})`}}></div><div className = 'article-div-lower'>{second_article.title}{second_article.description}<a href="google.com">Read More</a></div></div>
      let combined_div = <div className='combined-div'>{div_1}{div_2}</div>
      arr.push(combined_div)
      i += 2;

    }


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
        
        url: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=e5040c51bda24558962c4af06ff1ee2b'
      })
    }

  }

  fetchArticles(){
    this.getArticles(this.state.search).then(articles => (this.receiveArticles(articles)))
  }


  render(){

   
    return (
      <div className="App">
        <h1>Patrick News App</h1>
        <div>
          <input type="text" value={this.state.seach} placeholder='search' onChange={this.handleChange()} />
          <button onClick={this.fetchArticles}>submit</button>
        </div>
        
        <div className='articles-div'>{this.state.articles}</div>
        
      </div>
    );
  }
  
}

export default App;
