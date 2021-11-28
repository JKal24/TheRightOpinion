import * as React from "react";
import { useAppSelector } from "../app/hooks";
import './search.css';

const Result = () => {
    
    const videos = useAppSelector((state) => state.results.videos);

    return (
        <div className="videos">
            {
                videos.map((video, i) => {
                    <div className="video">
                        <div>{video.thumbnailUrl}</div>
                        <div>
                            <h2>{video.title} by {video.author}</h2>
                            <h5>{video.description}</h5>
                        </div>
                    </div>
                })
            }
        </div>
    )

}

export default Result;