import React from "react";

import MediaList from "../shared/components/MediaList";
import Show from "./Show";
import { API_URL } from "../shared/constants";

const Shows = () => {
  return (
    <MediaList 
      MediaItem={<Show endpoint={`${API_URL}/show`} />}
      endpoint={`${API_URL}/show`}
    />
  );
};

export default Shows;