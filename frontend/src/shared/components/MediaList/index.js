import React, { useState, useEffect } from "react";

import { useFetchReducer, ARRAY_PAYLOAD } from "../../hooks/fetchReducer";
import Loading from "../Loading";
import './media-list.css';

const ITEMS_PER_PAGE = 10;

const MediaList = ({ MediaItem, endpoint }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [state, dispatch] = useFetchReducer(ARRAY_PAYLOAD);

  const incrementPage = () => setCurrentPage(p => p + 1);

  useEffect(() => {
    const fetchMedia = async () => {
      dispatch({ type: 'fetch' });
      const offset = currentPage * ITEMS_PER_PAGE;
      
      try {
        const response = await fetch(`${endpoint}?limit=${ITEMS_PER_PAGE}&offset=${offset}`);
        if(!response.ok) {
          dispatch({ type: 'error', payload: 'Unable to fetch more media!' })
          return;
        }

        const data = await response.json();
        dispatch({ type: 'success', payload: data });
      } catch(err) {
        dispatch({ type: 'error', payload: 'There was a network error!'});
      }
    };

    fetchMedia();
  }, [currentPage, dispatch, endpoint]);

  const { data, fetching, error } = state;
  const renderMediaItems = data.map(
    (d, i) => React.cloneElement(MediaItem, { ...d, key: i })
  );

  return (
    <section className="media-section">
      {renderMediaItems}
      { error ? <p className='loading-error'>{error}</p> : <></> }
      {fetching ? <Loading /> : <button type='button' className='button' onClick={() => incrementPage()}>Get more</button>}
    </section>
  );
};

export default MediaList;