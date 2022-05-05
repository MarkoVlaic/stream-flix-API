select movie.trackid, prevmovie.trackid as prevmovieid, tracktitle as title, duration, trackrating as rating,
(
	select nextmovie.trackid from
	movie as nextmovie join movie as prevmovie on nextmovie.prevmovieid = prevmovie.trackid
	where prevmovie.trackid = movie.trackid 
) as nextmovieid
from 
	movie join track on movie.trackid = track.trackid
	left outer join movie as prevmovie on movie.prevmovieid = prevmovie.trackid
order by tracktitle
limit $1
offset $2;