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

		<label>Select Team</label>

		<label data-team-id='umpire' onclick="teamSelect(this)">umpire</label>
		
	</div>
	<div id="menu" style="top: -100vh">

		<div data-menu-option="senerioInfo" onclick="senerioCreator(this)">
			<img src="res\img\senerioInfo.svg" alt="senrior detail">
			<label>Senerio</label>
			
		</div>
	</div>

	<div id="senerioInfo" class="sub-menu">

		<h1></h1>
		
		<p></p>
	</div>

	<div id="unitMenu" class="sub-menu" data-unit-id="">
		<div>
			<div id="rotateUnit">
				<img src="res\img\rotate.svg" alt="rotate unit symbol">
				Rotate
			</div>
			<div id="moveUnit">
				<img  src="res\img\move.svg" alt="move unit symbol">
				Move
			</div>
			<div id="deleteUnit">
				<img  src="res\img\cross.svg" alt="move unit symbol">
				Delete
			</div>
		</div>
		<div>
			<label>Id:</label>
			<input id="unitId" class="url" readonly type="text">
		</div>
		
		<label>Team:</label>
		<div id="teams">
		</div>

		<div>
			<label>
				Unit Type
			</label>
			<div id="unitType">
				<option value="zug">Zug</option>
				<option value="company">Company</option>
				<option value="hBattalion">Half Battalion</option>
			</div>
		</div>
		<div>
			<label>Points</label>
			<input id="unitPoint" type="text" name="points">
		</div>
		<button id="apply">appy</button>
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