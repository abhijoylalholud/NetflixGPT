import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    //const [trailerId, setTrailerId] = useState(null);

    //fetch trailer video
    const getMovieVideos = async() => {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', API_OPTIONS);
        const json = await data.json();
        //console.log(json);

        const filterData = json.results.filter((video) => video.type === "Trailer");
        //console.log(filterData);
        const trailer = filterData.length == 0 ? filterData[0] : json.results[0]; 
        //console.log(trailer);
        //setTrailerId(trailer.key);
        dispatch(addTrailerVideo(trailer));
    };

    useEffect(() => {
        getMovieVideos();
    }, []);
}

export default useMovieTrailer;