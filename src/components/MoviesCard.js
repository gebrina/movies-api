import { useEffect } from 'react';
import './MoviesCard.css';
const MoviesCard = ({movies}) =>{

  
    return <div className="movies-card-container">
         {movies.length>0?movies.map((movie)=>{
           return <div className='movies-card'>
          <div className='movies-card-title'>
            {movie.Title}
          </div>
          <div  className='movies-poster'>
             <img src={movie.Poster} className="movie-poster"/>
          </div>
         
         </div>
         }):<p className='search-result'>No Movies With Z Given Input Search Again!!!</p>}
      </div>
}

export default MoviesCard;