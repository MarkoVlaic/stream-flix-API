import React from "react";

import { API_URL } from "../shared/constants";
import MediaList from "../shared/components/MediaList";
import Movie from "./Movie";

const Movies = () => {
  return (
    <MediaList 
      MediaItem={<Movie />}
      endpoint={`${API_URL}/movie`}
    />
  );
};

export default Movies;