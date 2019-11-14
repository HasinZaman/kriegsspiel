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
	<label id="guide">
		<h2>
			Game Guide
		</h2>
		<div></div>
	</label>
	<label>
		<h2>
			Find Game
		</h2>
		<div></div>
	</label>
	<label>
		<h2>
			Create Scenerio
		</h2>
		<div></div>
	</label>
</nav>

<div id="body">
	<h2>
		update
	</h2>

	<div>

		<h2>
			How to play
		</h2>
		<div>
			dfdsfasdf
		</div>
		<a href="">Read More...</a>
	</div>


	<div>

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

</script>
</body>
</html>