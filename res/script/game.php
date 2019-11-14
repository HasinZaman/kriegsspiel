<?php 
//load dependencies
session_start();


//----------   Game setup   ----------

// Saves scenerio creator info into sql database

function gameSetup(){

	
	$gameInfoRaw = $_POST["gameInfo"];
	$gameId = $_POST["gameId"];

	$teamsRaw = $_POST["teamsInfo"];
	$unitsRaw = $_POST["unitsInfo"];

	//hashs all the passwords

	//hashs team passwords
	for ($i1 = 0; $i1 < sizeof($teamsRaw); $i1++) {
		if($teamsRaw[$i1]["password"] !== ""){
			$teamsRaw[$i1]["password"] = PasswordStorage::create_hash($teamsRaw[$i1]["password"]);
		}
	}

	//hashes the umpire password
	if($gameInfoRaw["umpirePassword"] !== ""){
			$gameInfoRaw["umpirePassword"] = PasswordStorage::create_hash($gameInfoRaw["umpirePassword"]);
		}
	
	//saves the game info into sql

	$conn = new mysqli(DB_SERVER, DB_NAME, DB_PASSWORD, DB_DATABASE);

	$command = $conn->prepare("INSERT INTO `games`(`gameId`, `gameInfo`, `units`, `teams`, `unitHistory`) VALUES (?,?,?,?,?)");

	$gameInfo = json_encode($gameInfoRaw);

	$teams = json_encode($teamsRaw);
	
	$units = json_encode($unitsRaw);

	$unitHistory = json_encode(array($unitsRaw));


	$command->bind_param("sssss", $gameId, $gameInfo, $units, $teams, $unitHistory);

	echo $command->execute();

	$conn->close();

}

//----------   Game setup   ----------

//finds all the units part of or vissible to a certain team
function teamFinder($teamId){
	$conn = new mysqli(DB_SERVER, DB_NAME, DB_PASSWORD, DB_DATABASE);

	$command = $conn->prepare("SELECT `units` FROM `games` WHERE gameId = ?");

	$command->bind_param("s",$_SESSION["gameToken"]);

	$command->execute();

	$command->store_result();

	$command->bind_result($unitsRaw);

	$teamUnits = array();

	while ($command->fetch()) {
		//turns raw game input into json object

		$units = json_decode($unitsRaw,true);

		foreach ($units as $unit) {
			if($unit["team"] === $teamId){
				array_push($teamUnits,$unit);
			}else{
				if(isset($unit["visibility"])){
					foreach ($unit["visibility"] as $visibleTeam) {
						if($visibleTeam === $teamId){
							array_push($teamUnits,$unit);
						}
					}
				}
			}
		}
	}

	$conn->close();

	for($i1 = 0; $i1 < sizeof($teamUnits); $i1+=1){
		if(isset($teamUnits[$i1]["visibility"])){
			unset($teamUnits[$i1]["visibility"]);
		}
	}

	return $teamUnits;
}

//echos the code for the umpire
function umpireSetUp($units){


	//todo list
	//gets rid of the login screen
	//gets rid of the blur tag
	//gets all units
	//add mesuring button
	//adds all the editing 
		// add unit
		// measure
		// unit menu fea

	echo "<script>";

	echo "$('#login.sub-menu').remove();";

	echo "$('body').removeClass('blur');";

	echo "$('#menu').append('<div data-menu-option=\"placeUnit\" onclick=\"newUnit(0)\"><img src=\"res\\\\img\\\\placeUnit.svg\" alt=\"place unit\"><label>Place Unit</label></div>');";

	//add unit controls
	echo "$('#unitMenu.sub-menu').prepend('<div><div id=\"rotateUnit\"><img src=\"res\\\\img\\\\rotate.svg\" alt=\"rotate unit symbol\">Rotate</div><div id=\"moveUnit\"><img src=\"res\\\\img\\\\move.svg\" alt=\"move unit symbol\">Move</div><div id=\"deleteUnit\"><img src=\"res\\\\img\\\\cross.svg\" alt=\"move unit symbol\">Delete</div></div><div><label>Id:</label><input id=\"unitId\" class=\"url\" readonly type=\"text\"></div><label>Team:</label><div id=\"teams\"></div><label>Visible to:</label><div id=\"visibilty\">	</div><div><label>Unit Type</label><select id=\"unitType\"><option value=\"zug\">zug</option><option value=\"company\">Company</option><option value=\"hBattalion\">Half Battalion</option></select><label>Light:</label><input id=\"lightUnit\" type=\"checkbox\"></div><div>	<label>Points</label><input id=\"unitPoint\" type=\"text\" name=\"points\"></div><button id=\"apply\">appy</button>');";


	//gets units
	echo "units = ".$units.";";

	echo "drawAllUnit();";

	echo "$('#menu').css('top','');";

	echo "loadEvents();";

	//code to upload units every 1 min

	//test


	echo "setInterval(function(){";

		echo "var connection = $.ajax({";

			echo "url: \"res/script/post.php\",";

			echo "type: \"POST\"";
			echo ",data: {";
						
				echo "method:\"gameUpdate\",";
				echo "unitsInfo: units";
			echo "}";

		echo "}).done(test);";

	echo "}, 1000*60);";

	echo "</script>";
}

function teamSetUp($teamId){

	echo "<script>";

	echo "$('#login.sub-menu').remove();";

	echo "$('body').removeClass('blur');";

	//add unit controls
	echo "$('#unitMenu.sub-menu').prepend('<div><label>Unit Type</label><input type=\"text\"readonly id=\"unitType\"><label>Light:</label><input id=\"lightUnit\" readonly type=\"checkbox\"></div><div><label>Points</label><input id=\"unitPoint\" type=\"text\" readonly name=\"points\"></div><button onclick=\"$(\"#unitMenu.sub-menu\").removeClass(\".active\")\">close</button>');";


	//gets units
	echo "units = ".json_encode(teamFinder($teamId)).";";

	echo "drawAllUnit();";

	echo "$('#menu').css('top','');";

	echo "loadEvents();";

	$_SESSION["userTeam"] = $teamId;


	//code to get units units every 1 min
	echo "setInterval(function(){";

		echo "var connection = $.ajax({";

			echo "url: \"res/script/post.php\",";

			echo "type: \"POST\"";
			echo ",data: {";
						
				echo "method:\"getUnits\"";
			echo "}";

		echo "}).done(function(reciver){";

			echo "console.log('agaga');";

			echo "console.log(reciver);";
			echo "units = JSON.parse(reciver);";

			echo "drawAllUnit();";

		echo "});";

	echo "}, 1000*60);";

	echo "</script>";
}

//teamLogin
function teamLogin(){

	//getting the hashed password
	$conn = new mysqli(DB_SERVER, DB_NAME, DB_PASSWORD, DB_DATABASE);

	$command = $conn->prepare("SELECT `gameInfo`,`teams`,`units` FROM `games` WHERE gameId = ?");

	$command->bind_param("s",$_SESSION["gameToken"]);

	$command->execute();

	$command->store_result();

	$command->bind_result($gameInfoRaw,$teamsRaw,$unitsRaw);


	while ($command->fetch()) {
		//turns raw game input into json object

		$scenarioInfo = json_decode($gameInfoRaw,true);
		$teams = json_decode($teamsRaw,true);
		$units = json_decode($unitsRaw,true);

		if ($_POST["team"] === "umpire"){
			$umpirePassword = $scenarioInfo["umpirePassword"];

			if($umpirePassword === "" && $_POST["password"] === ""){
				//echos umpire code
				umpireSetUp(json_encode($units));

			}elseif ($umpirePassword !== ""){
				if(PasswordStorage::verify_password($_POST["password"], $umpirePassword)){
					umpireSetUp(json_encode($units));
				}	
			} 
		}else{

			foreach ($teams as $team) {

				if($team["id"] === $_POST["team"]){
					if($team["password"] === "" && $_POST["password"] === ""){
						teamSetUp($_POST["team"]);
					}elseif($team["password"] !== ""){
						if (PasswordStorage::verify_password($_POST["password"], $team["password"])){
							teamSetUp($_POST["team"]);
						}
					}
				}		
			}
		}
	}	
}

//gets game information
function publicGameInfo(){
	$conn = new mysqli(DB_SERVER, DB_NAME, DB_PASSWORD, DB_DATABASE);

	$command = $conn->prepare("SELECT `gameInfo`, `teams` FROM `games` WHERE gameId = ?");

	$command->bind_param("s",$_SESSION["gameToken"]);

	$command->execute();

	$command->store_result();

	$command->bind_result($gameInfoRaw,$teamsRaw);


	while ($command->fetch()) {
		//turns raw game input into json object

		$gameInfo = json_decode($gameInfoRaw,true);
		$teams = json_decode($teamsRaw,true);

		for ($i1 = 0; $i1 < sizeof($teams); $i1++) {
			unset($teams[$i1]["password"]);
		}

		unset($gameInfo["umpirePassword"]);

		$gameInfo["scenarioTeams"] = $teams;

		echo json_encode($gameInfo);
	}


	$conn->close();
}

//updates game
function gameUpdate(){

	$conn = new mysqli(DB_SERVER, DB_NAME, DB_PASSWORD, DB_DATABASE);
	$gameHistory = null;


	$command = $conn->prepare("SELECT `unitHistory` FROM `games` WHERE gameId = ?");

	$command->bind_param("s",$_SESSION["gameToken"]);

	$command->execute();

	$command->store_result();

	$command->bind_result($gameHistoryRaw);

	while ($command->fetch()){

		if ($gameHistoryRaw !== "null"){
			$gameHistory = json_decode($gameHistoryRaw,true);
		}else{
			$gameHistory = [];
		}
	}


	echo gettype($gameHistory)."\n"."\n";

	$command = $conn->prepare("UPDATE `games` SET `units`=?,`unitHistory`=? WHERE gameId = ?");


	$units = json_encode($_POST["unitsInfo"]);

	array_push($gameHistory, $_POST["unitsInfo"]);

	$gameHistory = json_encode($gameHistory);

	$command->bind_param("sss", $units, $gameHistory, $_SESSION["gameToken"]);

	echo $command->execute();

	$conn->close();
}

function getUnits(){

	echo json_encode(teamFinder($_SESSION["userTeam"]));
}


?>