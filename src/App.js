import React from 'react';
import './App.css';
import $ from 'jquery';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {loaded: false, articles: [], search: '', select: ''};
    this.getArticles = this.getArticles.bind(this);
    this.receiveArticles = this.receiveArticles.bind(this);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateSelect = this.updateSelect.bind(this);
  
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
  
    let div_1 = <div id={i} className='article-div'><div className = 'article-div-upper' style={{ 'backgroundImage': `url(${first_article.urlToImage})`}}></div><div className = 'article-div-lower'><div className='article-title'>{first_article.title}</div><br /> <div className='article-desc'>{first_article.description}</div><a href="google.com">Read More</a></div></div>
      let div_2 = <div id={i} className='article-div'><div className = 'article-div-upper' style={{ 'backgroundImage': `url(${second_article.urlToImage})`}}></div><div className = 'article-div-lower'><div className='article-title'>{second_article.title} </div><br /> <div className='article-desc'>{second_article.description}</div><a href="google.com">Read More</a></div></div>
      let combined_div = <div className='combined-div'>{div_1}{div_2}</div>
      arr.push(combined_div)
      i += 2;

    }


    this.setState({articles: arr})
  
  }

  getArticles(){
    if(this.state.search.length){
      if(this.state.select.length){
        return $.ajax({
        
          url: `https://newsapi.org/v2/everything?q=${this.state.search}&pageSize=10&sortBy=${this.state.select}&language=en&apiKey=e5040c51bda24558962c4af06ff1ee2b`
        })
      } else {
        return $.ajax({
        
          url: `https://newsapi.org/v2/everything?q=${this.state.search}&language=en&pageSize=10&apiKey=e5040c51bda24558962c4af06ff1ee2b`
        })
      }
      
    } else {

      if(this.state.select.length){
        return $.ajax({
        
          url: `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&sortBy=${this.state.select}&language=en&apiKey=e5040c51bda24558962c4af06ff1ee2b`
        })
      } else {
        return $.ajax({
        
          url: 'https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=e5040c51bda24558962c4af06ff1ee2b'
        })
      }
      
    }

  }

  fetchArticles(){
    this.getArticles().then(articles => (this.receiveArticles(articles)))
  }

  updateSelect(e){
    this.setState({select: e.target.value})
  }


  render(){

   
    return (
      <div className="App">
        <h1>Patrick News App</h1>
        <div>
          <input type="text" className='search-bar' value={this.state.seach} placeholder='search' onChange={this.handleChange()} />
          <select onChange={this.updateSelect} name="sort-by" value={this.state.select} id="sort-by">
            <option value="">None</option>
            <option value="relevancy">Relevance</option>
            <option value="publishedAt">Date</option>
            <option value="popularity">Popularity</option>
        </select>
          <button className='search-button' onClick={this.fetchArticles}>submit</button>
        </div>
        <div className='articles-div'>{this.state.articles}</div>
        
      </div>
    );
  }
  
}

export default App;
