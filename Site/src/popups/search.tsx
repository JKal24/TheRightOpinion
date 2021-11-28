import * as React from "react";
import { useAppSelector } from "../app/hooks";
import { Image, Button } from "react-bootstrap";
import { BsFillHandThumbsDownFill, BsFillHandThumbsUpFill } from 'react-icons/bs';
import { changeDislike } from "../app/reducers/stats";
import { useAppDispatch } from "../app/hooks";

const Search = () => {

  const dispatch = useAppDispatch()
  const stats = useAppSelector((state) => state.stats);

  async function handleDislike() {

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async tabs => {
      const id = stats.videoID;
      let tabUrl = tabs[0].url || `https://www.youtube.com/watch?v=${id}`;

      if (tabUrl) {

        chrome.cookies.get({ "name": "isDisliked", "url": tabUrl }, async function getCookie(cookie) {

          if (!cookie && tabUrl) {
            const isDisliked = "n";
            chrome.cookies.set({ "name": "isDisliked", "url": tabUrl, "value": isDisliked });
            
            await dispatch(changeDislike({ id, isDisliked }));
          } else if (tabUrl && cookie) {

            let isDisliked: string = cookie!.value;
            chrome.cookies.remove({ "name": "isDisliked", "url": tabUrl });

            isDisliked = isDisliked == 'y' ? 'n' : 'y';
            chrome.cookies.set({ "name": "isDisliked", "url": tabUrl, "value": isDisliked });

            await dispatch(changeDislike({ id, isDisliked }));
          }

        })

      }
    })
  }

  return (
    <div className="search">
      <div className="header">
        <Image className="title" src={stats.thumbnailUrl} roundedCircle fluid />

        <h2 className="title">{stats.videoName} by {stats.author}</h2>
      </div>

      <h3 className="description">{stats.description}</h3>

      <div className="stats">
        <div className="count">
          <h4>{stats.viewCount} Views</h4>
          <div className="likes">
            <BsFillHandThumbsUpFill />
            <div>{stats.upvoteCount}</div>
          </div>
          <Button className="dislikes" onClick={handleDislike}>
            <BsFillHandThumbsDownFill />
            <div>{stats.dislikes}</div>
          </Button>
        </div>

        <div className="sentiment">
          <h4>Video Likeability: {((stats.upvoteCount / stats.viewCount) * 100).toFixed(0)}%</h4>
          <h4>Recent Channel Likeability: {(stats.sentiment * 100).toFixed(0)}%</h4>
        </div>
      </div>
    </div>
  );
};

export default Search;
