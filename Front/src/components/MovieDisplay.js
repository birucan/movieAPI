import React from 'react'
import './styles.css'
class MovieDisplay extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      page: 'movies',
      movieSearch: [],
      searchValue: '',
      idValue: '',
      date1: null,
      date2: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleDate1 = this.handleDate1.bind(this);
    this.handleDate2 = this.handleDate2.bind(this);

  }

  handleDate1(event) {
    this.setState({date1: event.target.value});
  }

  handleDate2(event) {
    this.setState({date2: event.target.value});
  }

  handleClick(event) {

    if (this.state.page === 'movies') {
      this.setState({page: 'add'});
    } else {
      this.setState({page: 'movies'});
    }
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleChangeId(event) {
    this.setState({idValue: event.target.value});
  }

  componentDidMount() {
    this.interval = setInterval(() => this.dbMovies(), 1000);
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async searchMovie() {
    //this.setState({page : 'event.target.searchValue'});

    /* var title = title.replace(' ', '+') */
    let responseMovies = await this.fetchSearchedMovie()
    this.changeData(responseMovies)
  }

  async searchMovieId() {
    var url = "https://api.themoviedb.org/3/movie/" + this.state.idValue + "?api_key=ab3a4639a4d813fff85b45e36a917a3d";
    var response = await fetch(url);
    const data = await response.json();

    this.setState({movieSearch: []});
    this.state.movieSearch.push(data);
  }

  async fetchSearchedMovie() {

    var title = this.state.searchValue.replace(' ', '+')
    var url = "https://api.themoviedb.org/3/search/movie?api_key=ab3a4639a4d813fff85b45e36a917a3d&query=" + title;
    var response = await fetch(url);
    const data = await response.json();
    return data
  }

  changeData({results}) {
    this.setState({movieSearch: results});
  }

  async dbMovies() {
    var url = "http://127.0.0.1:3001/api/v1/articles";
    var response = await fetch(url);
    const data = await response.json();

    this.setState({movies: data});
  }
  render() {

    if (this.state.page === 'movies') {
      if (!this.state.movies) {
        this.dbMovies()
        return (<div className="connecting">Connecting to rails server
          <button type="button">Add movie</button>
        </div>)
      } else {
        var Vmov = this.state.movies;
        var elements = [];
        for (var a = 0; a < Vmov.length; a++) {
          elements.push(<Movie movie={Vmov[a]}/>);
        }

        return (<div className="MovieDisplay">
          <button type="button" id="add" onClick={() => this.handleClick()}>Add movie</button>
          <div className='dates'>
            Inicial date
            <input type="date" id="incial" value={this.state.date1} onChange={this.handleDate1}></input>
          </div>
          <space/>
          <div className='dates'>
            final date
            <input type="date" id="final" value={this.state.date2} onChange={this.handleDate2}></input>
          </div>
          {elements}

        </div>);
      }
    } else if (this.state.page === 'add') {
        var Vmova = this.state.movieSearch;
        var elements2 = [];

        for (var a = 0; a < Vmova; a++) {

          elements2.push(<Movie movie={this.state.movieSearch[a]}/>);
        }

        return (<div>
          <button type="button" id="add" onClick={() => this.handleClick()}>return</button>
          <div>

            <input type="text" value={this.state.searchValue} onChange={this.handleChange} placeholder="Title Search"/>
            <button type="button" id="add" onClick={() => this.searchMovie()}>Search</button>

            <input type="text" value={this.state.idValue} onChange={this.handleChangeId} placeholder="Id Search"/>
            <button type="button" id="add" onClick={() => this.searchMovieId()}>Find</button>

            {
              this.state.movieSearch.length > 0
                ? this.state.movieSearch.map(movie => <Movie movie={movie} search='true'></Movie>)
                : null
            }
          </div>
        </div>);


    }

  }
}

class Movie extends React.Component {
  async addMovie() {
    var url = "http://127.0.0.1:3001/api/v1/articles";
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: this.props.movie.title, overview: this.props.movie.overview, vote_count: this.props.movie.vote_count, poster_path: this.props.movie.poster_path, release_date: this.props.movie.release_date})
    })
  }
  async removeMovie() {
    var url = 'http://127.0.0.1:3001/api/v1/articles/' + this.props.movie.id;

    fetch(url, {method: 'DELETE'})
  }
  render() {
    var img = 'http://image.tmdb.org/t/p/w185/' + this.props.movie.poster_path
    return (<div>
      <div className="movie">
        <div className="movieElement">
          <b>{this.props.movie.title}</b>
        </div>
        <div className="movieElement">
          {this.props.movie.overview}
        </div>
        <div className="movieElement">
          <b>Vote Count:</b>
          {this.props.movie.vote_count}
        </div>
        <div className="movieElement">

          <img src={img} alt="movie poster"/>

        </div>
        <div className="movieElement">
          {this.props.movie.release_date}
        </div>
        <div className="movieElement">
          {
            this.props.search === 'true'
              ? (<button type="button" id="addMovie" onClick={() => this.addMovie()}>Add</button>)
              : (<button type="button" id="removeMovie" onClick={() => this.removeMovie()}>remove</button>)
          }
        </div>

      </div>
      <space/>
    </div>);

  }
}
export default MovieDisplay;
