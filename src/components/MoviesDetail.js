import {useState,useEffect} from 'react';
import './MoviesDetail.css';
import mdetail from '../assets/images/mdetail.jfif';
import back from '../assets/images/back.png';
import axios from 'axios';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import {motion} from 'framer-motion';
import awards from '../assets/images/awards.png'
const MoviesDetail = (props) =>{
  const [detailData,setDetailData] = useState({});
   const [isLoaded,setIsloaded] = useState(false);
   const [actors,setActors] = useState([]);
   const  [rating,setRating]=useState(0);
   const getMoviesData = async () =>{
    try {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=f92078e&i=${props.movieData.imdbID}`);
    setDetailData(response.data);
    setActors(response.data.Actors.split(','));
     setRating(parseFloat(response.data.imdbRating))
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
   return <motion.div animate={{rotate:0}} transition={{type:'tween',duration:1}} initial={{rotate:360}} style={{
     backgroundImage:`url(${mdetail})`,
     backgroundSize:'cover',
     backgroundPosition:'center',
     height:'100vh'
   }} className='movies-detail'>
     <button onClick={()=>{
       props.toggleMovieDetail();
     }} className='back-btn'>
       <img  src={back}/>
     </button> 
     <h1 className='detail-movie-title'>{props.movieData.Title}</h1>
          
         <div className='movie-container'>
           <div className='movie-info'
          >
            <div className='actor-poster'>
              <ul><h1 className='actor-title'>Actors</h1>
               {actors.length>0?actors.map((actor,index)=>{
                 return <li className='actor' key={index}>{actor}</li>
               }):""}
            <Rater
            total={10}
            interactive={false}
            rating={rating}
            
  />
  
               
              </ul>
               <div className='awards-sectio'>
               <motion.img animate={{opacity:1}} initial={{opacity:0}} className='' src={props.movieData.Poster}/>
               <p className='awards'>
                 <motion.img
                 
                animate={{scale:2,rotate:[0,60,120,180,240,300,360]}}
                 transition={{type:'tween',duration:1,repeat:Infinity}}
               className='award-img'  src={awards}/>
               {detailData.Awards}
               </p>
               </div>
            </div>
           
           </div>
           <motion.div animate={{rotate:0}} initial={{rotateX:360}} className='movies-description'>
              {detailData.Plot}
           </motion.div>
         </div>
   </motion.div>
}

export default MoviesDetail;