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
			What is Kreigsspeil
		</h1>

		<p>
			German for "war game"; Kreigsspeil is a wargame created in 1812 Prussia by Noblemen Reisswitz Sr. and Military officer Reisswitz Jr. The war game was played by both hobbists and military tactians.
		</p>
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

<div id="body">
	<h2>
		update
	</h2>

	<article>
		<h2>
			Open Beta
		</h2>

		<p>
			Kreigsspeil is finally at point where it is playable. However, many bugs and issues are still haven't been found. It is highly appreciated if any and all bugs can be <a href="https://forms.gle/TSZarv7EmzzDoXtG9">reported</a>

		</p>
	</article>
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

</script>
</body>
</html>