import {useState,useEffect} from 'react';
import './MoviesDetail.css';
import mdetail from '../assets/images/mdetail.jfif';
import back from '../assets/images/back.png';
import axios from 'axios';
const MoviesDetail = (props) =>{
  const [detailData,setDetailData] = useState({});
   const [isLoaded,setIsloaded] = useState(false);
  const getMoviesData = async () =>{
    try {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=f92078e&i=${props.movieData.imdbID}`);
    setDetailData(response.data);
    setIsloaded(true)  
  } catch(e) {
     setIsloaded(false)
    }
  }
  useEffect(()=>{
    const getData= async ()=>{
      await getMoviesData();
    }
    getData();
  },[])
   return <div style={{
     backgroundImage:`url(${mdetail})`,
     backgroundSize:'cover',
     backgroundPosition:'center',
     height:'100vh'
   }} className='movies-detail'>
     <button onClick={()=>{
       props.toggleMovieDetail();
     }} className='back-btn'>
       <img src={back}/>
     </button> 
     <h1 className='detail-movie-title'>{props.movieData.Title}</h1>
          
         <div className='movie-container'>
           <div
          >
            <img className='movies-poster' src={props.movieData.Poster}/>
           </div>
           <div className='movies-description'>
              {detailData.Plot}
           </div>
         </div>
   </div>
}

export default MoviesDetail;