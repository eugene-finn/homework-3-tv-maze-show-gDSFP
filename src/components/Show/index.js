import React from 'react';

class Show extends React.Component {
  state = {
    image: '',
    name: '',
    genres: '',
    summary: '',
    showId: ''
  };

  static getDerivedStateFromProps(prevProps, prevState) {
    if (prevProps.showId !== prevState.showId) {
      return { showId: prevProps.showId };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showId !== prevState.showId) {
      this.getTvMaze(this.state.showId);
    }
  }

  getTvMaze = async showId => {
    const response = await fetch(`http://api.tvmaze.com/shows/${showId}`);

    const json = await response.json();

    const {
      image: { medium: image },
      name,
      genres,
      summary
    } = json;
    this.setState({ image, name, genres, summary });
  };

  render() {
    console.log(this.state);
    console.log('props', this.props);
    return (
      <div className="show">
        <img
          className="show-image"
          src={this.state.image}
          alt={this.state.name}
        />
        <h2 className="show-label t-show-name">{this.state.name}</h2>
        <p className="show-text t-show-genre">
          <p>{this.state.genres}</p>
        </p>
        <p
          className="show-text t-show-summary"
          dangerouslySetInnerHTML={{ __html: this.state.summary }}
        ></p>
      </div>
    );
  }
}

export default Show;
