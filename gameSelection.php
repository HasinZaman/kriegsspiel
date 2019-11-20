<!DOCTYPE html>
<html>
<head>
	<title>Kreigsspeil</title>
	<link rel="stylesheet" type="text/css" href="res\css\styles.css">
</head>
<body>

<div id="baner">
	<div class="backgroundImage"></div>
	<div id="filter"></div>
	<div id="description">
		<h1>
			Find A game
		</h1>

		<div class="quote">
				“Thus we may know that there are five essentials for victory:
				<ol>
					<li>
						He will win who knows when to fight and when not to fight.
					</li>
					<li>
						He will win who knows how to handle both superior and inferior forces.
					</li>
					<li>
						He will win whose army is animated by the same spirit throughout all its ranks.
					</li>
					<li>
						He will win who, prepared himself, waits to take the enemy unprepared.
					</li>
					<li>
						He will win who has military capacity and is not interfered with by the sovereign."
					</li>
				</ol>
			<label>-Sun Tzu</label>
		</div>
	</div>
</div>
<nav id="menu">
	<label id="update">
		<a href="index.php">
			<h2>
				Update
			</h2>
			<div></div>
		</a>
	</label>
	<label id="guide">
		<a href="guide.php">
			<h2>
				Game Guide
			</h2>
			<div></div>
		</a>
	</label>
	<label>
		<a href="gameSelection.php">
			<h2>
				Find Game
			</h2>
			<div></div>
		</a>
	</label>
	<label>
		<a href="scenarioCreator.php">
			<h2>
				Create Scenerio
			</h2>
			<div></div>
		</a>
	</label>
</nav>


<div id="gameSearch" class="body">
	<nav>
		<label>Filter:</label>
		<input type="text" name="filter">
		<button>Join</button>
	</nav>
	<div id="games">
		<div>
			<label id="name">Name</label>
			<label id="description">Description</label>
			<label id="teams">Teams</label>
		</div>
	</div>
	<div>
		<div>
			<input id="page" type="text" value="1"> of <div id="number"></div><button onclick="pageChange()">Go</button><br>
		</div>
		<div>
			<button onclick="previousPage()">Back</button>
			<button onclick="nextPage()">next</button>
		</div>
	</div>


</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript">

backGroundNum = 2;

$(".backgroundImage").css("background-image","url(res/img/bgImg"+backGroundNum+".png)")

setInterval(function(){

	backGroundNum+=1
	if(backGroundNum > 3){
		backGroundNum=1
	}
	$(".backgroundImage").css("background-image","url(res/img/bgImg"+backGroundNum+".png)")
},1000*6)

var lastPage = null;
var currentPage = 1

//gets list of games
function gameQuery(currentPage){
	$.ajax({
		url: "res/script/post.php",
		type: "POST",
		data: {
			method:"gameQuery",
			page: currentPage-1
		}
	}).done(function(reciver){
		let temp = JSON.parse(reciver)
		$("#games > div:not(:first)").remove()
		for (let i1 = 0; i1 < temp.length; i1++){
			$("#games").append("<div><label id=\"name\">"+temp[i1]["gameInfo"]["scenarioTitle"]+"</label><label id=\"description\">"+temp[i1]["gameInfo"]["scenarioDesc"]+"</label>			<label id=\"teams\">"+temp[i1]["teamInfo"].join(", ")+"</label><a href='game.php?gameToken="+temp[i1]["gameId"]+"'><button>Join</button></a></div>")

		}
	})	
}

//loads query on page load
function pageLoad(){
	$.ajax({
		url: "res/script/post.php",
		type: "POST",
		data: {
			method:"gameQueryNum"
		}
	}).done(function(reciver){
		lastPage = Math.ceil(parseInt(reciver)/10);
		$("#number").text(lastPage)
		console.log(lastPage)
	})
	gameQuery(currentPage)
}

//go gets query based on page input feild
function pageChange(page){
	try{
		if (page == null){
			currentPageTemp = parseInt($("input#page").val())	
		}else{
			currentPageTemp = page
		}
		
		console.log(parseInt($("input#page").val()))
		if (currentPageTemp >= 1 && currentPageTemp <= lastPage && currentPageTemp != currentPage){
			currentPage = currentPageTemp

			gameQuery(currentPage)

		}
	}catch(e){
		console.log(e)
	}

}
//gets the next page
function nextPage(){
	if(currentPage+1<=lastPage){
		currentPage+=1;
		$("input#page").val(currentPage)
		gameQuery(currentPage)
	}
}
//gets the previous page
function previousPage(){
	if(currentPage-1>0){
		currentPage-=1;
		$("input#page").val(currentPage)
		gameQuery(currentPage)
	}

}



pageLoad()
</script>
</body>
</html>