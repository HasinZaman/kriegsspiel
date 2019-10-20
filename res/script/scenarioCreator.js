
//senerio variables
mapURL = "";
description = "";
units = [];

//---------------   units   ---------------

//createdUnits is to id every unit
createdUnits = 0

function createUnit(unitXCord=0, unitYCord=0, unitRot=0, unitTeam=0, unitVisibility=false){
	unit = {id: createdUnits, x: unitXCord, y: unitYCord, team: unitTeam, visibility: unitVisibility}
	createdUnits+=1
	return unit;
}