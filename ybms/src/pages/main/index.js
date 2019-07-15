import React, { Component } from "react";
import api from "../../services/api";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import "./styles.css";


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
		//Com isso, nao é necessario usar o this.state. Direto no 'movies' ou 'series'
		this.setState({movies: responseMovie.data.results});
		this.setState({series: responseSerie.data.results});
	}

	render(){

		//Necessário fazer a chamada dos vetores no render pra utilizar
		const {movies} = this.state;
		const {series} = this.state;

		return (
			<html>


			<div> 

				<div> 
					<Carousel>

						<Carousel.Item>
						 <img
						 	keyFav="{movies.id}"
						   className="d-block w-100"
						   src={`https://image.tmdb.org/t/p/w154/${movies.poster_path}`}
						   alt="First slide"
						 />
						<Carousel.Caption>
						   <h3>Top 1 Movie</h3>
						   <p>{}</p>
							</Carousel.Caption>
						</Carousel.Item>
						
						
						<Carousel.Item>
						 <img
						 	keyFav="{series.id}"
						   className="d-block w-100"
						   src={`https://image.tmdb.org/t/p/w154/${series.poster_path}`}
						   alt="Second slide"
						 />
							<Carousel.Caption>
						   <h3>Top 1 Serie</h3>
						   <p>{}</p>
						 </Carousel.Caption>
						</Carousel.Item>
						
					</Carousel>
				</div> 

				<button>Serie</button>
				<button>Movies</button>


				<div> 
					<Container>
						<Row>
							<Col>

								<h1 className="movies-title">MOVIES</h1>
								<div className="movies-list">
									{movies.map(movies => (

										<div key="{movies.id}" className="movies-item">
										<article>
											<img src={`https://image.tmdb.org/t/p/w154/${movies.poster_path}`}/>
											<h3>{movies.title}</h3>
											<a href="">Details</a>
										</article>
										</div>

									))}
								</div>

							</Col>

							<Col>
								<h1>Series</h1>
								<div className="series-list">
									{series.map(series => (

										<div key="{series.id}" className="series-item">
										<article>
											<img src={`https://image.tmdb.org/t/p/w154/${series.poster_path}`}/>
											<h3 >{series.name}</h3>
											<a href="">Details</a>
										</article>
										</div>

									))}
								</div>
							</Col>
						</Row>
					</Container>
				</div> 

			</div>
			</html>

		);
	}
}