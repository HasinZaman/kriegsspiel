<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="res\css\style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

</head>
<body>
	<div id="menu">
		<div data-menu-option="senerioSetting" onclick="senerioCreator(this)">
			<img src="res\img\senerioInfo.svg" alt="senrior detail">
			<label>Senerio</label>
			
		</div>
		<div data-menu-option="teamSetting" onclick="senerioCreator(this)">
			<img src="res\img\teams.svg" alt="teams">
			<label>Teams</label>
			
		</div>
		<div data-menu-option="placeUnit" onclick="senerioCreator(this)">
			<img src="res\img\placeUnit.svg" alt="place unit">
			<label>Place Unit</label>
		</div>
		<div data-menu-option="save" onclick="senerioCreator(this)">
			<img src="res\img\save.svg" alt="save">
			<label>Save</label>
		</div>
	</div>

	<div id="senerioSetting" class="sub-menu">
		<form>

			<label>Senerio name</label>
			<input type="text">
			
			<label>map url</label>
			<input type="text">

			<label>url</label>
			<div class="url"></div>
			<button>copy</button>

		</form>
	</div>

	<div id="teamSetting" class="sub-menu">

		<div>

		</div>
	</div>


	<div id="surface">

	</div>
	<div id="map">

		<img id="map" style="width:100vw;height: 100vh;">
	</div>
	<script type="text/javascript" src="res\script\scenarioCreator.js"></script>
	<script type="text/javascript" src="res\script\map.js"></script>
	<script type="text/javascript" src="res\script\menu.js"></script>
	<script type="text/javascript">start(prompt(),[])</script>
</body>
</html>