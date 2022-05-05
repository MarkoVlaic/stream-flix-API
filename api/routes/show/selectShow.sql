select trackid, seasonno, episodeno from
	show join showep on show.showid = showep.showid
where showep.showid = $1;