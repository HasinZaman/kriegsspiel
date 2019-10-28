//senerio variables
senerioToken = idGen()
mapURL = ""
description = ""


//---------------   units   ---------------

var templateTeam = [
	//classics
	{name:"team1", id:idGen, primaryColour:"#0054FE", secondaryColour:"#9293FF", highlightColour:"#FFFFFF"},
	{name:"team2", id:idGen, primaryColour:"#FF0800", secondaryColour:"#28AE00", highlightColour:"#FFFFFF"},
	//nations
	{name:"Prusia", id:idGen, primaryColour:"#140041", secondaryColour:"#FFFFFF", highlightColour:"#FFFFFF"},
	{name:"France", id:idGen, primaryColour:"#012295", secondaryColour:"#EC2738", highlightColour:"#FFFFFF"},
	{name:"Great Britan", id:idGen, primaryColour:"#D10C27", secondaryColour:"#011F7F", highlightColour:"#FFFFFF"},
	{name:"Austria", id:idGen, primaryColour:"#E6DFDB", secondaryColour:"#AC3A3C", highlightColour:"#000000"},
	{name:"Otaman", id:idGen, primaryColour:"#009530", secondaryColour:"#CB2027", highlightColour:"#FCDD09"}
	
	//union forces will be implemented latter
	//["Union","#009530","#CB2027","#FCDD09"],
	//["Confederate","#009530","#CB2027","#FCDD09"]
]

//adds team
function makeTeam(){
	teams.push(templateTeam[Math.floor(Math.random()*templateTeam.length)])
	teams[teams.length-1].id=idGen()

	var temp = teams.length-1

	$("#teamSetting").append("<div id='team' data-teamId='"+temp+"'><input type='text' value='"+teams[teams.length-1].name+"'><label>Primary Colour:</label><input type='color' name='primaryColour' value='"+teams[teams.length-1].primaryColour+"''><label>Secondary Colour:</label><input type='color' name='secondaryColour' value='"+teams[teams.length-1].secondaryColour+"'><label>Highlight Colour:</label><input type='color' name='secondaryColour' value='"+teams[teams.length-1].highlightColour+"'><img class='cross' onclick='removeTeam(this)' src='res\\img\\cross.svg'></div>")
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
	mapLoad($("#senerioSetting.sub-menu #mapUrl").val())
})