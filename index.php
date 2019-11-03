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
		<div onclick="rulerStart()">
			<img src="res\img\ruler.svg" alt="ruler">
			<label>Ruler</label>
		</div>
		<div data-menu-option="save" onclick="senerioCreator(this)">
			<img src="res\img\save.svg" alt="save">
			<label>Save</label>
		</div>
	</div>

	<div id="senerioSetting" class="sub-menu">

		<label>Senerio name</label>
		<input id="senerioName" type="text">
		
		<label>Senerio Description</label>
		<textarea id="senerioDesc"></textarea>

		<label>map url</label>
		<input id="mapUrl" type="text">

		<button id="setScale">Set Scale</button>

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
		<div id="team" data-teamid="undefined">
			<input type="text" name="teamName" value="team1">
			<label>Primary Colour:</label>
			<input type="color" name="primaryColour" value="#0054FE">
			<label>Secondary Colour:</label>
			<input type="color" name="secondaryColour" value="#9293FF">
			<label>Highlight Colour:</label>
			<input type="color" name="highlightColour" value="#FFFFFF">
			<label>Team Password:</label>
			<input type='text' name='teamPassword'>
			<img class="cross" onclick="removeTeam(this)" src="res\img\cross.svg">
		</div>
		<div id="team" data-teamid="undefined">
			<input type="text"  name="teamName" value="team2">
			<label>Primary Colour:</label>
			<input type="color" name="primaryColour" value="#FF0800">
			<label>Secondary Colour:</label>
			<input type="color" name="secondaryColour" value="#28AE00">
			<label>Highlight Colour:</label>
			<input type="color" name="highlightColour" value="#FFFFFF">
			<label>Team Password:</label>
			<input type='text' name='teamPassword'>
			<img class="cross" onclick="removeTeam(this)" src="res\img\cross.svg">
		</div>
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

		<label>Visible to:</label>
		<div id="visibilty">
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
		<button id="apply">appy</button>
	</div>

	<div id="mapScale" class="sub-menu">
		<div>
			<input type="text" id="scaleDist">

			<select id="unit" values="paces">
				<option value="paces">Paces</option>
				<option value="miles">Miles</option>
				<option value="feet">Feet</option>
				<option value="yards">yards</option>
				<option value="meters">Meter</option>
				<option value="kilometers">Kilometer</option>
			</select>
			<button>Submit</button>
		</div>
	</div>

<!-- 	<div id="surface">

	</div> -->
	<div id="map">
		<div>
			<img id="map" draggable="false">
		</div>
	</div>

	<!-- scripts -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src="res\script\jquery.mousewheel.js"></script>
	<script type="text/javascript">var scenrioEditor = true</script>
<!-- 	<script type="text/javascript" src="res\script\sha.js"></script> -->
	<script type="text/javascript" src="res\script\map.js"></script>
	<script type="text/javascript" src="res\script\scenarioCreator.js"></script>
	<script type="text/javascript" src="res\script\menu.js"></script>
</body>
</html>