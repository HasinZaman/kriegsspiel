<?php

session_start();

$_SESSION["gameToken"] = $_GET["gameToken"];

?>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="res\css\map.css">
</head>
<body class="blur">

	<div id="login" class="sub-menu active">

		<button><a herf="gameSelection.php">Go Back</a></button>

		<label>Select Team</label>

		<label data-team-id='umpire' onclick="teamSelect(this)">umpire</label>
		
	</div>
	<div id="menu" style="top: -100vh">

		<div data-menu-option="senerioInfo" onclick="senerioCreator(this)">
			<img src="res\img\senerioInfo.svg" alt="senrior detail">
			<label>Senerio</label>
			
		</div>


		<div onclick="rulerStart()">
			<img src="res\img\ruler.svg" alt="ruler">
			<label>Ruler</label>
		</div>
		
	</div>

	<div id="senerioInfo" class="sub-menu">

		<h1></h1>
		
		<p></p>
	</div>

	<div id="unitMenu" class="sub-menu" data-unit-id="">


	</div>

	<div id="map">
		<div>
			<img id="map" draggable="false">
		</div>
	</div>

	<!-- scripts -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src="res\script\jquery.mousewheel.js"></script>
	<script type="text/javascript" src="res\script\map.js"></script>
	<script type="text/javascript" src="res\script\game.js"></script>
</body>
</html>