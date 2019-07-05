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
			<h1>MOVIES</h1>

			<div className="movies-list">
				{this.state.movies.map(movies => (
					<div className="itemMovie">
						<a href=""><img src={movies.poster_path}></img></a>
						<h3 key={movies.id}>{movies.title}</h3>
					</div>
				))}
			</div>
			============================================
			<br />
			<h1>Series</h1>
			<div className="series-list">
				{this.state.series.map(series => (
					<div className="itemSerie">
						<a href=""><img src="{series.poster_path}"></img></a>
						<h3 key={series.id}>{series.name}</h3>
					</div>
				))}
			</div>
		
			</html>

		);
	}
}