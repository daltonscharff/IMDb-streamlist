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
				var style = document.createElement('STYLE');
				style.type = "text/css";
				var css = '.secondary-watch-option:hover{ background-color: #136cb2 !important;}';
				if(style.styleSheet){
					style.styleSheet.cssText = css;
				}
				else{
					style.appendChild(document.createTextNode(css));
				}
				var head = document.getElementsByTagName('head')[0] ;
				head.appendChild(style);
				
				var bigDiv = document.createElement('DIV');
				bigDiv.id = "bigDiv";
				bigDiv.title = "On Netflix";
				bigDiv.style.backgroundColor = "#555555 !important;"
				bigDiv.className = "watch-option secondary-watch-option";
				bigDiv.onmouseover = function(){document.getElementById('imageToSwap').src = chrome.extension.getURL("icons/netflix_white.png"); document.getElementById('bigDiv').backgroundColor = "#136cb2 !important"; document.getElementById('bigDiv').style.cursor = "pointer";};
				bigDiv.onmouseout = function(){document.getElementById('imageToSwap').src = chrome.extension.getURL("icons/netflix_blue.png"); document.getElementById('bigDiv').color = "#eeeeee"; document.getElementById('bigDiv').style.cursor = "default";};
				bigDiv.onclick = function(){window.open('http://www.netflix.com/WiPlayer?movieid=' + movie.show_id);};
				var littleDiv1 = document.createElement('DIV');
				var img = document.createElement('IMG');
				img.id = "imageToSwap";
				img.src = chrome.extension.getURL("icons/netflix_blue.png");
				img.style.height = "30px";
				var littleDiv2 = document.createElement('DIV');
				littleDiv2.className = "secondary-info";
				var text1 = document.createTextNode("NETFLIX");
				littleDiv2.appendChild(text1);
				littleDiv1.appendChild(img);
				bigDiv.appendChild(littleDiv1);
				bigDiv.appendChild(littleDiv2);
				document.getElementsByClassName("showtime full-table")[0].appendChild(bigDiv);
			}
		}
	};
	xmlhttp.send();
}

function swapImg(){
	console.log(document.getElementById("imageToSwap").src);
	document.getElementById("imageToSwap").src = url;
}