select showtitle as title, show.showid as id, showrating as rating, count(distinct seasonno) as numberSeasons from 
	show join showep on show.showid = showep.showid
group by show.showid
order by showtitle
limit $1
offset $2;