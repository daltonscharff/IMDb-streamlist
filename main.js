getMovieTitles();

function getMovieTitles(){
	var uncutTitles = document.getElementsByClassName("lister-item-header");
	var years = document.getElementsByClassName("lister-item-year");
	var titles = [];
	var iterator = 0;
	while(uncutTitles[iterator]){
		var start = uncutTitles[iterator].innerHTML.search(">") + 1;
		var end = uncutTitles[iterator].innerHTML.search("</a>");
		titles[iterator] = uncutTitles[iterator].innerHTML.substring(start,end);
		checkNetflix(titles[iterator], years[iterator].innerHTML.substring(0,4), iterator);
		//console.log(titles[iterator] + " : " + years[iterator].innerHTML.substring(0,4));
		iterator++;
	}
}

function checkNetflix(title, year, iterator){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://netflixroulette.net/api/api.php?type=json&title=" + title.replace(/\s/ig, "%20"), true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			var movie = JSON.parse(xmlhttp.responseText);
			if(movie.show_id && movie.release_year == year){
				document.getElementsByClassName("lister-item-header")[iterator].innerHTML += "<span><a href=\"http://www.netflix.com/WiPlayer?movieid=" + movie.show_id + "\" target=\"_blank\" style=\"margin-left: 20px;\"><img style=\"width: 15px;\" src=\"http://i.imgur.com/XfOF49Z.png\"></a></span>";
			}
		}
	};
	xmlhttp.send();
}

/*TODO:
*Add buttons for Hulu and Amazon
*Add buttons for search pages of IMDb
*/

//Hulu:http://i.imgur.com/i3zEJV9.png
//Amazon:http://i.imgur.com/0B4C2Eq.png