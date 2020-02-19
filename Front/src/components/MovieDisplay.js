import React from 'react'

class MovieDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {test: 0};
  }

  async componentDidMount(){
  var url = "http://127.0.0.1:3001/api/v1/articles";
  var response = await fetch(url);
  const data = await response.json();
  console.log(data);

  }

  render(){

    return(
      <div className="MovieDisplay">

      <b>TEST</b>
      </div>
    );

  }
}

class SearchBar extends React.Component {
  render(){

    return(
      <b>IM THE SerachBar Shiiiiiiiiiiiiiiiiiii</b>
    );

  }
}
export default MovieDisplay;
