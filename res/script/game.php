<?php 
//load dependencies
session_start();


//----------   Game setup   ----------

// Saves scenerio creator info into sql database

function gameSetup(){

	
	$gameInfoRaw = $_POST["gameInfo"];
	$gameId = $_POST["gameId"];

	//hashs all the passwords

	//hashs team passwords
	for ($i1 = 0; $i1 < sizeof($gameInfoRaw["scenarioTeams"]); $i1++) {
		if($gameInfoRaw["scenarioTeams"][$i1]["password"] !== ""){
			$gameInfoRaw["scenarioTeams"][$i1]["password"] = PasswordStorage::create_hash($gameInfoRaw["scenarioTeams"][$i1]["password"]);
		}
	}

	//hashes the umpire password
	if($gameInfoRaw["umpirePassword"] !== ""){
			$gameInfoRaw["umpirePassword"] = PasswordStorage::create_hash($gameInfoRaw["umpirePassword"]);
		}
	
	//saves the game info into sql

	$conn = new mysqli(DB_SERVER, DB_NAME, DB_PASSWORD, DB_DATABASE);

	$command = $conn->prepare("INSERT INTO `games`(`gameId`, `gameInfo`) VALUES (?,?)");

	$gameInfo = json_encode($gameInfoRaw);

	$command->bind_param("ss", $gameId, $gameInfo);

	echo $command->execute();

	$conn->close();

}

//----------   Game setup   ----------

//teamLogin
function teamLogin(){

	if($_POST["password"] === ""){
		echo true;

		return "";
	}

	//getting the hashed password
	$conn = new mysqli(DB_SERVER, DB_NAME, DB_PASSWORD, DB_DATABASE);

	$command = $conn->prepare("SELECT `gameInfo`FROM `games` WHERE gameId = ?");

	$command->bind_param("s",$_SESSION["gameToken"]);

	$command->execute();

	$command->store_result();

	$command->bind_result($rawGameInput);


	while ($command->fetch()) {
		//turns raw game input into json object

		if ($_POST["team"] === "umpire"){
			$umpirePassword = json_decode($rawGameInput,true)["umpirePassword"];

			if(($umpirePassword === "" && $_POST["password"]) || PasswordStorage::verify_password($_POST["password"], $umpirePassword)){
				//echos umpire code

				echo "<script>";

				echo "</script>";

			};
		}else{
			$teams = json_decode($rawGameInput,true)["scenarioTeams"];

			foreach ($teams as $team) {

				if($team["id"] === $_POST["team"]){
					if(($team["password"] === "" && $_POST["password"]) || PasswordStorage::verify_password($_POST["password"], $team["password"])){

						//echos script code
					}
				}
				
			}
		}


	}

	

	
	
}

//gets game information
function publicGameInfo(){
	$conn = new mysqli(DB_SERVER, DB_NAME, DB_PASSWORD, DB_DATABASE);

	$command = $conn->prepare("SELECT `gameInfo`FROM `games` WHERE gameId = ?");

	$command->bind_param("s",$_SESSION["gameToken"]);

	$command->execute();

	$command->store_result();

	$command->bind_result($rawGameInput);


	while ($command->fetch()) {
		//turns raw game input into json object

		$gameInfo = json_decode($rawGameInput,true);

		for ($i1 = 0; $i1 < sizeof($gameInfo["scenarioTeams"]); $i1++) {
			unset($gameInfo["scenarioTeams"][$i1]["password"]);
		}

		unset($gameInfo["umpirePassword"]);

		echo json_encode($gameInfo);
	}


	$conn->close();
}

 ?>