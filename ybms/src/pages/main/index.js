import React, { Component } from "react";
import api from "../../services/api";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'



export default class Main extends Component {

	state = {
		movies: [],
		series: [],
	}
	
	componentDidMount(){
		this.loadMovies();
	}

	loadMovies = async () =>{
		//Chamada da API TMDB
		const responseMovie = await api.get('/movie/top_rated?api_key=7d42357a7fa9d5924885c5ef46d7715f');
		const responseSerie = await api.get('/tv/top_rated?api_key=7d42357a7fa9d5924885c5ef46d7715f')
		
		//Retorno de Requisição no Console
		console.log(responseMovie.data.results);
		console.log(responseSerie.data.results);

		//Preenchendo os vetores do state com informações vindas da API
		this.setState({movies: responseMovie.data.results});
		this.setState({series: responseSerie.data.results});
	}

	render(){
		return (
			<html>
			<div> //Div Global

				<div> //Div Carousel
					<Carousel>

						<Carousel.Item>
						 <img
						   className="d-block w-100"
						   src="{movies.poster_path}"
						   alt="First slide"
						 />
						 <Carousel.Caption>
						   <h3>Top 1 Movie</h3>
						   <p>{movies.overview}</p>
						 </Carousel.Caption>
						</Carousel.Item>

						<Carousel.Item>
						 <img
						   className="d-block w-100"
						   src="{series.poster_path}"
						   alt="Second slide"
						 />
						 <Carousel.Caption>
						   <h3>Top 1 Serie</h3>
						   <p>{series.overview}</p>
						 </Carousel.Caption>
						</Carousel.Item>

					</Carousel>
				</div> //Fim Div Carousel

				<div> //Div Container
					<Container>
						<Row>
							<Col>
								<h1>MOVIES</h1>
								<div className="movies-list">
									{this.state.movies.map(movies => (
										<div className="itemMovie">
											<a href=""><img src={movies.backdrop_path}/></a>
											<h3 key={movies.id}>{movies.title}</h3>
										</div>
									))}
								</div>
							</Col>

							<Col>
								<h1>Series</h1>
								<div className="series-list">
									{this.state.series.map(series => (
										<div className="itemSerie">
											<a href=""><img src="{series.backdrop_path}"/></a>
											<h3 key={series.id}>{series.name}</h3>
										</div>
									))}
								</div>
							</Col>
						</Row>
					</Container>
				</div> //Fim Div Container

			</div> //Fim Div Global
			</html>

		);
	}
}