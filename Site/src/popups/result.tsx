import * as React from "react";
import { useAppSelector } from "../app/hooks";
import { Image } from 'react-bootstrap';
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from 'react-router-dom';
import { readStats } from "../app/reducers/stats";
import './result.css';

const Result = () => {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const videos = useAppSelector((state) => state.results.videos);

    function changePage(i : number) {
        const video = videos[i];

        dispatch(readStats(video.id)).then(_ => {
            navigate(`/search`);
        })
    }

    return (
        <div className="videos">
            {
                videos.map((video, i) => {
                    return (<button className="video" onClick={() => changePage(i)}>
                        <div className="image">
                            <Image src={video.thumbnails} roundedCircle fluid />
                        </div>
                        <div className="text">
                            <h2>{video.title.replace("&#39;", "'")} by {video.author}</h2>
                            <h5>{video.description.substring(0,35)}  ...</h5>
                        </div>
                    </button>)
                })
            }
        </div>
    )

}

export default Result;