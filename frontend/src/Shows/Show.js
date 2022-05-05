import React, { useState, useEffect } from 'react';

import { useFetchReducer, OBJECT_PAYLOAD } from '../shared/hooks/fetchReducer';
import Track from '../shared/components/Track';
import './shows.css';
import Loading from '../shared/components/Loading';

const ShowNavigation = ({ seasons, selectedSeason, setSelectedSeason, selectedEpisode, setSelectedEpisode }) => {
  if(!seasons)
    return <></>
  
  const seasonItems = seasons.map(season => {
    const onClick = () => {
      setSelectedSeason(season);
      let minEpisode = season.episodes[0];

      for(let episode of season.episodes) {
        if(episode.number < minEpisode.number)
          minEpisode = episode;
      }

      setSelectedEpisode(minEpisode);
    };

    const { number } = season;
    const className = `season-item ${number === selectedSeason.number ? 'season-item-selected' : ''}`;

    return (
      <li 
        className={className}
        onClick={onClick}
      >
        {`Season ${number}`}
      </li>
    );
  });

  selectedSeason.episodes.sort((e1, e2) => e1.number - e2.number);
  const episodeItems = selectedSeason.episodes.map(({ number }) => <option value={number}>{`Episode ${number}`}</option> );

  const selectEpisode = e => {
    const episode = selectedSeason.episodes.find(({ number }) => number == e.target.value);
    setSelectedEpisode(episode);
  };

  return (
    <nav className='show-nav'>
      <ul className='season-list'>{seasonItems}</ul>
      <select className='episode-select' onChange={selectEpisode} value={selectedEpisode.number} >
        {episodeItems}
      </select>
    </nav>
  );
};

const formatRating = rating => {
  return rating ? `Rating: ${rating}` : 'No rating yet';
}

const Show = ({ id, title, numberseasons, rating, endpoint }) => {
  const [expanded, setExpanded] = useState(false);
  const [state, dispatch] = useFetchReducer(OBJECT_PAYLOAD);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  
  const { data: showData, fetching, error } = state;

  const showDataFetched = !!Object.entries(showData).length;

  useEffect(() => {
    const fetchShow = async () => {
      try {
        dispatch({ type: 'fetch' });
        const response = await fetch(`${endpoint}/${id}`);

        if(!response.ok) {
          dispatch({ type: 'error', payload: `Error getting data for show with id: ${id}` });
          return;
        }

        const data = await response.json();
        dispatch({ type: 'success', payload: data });

        let minSeason = null;
        let minEpisode = null;

        for(let season of data.seasons) {
          if(!minSeason || season.number < minSeason.number)
            minSeason = season;
        }

        for(let episode of minSeason.episodes) {
          if(!minEpisode || episode.number < minEpisode.number)
            minEpisode = episode;
        }

        setSelectedSeason(minSeason);
        setSelectedEpisode(minEpisode);

      } catch(e) {
        dispatch({ type: 'error', payload: 'There was a network error!' });
      }
    };

    if(expanded && !showDataFetched)
      fetchShow();
  }, [expanded, showDataFetched, dispatch, endpoint, id]);

  console.log(selectedSeason);
  console.log(selectedEpisode)

  return (
    <div className='show-container'>
      <p className="show-title">{title}</p>
      <div className="show-basic-info">
        <p className="show-duration">{`Seasons: ${numberseasons}`}</p>
        <div className="show-rating">{formatRating(rating)}</div>
      </div>
      
      { fetching && !showDataFetched ? <Loading color='white' /> : <></> }
      { !!error ?  <p className='loading-error'>{error}</p> : <></>}
      { 
        showDataFetched ?
          <>
            <ShowNavigation
              seasons={showData.seasons}
              selectedSeason={selectedSeason}
              setSelectedSeason={setSelectedSeason}
              selectedEpisode={selectedEpisode}
              setSelectedEpisode={setSelectedEpisode}
            />
            <Track id={selectedEpisode.trackId} expanded displayTitle /> 
          </> 
          : <></>
      }

      <p 
        className={`show-caret ${expanded ? 'show-caret-expanded' : ''}`}
        onClick={() => setExpanded(e => !e)}
      >
        {'>'}
      </p>
    </div>
  );
};

export default Show;