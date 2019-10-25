<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="res\css\style.css">
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

		<label>Senerio name</label>
		<input id="senerioName" type="text">
		
		<label>map url</label>
		<input id="mapUrl" type="text">

		<label>url</label>
		<div>
			<input class="url" readonly type="text">
			<button onclick="

				$('.url').focus();
				$('.url').select();
				document.execCommand('copy');
				alert('the game url has been coppied');
				">
  				copy
  			</button>
		</div>
	</div>

	<div id="teamSetting" class="sub-menu">

		<div>
			teams
			<button onclick="makeTeam()">add Team</button>
		</div>
		<div id="team" data-teamid="0">
			<input type="text" value="team1">
			<label>Primary Colour:</label>
			<input type="color" name="primaryColour" value="#0054FE" '="">
			<label>Secondary Colour:</label>
			<input type="color" name="secondaryColour" value="#9293FF">
			<label>Highlight Colour:</label>
			<input type="color" name="secondaryColour" value="#FFFFFF">
			<img class="cross" onclick="removeTeam(this)" src="res\img\cross.svg">
		</div>
		<div id="team" data-teamid="1">
			<input type="text" value="team2">
			<label>Primary Colour:</label>
			<input type="color" name="primaryColour" value="#FF0800" '="">
			<label>Secondary Colour:</label>
			<input type="color" name="secondaryColour" value="#28AE00">
			<label>Highlight Colour:</label>
			<input type="color" name="secondaryColour" value="#FFFFFF">
			<img class="cross" onclick="removeTeam(this)" src="res\img\cross.svg">
		</div>
	</div>
	<div id="unitMenu" class="sub-menu" data-unit-id="">
		<div>
			<div id="rotateUnit">
				<img src="res\img\rotate.svg" alt="rotate unit symbol">
				<div>
					Rotate
				</div>
			</div>
			<div id="moveUnit">
				<img  src="res\img\move.svg" alt="move unit symbol">
				<div>
					Move
				</div>
			</div>
		</div>
		<div>
			<label>Id:</label>
			<input id="unitId" class="url" readonly type="text">
		</div>
		<div>
			<label>
				Unit Type
			</label>
			<select id="unitType">
				<option value="zug">Zug</option>
				<option value="company">Company</option>
				<option value="hBattalion">Half Battalion</option>
			</select>
			<label>
				Light:
			</label>
			<input id="lightUnit" type="checkbox">
		</div>
		<div>
			<label>Points</label>
			<input id="unitPoint" type="text" name="points">
		</div>
		<button>appy</button>
	</div>

<!-- 	<div id="surface">

	</div> -->
	<div id="map">
		<div>
			<img id="map">
		</div>
	</div>

	<!-- scripts -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src="res\script\scenarioCreator.js"></script>
	<script type="text/javascript" src="res\script\map.js"></script>
	<script type="text/javascript" src="res\script\menu.js"></script>
</body>
</html>