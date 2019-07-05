import React, { Component } from "react";
import api from "../../services/api";

export default class Main extends Component {

	state = {
		movies: [],
		series: [],
	}
	
	componentDidMount(){
		this.loadMovies();
	}

	loadMovies = async () =>{
		const responseMovie = await api.get('/movie/top_rated?api_key=7d42357a7fa9d5924885c5ef46d7715f');
		const responseSerie = await api.get('/tv/top_rated?api_key=7d42357a7fa9d5924885c5ef46d7715f')
		console.log(responseMovie.data.results);
		console.log(responseSerie.data.results);
		this.setState({movies: responseMovie.data.results});
		this.setState({series: responseSerie.data.results});
	}

	render(){
		return (
			<html>
			//<div className="col-md-6">
				<div className="movies-list">
					{this.state.movies.map(movies => (
						<h2 key={movies.id}>{movies.title}</h2>
					))}
				</div>
			//</div>

			//<div className="col-md-6">
				<div className="series-list">
					{this.state.series.map(series => (
						<h2 key={series.id}>{series.name}</h2>
					))}
				</div>
			//</div>
			</html>

		);
	}
}