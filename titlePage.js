if(document.URL.includes("/title")){
	getMovieTitle();
}

function getMovieTitle(){
	var uncutTitle = document.getElementsByClassName("title_wrapper");
	var start = uncutTitle[0].innerHTML.search(">") + 1;
	var end = uncutTitle[0].innerHTML.search("&nbsp");
	var title = uncutTitle[0].innerHTML.substring(start,end);
	var year = "Error";
	if(document.getElementById("titleYear") != null){
		var uncutYear = document.getElementById("titleYear").innerHTML;
		start = uncutYear.search(">") + 1;
		end = uncutYear.search("</a>");
		year = uncutYear.substring(start,end);
	}else{
		var uncutYear = document.getElementsByClassName("imdbRatingPlugin");
		start = uncutYear[0].innerHTML.search("\\(") + 1;
		year = uncutYear[0].innerHTML.substring(start,start+4);
	}
	//console.log("title: " + title + " year: " + year);
	checkNetflix(title, year);
}

function checkNetflix(title, year){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://netflixroulette.net/api/api.php?type=json&title=" + title.replace(/\s/ig, "%20"), true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			var movie = JSON.parse(xmlhttp.responseText);
			if(movie.show_id && movie.release_year == year){
				var beginning = document.getElementsByClassName("showtime full-table")[0].innerHTML.substring(0, document.getElementsByClassName("showtime full-table")[0].innerHTML.search("</script>") + 9);
				var end = document.getElementsByClassName("showtime full-table")[0].innerHTML.substring(document.getElementsByClassName("showtime full-table")[0].innerHTML.search("</script>") + 9);
				var middle = "<style>.secondary-watch-option:hover{ background-color: #136cb2 !important; cursor: pointer !important; }</style>" +
				"<div title=\"On Netflix\" class=\"watch-option secondary-watch-option \" onmouseover=\"document.getElementById('imageToSwap').src = 'http://i.imgur.com/XMwGxNE.png'\" onmouseout=\"document.getElementById('imageToSwap').src = 'http://i.imgur.com/lWa53ao.png'\" onclick=\"window.open('http://www.netflix.com/WiPlayer?movieid=" + movie.show_id + "')\"><div><img id=\"imageToSwap\" src= \"http://i.imgur.com/lWa53ao.png\" style=\"height: 30px;\"></div><div class=\"secondary-info\">ON&nbsp;NETFLIX</div></div>";
				document.getElementsByClassName("showtime full-table")[0].innerHTML = beginning + middle + end;
			}
		}
	};
	xmlhttp.send();
}

function swapImg(){
	console.log(document.getElementById("imageToSwap").src);
	document.getElementById("imageToSwap").src = url;
}