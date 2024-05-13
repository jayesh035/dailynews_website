import React, { Component } from "react";
import NewItem from "./NewItem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static Defaultprop = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };
  capitalize = (thisa) => {
    return thisa.charAt(0).toUpperCase() + thisa.slice(1);
  };
  constructor(props) {
    super(props);

    this.state = {
      articals: [],
      loading: false,
      page: 1,
      flg: true,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)}- NewsApp`;
  }
  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData.articles);
    this.setState({
      articals: parseData.articles,
      totalResults: parseData.totalResults,
    });
    this.setState({ loading: false });
    this.props.setProgress(100);
  }
  // handlePrevClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=${this.props.apiKey}&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parseData = await data.json();

  //   // console.log(parseData.articles)
  //   this.setState({ articals: parseData.articles });
  //   this.setState({ page: this.state.page - 1, flg: false });
  //   this.setState({ loading: false });
  // };
  // handleNextClick = async () => {
  //   if (
  //     this.state.page + 1 >
  //     Math.ceil(this.state.totalArticals / this.props.pageSize)
  //   ) {
  //     this.setState({ flg: true });
  //   } else {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${
  //       this.props.country
  //     }&category=${
  //       this.props.category
  //     }&apiKey=${this.props.apiKey}&page=${
  //       this.state.page + 1
  //     }&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let parseData = await data.json();

  //     // console.log(parseData.articles)
  //     this.setState({ articals: parseData.articles });
  //     this.setState({ page: this.state.page + 1, flg: false });
  //     this.setState({ loading: false });
  //   }
  // };
  fetchMoreData = async () => {
    
    

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parseData = await data.json();

    // console.log(parseData.articles)
    this.setState({ articals: this.state.articals.concat(parseData.articles) });
    this.setState({totalResults:parseData.totalResults})
   
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 0px",marginTop:'90px' }}>
          NewsMonky-Top from {this.capitalize(this.props.category)} headlines
        </h1>

        <InfiniteScroll
          dataLength={this.state.articals.length}
        
          hasMore={this.state.articals.length < this.state.totalResults}
          next={this.fetchMoreData}
          loader={<Spinner />}
        >
          {this.state.loading &&<Spinner/>}
          <div className="container">
            <div className="row">
              {this.state.articals?.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewItem
                      title={element.title}
                      description={element.description}
                      ImgUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePrevClick}>&larr;Previous</button>
        <button disabled={this.state.flg} type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next&rarr;</button>
        </div> */}
      </>
    );
  }
}
