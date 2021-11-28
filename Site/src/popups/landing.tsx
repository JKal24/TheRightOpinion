import * as React from "react";
import { readStats } from '../app/reducers/stats';
import { readVideos } from "../app/reducers/search";
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi"
import './popups.css';
import { useAppDispatch } from "../app/hooks";

const Landing = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [text, setText] = React.useState('');
  const [hasPage, setHasPage] = React.useState(true);

  React.useEffect(() => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      const url = tabs[0].url;
      let youtubeUrl = new RegExp(".*youtube.com.*v=.*");
        
      if (url && youtubeUrl.test(url)) {

        // If it matched the previous regex, it will match this one as well.
        let id = url?.match("v=[^(\?|&)]*")![0];
        id = id?.slice(2, id.length)!;
        dispatch(readStats(id)).then(_ => {
          navigate(`/search`);
        })

      } else {
        setHasPage(false);
        
      }
    })
    
  }, []);

  function updateText(e : React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    setText(e.currentTarget.value);
  }

  function isEnter(e : React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      searchText();
    }
  }

  function searchText() {
    dispatch(readVideos(text)).then(_ => {
      navigate(`/results`);
    })
  }

  return (
    <div className="landing">
      <div className="search-bar">
        <input type="text" className="SearchText" onChange={updateText} onKeyDown={isEnter}></input>
        <button className="Search" onClick={searchText}><FiSearch/></button>
      </div>
      {
        hasPage ? (
          <h4 className="info">
            Searching your current page...
          </h4>
        ) : (
          <h2 className="info">
            Not on a youtube video page, feel free to search for a video using an ID.
          </h2>
        )
      }
      
    </div>
  );
};

export default Landing;
