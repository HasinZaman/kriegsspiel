//make id creates url
function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   var date = new Date();
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result+Math.round((new Date()).getTime() / 1000);;
}


//senerio variables
senerioToken = makeid(10)
mapURL = ""
description = ""


//---------------   units   ---------------

var templateTeam = [
	//classics
	["team1","#0054FE","#9293FF","#FFFFFF"],
	["team2","#FF0800","#28AE00","#FFFFFF"],
	//nations
	["Prusia","#140041","#FFFFFF","#FFFFFF"],
	["France","#012295","#EC2738","#FFFFFF"],
	["Great Britan","#D10C27","#011F7F","#FFFFFF"],
	["Austria","#E6DFDB","#AC3A3C","#000000"],
	["Otaman","#009530","#CB2027","#FCDD09"]
	
	//union forces will be implemented latter
	//["Union","#009530","#CB2027","#FCDD09"],
	//["Confederate","#009530","#CB2027","#FCDD09"]
]

//adds team
function makeTeam(){
	teams.push(templateTeam[Math.floor(Math.random()*templateTeam.length)])

	var temp = teams.length-1

	$("#teamSetting").append("<div id='team' data-teamId='"+temp+"'><input type='text' value='"+teams[teams.length-1][0]+"'><label>Primary Colour:</label><input type='color' name='primaryColour' value='"+teams[teams.length-1][1]+"''><label>Secondary Colour:</label><input type='color' name='secondaryColour' value='"+teams[teams.length-1][2]+"'><label>Highlight Colour:</label><input type='color' name='secondaryColour' value='"+teams[teams.length-1][3]+"'><img class='cross' onclick='removeTeam(this)' src='res\\img\\cross.svg'></div>")
}

//removes team
function removeTeam(team){
	teams.pop($(team).parent().attr("data-teamId"))

	$(team).parent().remove()

}

//---------------   units   ---------------

function createUnit(unitXCord=0, unitYCord=0, unitRot=0, unitTeam=0, unitVisibility=false){
	unit = {id: createdUnits, x: unitXCord, y: unitYCord, team: unitTeam, visibility: unitVisibility}
	createdUnits+=1
	return unit;
}

//---------------   senerio Setting   ---------------

//sets up game link
$(".url").val("http://kreigsspeil.dx.am/game?id="+senerioToken)

$("#senerioSetting.sub-menu #mapUrl").keypress(function(){
	console.log($("#senerioSetting.sub-menu #mapUrl").val())
	$("img#map").attr("src",$("#senerioSetting.sub-menu #mapUrl").val())
})