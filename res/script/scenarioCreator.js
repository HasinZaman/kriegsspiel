//senerio variables
senerioToken = idGen()
mapURL = ""


//---------------   units   ---------------

var templateTeam = [
	//classics
	{name:"team1", id:idGen, primaryColour:"#0054FE", secondaryColour:"#9293FF", highlightColour:"#FFFFFF", password:""},
	{name:"team2", id:idGen, primaryColour:"#FF0800", secondaryColour:"#28AE00", highlightColour:"#FFFFFF", password:""},
	//nations
	{name:"Prusia", id:idGen, primaryColour:"#140041", secondaryColour:"#FFFFFF", highlightColour:"#FFFFFF", password:""},
	{name:"France", id:idGen, primaryColour:"#012295", secondaryColour:"#EC2738", highlightColour:"#FFFFFF", password:""},
	{name:"Great Britan", id:idGen, primaryColour:"#D10C27", secondaryColour:"#011F7F", highlightColour:"#FFFFFF", password:""},
	{name:"Austria", id:idGen, primaryColour:"#E6DFDB", secondaryColour:"#AC3A3C", highlightColour:"#000000", password:""},
	{name:"Otaman", id:idGen, primaryColour:"#009530", secondaryColour:"#CB2027", highlightColour:"#FCDD09", password:""}
	
	//union forces will be implemented latter
	//["Union","#009530","#CB2027","#FCDD09"],
	//["Confederate","#009530","#CB2027","#FCDD09"]
]

//adds team
function makeTeam(){
	teams.push(templateTeam[Math.floor(Math.random()*templateTeam.length)])
	teams[teams.length-1].id=idGen()

	$("#teamSetting.sub-menu").append("<div id='team' data-teamId='"+teams[teams.length-1].id+"'><input type='text' name='teamName' value='"+teams[teams.length-1].name+"'><label>Primary Colour:</label><input type='color' name='primaryColour' value='"+teams[teams.length-1].primaryColour+"''><label>Secondary Colour:</label><input type='color' name='secondaryColour' value='"+teams[teams.length-1].secondaryColour+"'><label>Highlight Colour:</label><input type='color' name='highlightColour' value='"+teams[teams.length-1].highlightColour+"'><label>Team Password:</label><input type='text' name='teamPassword'><img class='cross' onclick='removeTeam(this)' src='res\\img\\cross.svg'></div>")
}

//removes team
function removeTeam(team){
	index = find($(team).parent().attr("data-teamId"),teams)
	temp = teams[index]

	for (var i1 = 0; i1 < units.length; i1++){
		if(units[i1].team == temp.id){
			units[i1].team = teams[0].id

			drawUnit(units[i1].unitType, [teams[0].primaryColour, teams[0].secondaryColour, teams[0].highlightColour], units[i1].id, light=units[i1].light)
		}
	}

	teams.splice(index,1)
	$(team).parent().remove()

}

//updates teams
$("#teamSetting.sub-menu #team input").change(function(){
	index = find($(this).parent().attr("data-teamId"),teams)

	modifedElement = $(this).attr("name")
	if (modifedElement === "teamName"){
		teams[index].name = $(this).val()
	}else if(modifedElement === "primaryColour"){
		teams[index].primaryColour = $(this).val()
	}else if(modifedElement === "secondaryColour"){
		teams[index].secondaryColour = $(this).val()
	}else if(modifedElement === "highlightColour"){
		teams[index].highlightColour = $(this).val()
	}else if(modifedElement === "teamPassword"){
		teams[index].password = $(this).val()
	}
})
//---------------   senerio Setting   ---------------

//sets up the map scale

//starts the measuring process
$("#senerioSetting.sub-menu #setScale").click(function(){
	mapCallibration = true
	$(".active").removeClass("active")
})

//gets the pixel to paces ratio
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