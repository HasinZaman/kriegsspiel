<?php
	
include "server.php";
include "game.php";
require_once('PasswordStorage.php');


echo $_POST["method"]();


?>