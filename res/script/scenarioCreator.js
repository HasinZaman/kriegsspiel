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

//---------------   senerio Setting   ---------------

//sets up the map scale
$("#senerioSetting.sub-menu #setScale").click(function(){
	mapCallibration = true
	$(".active").removeClass("active")
})

$("#mapScale.sub-menu button").click(function(){
	var distInput;
	try{
		distInput = parseInt($("#mapScale.sub-menu input").val())

		unit = $("#mapScale.sub-menu #unit").val()

				// <option value="paces">Paces</option>
				// <option value="miles">Miles</option>
				// <option value="yards">yards</option>
				// <option value="meters">Meter</option>
				// <option value="kilometers">Kilometer</option>
		//px/paces
		unitScale = temp[1]/distInput
		
		if(unit == "miles"){
			unitScale = unitScale/2112
		}else if(unit=="feet"){
			unitScale = unitScale/0.4
		}else if(unit == "yards"){
			unitScale = unitScale/1.2
		}else if(unit == "meters"){
			unitScale = unitScale/1.31
		}else if(unit == "kilometers"){
			unitScale = unitScale/1312.34
		}

		console.log(unitScale)

		$("#map svg").css("transform","scale("+unitScale+")")

		$(".active").toggleClass("active")

		temp=[]
		mapCallibration = false
	}catch(error){
		$("#mapScale.sub-menu").val("")
	}
})

//sets up game link
$(".url").val("http://kreigsspeil.dx.am/game?id="+senerioToken)

$("#senerioSetting.sub-menu #mapUrl").keypress(function(){
	mapLoad($("#senerioSetting.sub-menu #mapUrl").val())
})