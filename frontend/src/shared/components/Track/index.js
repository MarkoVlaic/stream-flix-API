import React, { useEffect, useRef } from 'react';

import { useFetchReducer, OBJECT_PAYLOAD } from '../../hooks/fetchReducer';
import { API_URL } from '../../constants';
import Loading from '../Loading';
import './track.css';

const Track = ({ id, expanded, displayTitle = false }) => {
  console.log(`track id ${id}`)
  const [state, dispatch] = useFetchReducer(OBJECT_PAYLOAD);

  const { data: details, fetching, error } = state;

  const detailsMapRef = useRef({});
  const detailsMap = detailsMapRef.current; // A map from id to a details object

  console.log(detailsMap);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        dispatch({ type: 'fetch' });
        const response = await fetch(`${API_URL}/track/${id}`);

        if(!response.ok) {
          dispatch({ type: 'error', payload: `Error getting data for track with id: ${id}` });
          return;
        }
        const data = await response.json();
        dispatch({ type: 'success', payload: data });
        detailsMap[id] = data;
      } catch(err) {
        dispatch({ type: 'error', payload: 'There was a network error!' });
      }
    };

    // Fetch the details only the first time we expand this movie
    if(expanded && !detailsMap[id])
      fetchTrack();
    else if(expanded && !!detailsMap[id])
      // Use the cached value
      dispatch({ type: 'success', payload: detailsMap[id] });
  }, [expanded, details, dispatch, id]);

  if(!expanded) {
    return <></>
  }

  if(fetching || !Object.keys(details).length) {
    return <Loading color='white' />;
  }

  if(error) {
    return <p className='loading-error'>{error}</p>
  }

  console.log('track details ', details);
  const { releasedate, subtitleLanguages, audioLanguages, tracktitle } = details;

  const subItems = subtitleLanguages.map((lang, i) => <li key={i}>{lang}</li>);
  const audioItems = audioLanguages.map((lang, i) => <li key={i}>{lang}</li>);


  return (
    <div className={`track-container`}>
      {displayTitle ? <p className='track-title'>{tracktitle}</p> : <></>}
      <p>{`Released ${new Date(releasedate).toLocaleDateString()}`}</p>
      <div className="lang-audio-container">
        <div className="lang-list-container">
          <p className='lang-list-title'>Subtitles</p>
          <ul className='lang-list'>
            {subItems}
          </ul>
        </div>

        <div className="lang-list-container">
          <p className='lang-list-title'>Languages</p>
          <ul className='lang-list'>
            {audioItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Track;