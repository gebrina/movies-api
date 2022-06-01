import './App.css';
import loupe from './assets/images/loupe.png';
import MoviesDetail from './components/MoviesDetail';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import moviebg from './assets/images/197-1975100_hollywood-movie-poster-background.jpg'
const App = ()=>{
   const [search,setSearch] = useState('');
   const [moviesData,setMoviesData] = useState([]);
   const [showMoviesDetail,setShowMoviesDetail] = useState(false);
   const [movieDetailData,setMovieDetailData] = useState({});
   const [isScrolled,setIsScrolled] = useState(false);
   
   const toggleMovieDetail = ()=>{
     setShowMoviesDetail(!showMoviesDetail);
   }
   const getMoviesData = async ()=>{
     if(search?.length >0){
      try {
        const response = await axios.get(`${process.env.REACT_APP_MOVIES_URL}${search}`);
        setMoviesData(response.data.Search);
         } catch(e) {
           console.log(e)
         }
     }else{
      try {
        const response = await axios.get(`${process.env.REACT_APP_MOVIES_URL}${'best'}`);
        setMoviesData(response.data.Search);
         } catch(e) {
           console.log(e)
         }
     }
   }
    useEffect(()=>{
      window.addEventListener('scroll',()=>{
       if(window.scrollY>100){
        setIsScrolled(!isScrolled);
       }
      })
     const getMovies = async ()=>{
       await getMoviesData();
     }

      getMovies();
   },[])
  const searchMovies =async (e)=>{
     e.preventDefault();
     await getMoviesData();
     
  }
  return <>
     {showMoviesDetail?<MoviesDetail movieData={movieDetailData} toggleMovieDetail={toggleMovieDetail}/>
     :<div className='container' style={{backgroundImage:`url(${moviebg})`}}>
    <div className='movies-container'>
   <div id="movie-header"  
   className='movies-header'>
     <h1 className='title'>Movies</h1>
     <form onSubmit={searchMovies}>
      <input type={'text'} 
       onChange={(e)=>setSearch(e.target.value)}
      placeholder="Type here.." className='search-input'/>
     <button className='search-btn' type='submit'><img className='search-icon'  src={loupe}/></button>
     </form>
   </div>
   <div className='movies-body'>
   
     {moviesData?.length>0?moviesData.map((movie,index)=>{
     return <motion.div animate={{x:0,y:0}} 
      transition={{duration:1,type:'tween'}} 
       initial={{x:index%2==0?-200:200,y:isScrolled?50:-50}} key={index} onClick={()=>{
       setShowMoviesDetail(true);
       setMovieDetailData(movie)
     }} className='movies-card'>
                <div className='movies-title'>
                  <p className='movie-title'>{movie.Title}</p>
                  <img alt={movie.Title} className='movie-poster'  src={movie.Poster}/>
                </div>
        </motion.div>
   }):<p>No match Found</p>}
     
   </div>
  </div>
  </div>}
     </>
}

export default App;