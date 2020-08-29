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



  receiveArticles(articles){
    let arr = [];
    let i = 0;
    
    while(i < articles.articles.length-1){
      let first_article = articles.articles[i];
      let second_article = articles.articles[i+1];
    

      // Regex removes any html elements in title or description
      let div_1 = <div key={i} className='article-div'><div className = 'article-div-upper' style={{ 'backgroundImage': `url(${first_article.urlToImage})`}}></div><div className = 'article-div-lower'><h3 className='article-title'>{first_article.title.replace(/(<([^>]+)>)/ig, "")}</h3> <h4 className='article-desc'>{first_article.description.replace(/(<([^>]+)>)/ig, "")}</h4><a href={first_article.url} target="_blank">Read More</a></div></div>
      let div_2 = <div key={i+1} className='article-div'><div className = 'article-div-upper' style={{ 'backgroundImage': `url(${second_article.urlToImage})`}}></div><div className = 'article-div-lower'><h3 className='article-title'>{second_article.title.replace(/(<([^>]+)>)/ig, "")} </h3><h4 className='article-desc'>{second_article.description.replace(/(<([^>]+)>)/ig, "")}</h4><a href={second_article.url} target="_blank">Read More</a></div></div>
      let combined_div = <div className='combined-div'>{div_1}{div_2}</div>
      arr.push(combined_div)
      i += 2;

    }


    this.setState({articles: arr})
  
  }

  getArticles(){
    // If this is a generic search or a search for a specific topic
    if(this.state.search.length){
      // what is it sorted by
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
    // get articles then take the articles and put them in local state
    this.getArticles().then(articles => (this.receiveArticles(articles)))
  }

  updateSelect(e){
    // update the sort by drop down
    this.setState({select: e.target.value})
  }


  render(){
    let article_className;
   if(!this.state.articles.length){
    article_className='';
   } else {
    article_className= 'articles-div';
   }
    return (
      <div className="App">
        <h1>Patrick Brown News App</h1>
        <h2>Read all about it</h2>
        <div className='upper-body'>
          <input type="text" className='search-bar' value={this.state.seach} placeholder='search' onChange={this.handleChange()} />
          <select onChange={this.updateSelect} name="sort-by" value={this.state.select} id="sort-by">
            <option value=''>Sort By</option>
            <option value=' '>None</option>
            <option value="relevancy">Relevance</option>
            <option value="publishedAt">Date</option>
            <option value="popularity">Popularity</option>
          </select>
          <button className='search-button' onClick={this.fetchArticles}>Submit</button>
        </div>
        <div className={article_className}>{this.state.articles}</div>
        
      </div>
    );
  }
  
}

export default App;
