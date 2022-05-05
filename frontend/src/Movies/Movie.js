import React, { useState } from 'react';

import Track from '../shared/components/Track';
import './movies.css';

const formatDuration = ({ hours = '00', minutes = '00' }) => {
  return `Duration: ${hours}:${minutes}`;
};

const formatRating = rating => {
  return rating ? `Rating: ${rating}` : 'No rating yet';
}


const Movie = ({ trackid, title, duration, rating }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='movie-container'>
      <p className="movie-title">{title}</p>
      <div className="movie-basic-info">
        <p className="movie-duration">{formatDuration(duration)}</p>
        <div className="movie-rating">{formatRating(rating)}</div>
      </div>
      
      <Track id={trackid} expanded={expanded} />

      <p
        onClick={() => setExpanded(e => !e)}
        className={`movie-caret ${expanded ? 'movie-caret-expanded' : ''}`}
      >
        {'>'}
      </p>
    </div>
  );
};

export default Movie;