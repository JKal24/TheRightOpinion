import * as React from "react";
import { useAppSelector } from "../app/hooks";
import { Image } from "react-bootstrap";

const Search = () => {

  const stats = useAppSelector((state) => state.stats);

  return (
    <div className="Search">
      <div className="header">
        <Image className="title" src={stats.thumbnailUrl} roundedCircle fluid />

        <h2 className="title">{stats.videoName} by {stats.author}</h2>
      </div>
          
      <h3>{stats.description}</h3>

      <div className="stats">
        <div className="count">
          <h4>Views: {stats.viewCount}</h4>
          <h4>Likes: {stats.upvoteCount}</h4>
          <div className="dislikes">
            <h2>Dislikes: </h2>
            <button>{stats.dislikes}</button>
          </div>
        </div>
        
        <div className="sentiment">
          <h4>Video Like per View Sentiment: {((stats.upvoteCount / stats.viewCount) * 100).toFixed(0)}%</h4>
          <h4>Recent Channel Like per View Sentiment: {(stats.sentiment * 100).toFixed(0)}%</h4>
        </div>

        
      </div>
    </div>
  );
};

export default Search;
