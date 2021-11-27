import * as React from "react";
import { useDispatch } from 'react-redux';
import { readStats } from '../reducers/stats';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi"
import './popups.css';

const Landing = () => {

  const dispatch = useDispatch();
  const [hasPage, setHasPage] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {

      const url = tabs[0].url;
      let youtubeUrl = new RegExp(".*youtube.com.*v=.*");
        
      if (url && youtubeUrl.test(url)) {

        // If it matched the previous regex, it will match this one as well.
        console.log(url);
        let id = url?.match("v=[^\?]*")![0];
        id = id?.slice(2, id.length)!;
        dispatch(readStats(id));
        navigate(`/search`);

      } else {
        setHasPage(false);
        
      }
    })
    
  }, []);

  return (
    <div className="Landing">
      <input type="text" className="SearchText"></input>
      <button className="Search"><FiSearch/></button>
      {
        hasPage ? (
          <div>
            Searching your current page...
          </div>
        ) : (
          <div>
            Not on a youtube video page, feel free to search for a video using an ID.
          </div>
        )
      }
      
    </div>
  );
};

export default Landing;
