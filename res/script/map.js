//global variables
var mapScale = 1 // map scale is renfrence to how much user has zoomed into the map
var unitScale = 1 // unit scale is in refrence to the map

//sets transform property
function transform(target, scaleX = 1, scaleY = 1, rotation = "0deg"){
	console.log(scaleY)
	console.log("rotate("+rotation+") scaleX("+scaleX+") scaleY("+scaleY+")")
	target.css("transform","rotate("+rotation+") scaleX("+scaleX+") scaleY("+scaleY+")")
}

//----------   Unit   ----------
//creates a unquie id
function idGen(){
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	var date = new Date();
	for ( var i = 0; i < 10; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result+Math.round((new Date()).getTime() / 1000);;
}

//unit templates
var unitTemplates = new Map();


//ever 1 units = 1 pace = 1px
unitTemplates.set("zug",{height:25,width:100,men:83})
unitTemplates.set("hBattalion",{height:100,width:100,men:500})
unitTemplates.set("company",{height:75,width:75,men:250})

//all the units on the map
var units = [];

//all the teams on the maps
var teams= [{name:"noTeam", id:"noTeam", primaryColour:"#000000", secondaryColour:"#000000", highlightColour:"#000000", password:""},
	{name:"team1", id:idGen(), primaryColour:"#0054FE", secondaryColour:"#9293FF", highlightColour:"#FFFFFF", password:""},
	{name:"team2", id:idGen(), primaryColour:"#FF0800", secondaryColour:"#28AE00", highlightColour:"#FFFFFF", password:""}];

//updates team-id data
for (i1 = 1; i1 < teams.length; i1++){
	$("#teamSetting.sub-menu").children("#team").eq(i1-1).attr("data-teamid",teams[i1].id)
}

//action booleans
var movingUnit = false;
var rotatingUnit = false;
var mapCallibration = false
var measure = false


var temp = []

//finds teams by the name
function find(id, searchList, searchObject = "id"){//item=return item||index = return item index
	for (var i1 =0; i1<searchList.length; i1++){
		if(searchObject == "id"){
			if(id===searchList[i1].id){
				return i1		
			}
		}else{
			if(id === searchList[i1].name){
				return i1		
			}
		}
	}
}

//drawsUnit can both create and convert a unit from one type to another
function drawUnit(type, teamColour, id, light=false, placed=true, moveable=false){
	
	var unit;

	if (placed === false){

		$("#map >div").append("<svg id='unit-"+id+"' class='unit moving' onclick='unitMenuOpen(this)'></svg>")

		unit = $("#unit-"+id+".unit")
	}else{
		unit = $("#unit-"+id+".unit")

		unit.html()
	}
	

	switch(type){
		case "zug":

			unit.css("width",unitTemplates.get("zug").width+"px")
			unit.css("height",unitTemplates.get("zug").height+"px")

			unit.html("<path fill='"+teamColour[0]+"' fill-rule='evenodd' stroke='none' stroke-width='1.33333' d='M 0,0 L 100,0 L 100,25 L 0,25 Z'/>")	

			break;
		case "hBattalion":
			
			unit.css("width",unitTemplates.get("hBattalion").width+"px")
			unit.css("height",unitTemplates.get("hBattalion").height+"px")

			unit.html("<path fill="+teamColour[2]+" fill-rule='evenodd' stroke='none' stroke-width='1.33333' d='M 0,0 L 100,0 L 100,100 L 0,100 Z '/>\n<path fill="+teamColour[0]+" fill-rule='evenodd' stroke='none' stroke-width='1.33333' d='M 0,0 L 100,0 L 100,50 L 0,50 Z'/>\n<path fill="+teamColour[1]+" fill-rule='evenodd' stroke='none' stroke-width='1.33333' d='M 0,100 L 100,50 L 100,100 Z'/>")	

			break;
		case "company":

			unit.css("width",unitTemplates.get("company").width+"px")
			unit.css("height",unitTemplates.get("company").height+"px")

			unit.html("<path fill="+teamColour[0]+" fill-rule='evenodd' stroke='none' stroke-width='1.33333' d='M 0,0 L 75,0 L 75,75 L 0,75 Z'/>\n<path fill="+teamColour[1]+" fill-rule='evenodd' stroke='none' stroke-width='1.33333' d='M 0,75 L 75,0 L 75,75 Z'/>")	
			break;
	}

	transform(unit,scaleX = unitScale, scaleY = unitScale)

	if (light===true){
		unit.addClass("light")
	}else if(light===false){
		unit.removeClass("light")
	}
}

//opens unit sub menu
function unitMenuOpen(unitRaw){

	var unit = units[find($(unitRaw).attr("id").substring(5,$(unitRaw).attr("id").length),units)]

	//<input type="radio" name="team" value="name"><label>name</label>
	$("#unitMenu.sub-menu #teams, #unitMenu.sub-menu #visibilty").html("")

	//sets up teams
	for (var i1=1; i1<teams.length;i1++){
		$("#unitMenu.sub-menu #teams").append("<input type=\"radio\" name=teamName value='"+teams[i1].id+"'><label>"+teams[i1].name+"</label>")

		if(teams[i1].id === unit.team){
			$("#unitMenu.sub-menu #teams input[name=teamName]").last().prop("checked",true)			
		}else{
			$("#unitMenu.sub-menu #visibilty").append("<input type=\"checkbox\" name=\"visibility\" value='"+teams[i1].id+"'><label>"+teams[i1].name+"</label>")

			if(unit.visibility.indexOf(teams[i1].id)>=0){
				$("#unitMenu.sub-menu #visibilty input[name=visibility]").last().prop("checked",true)
			}
			//comeback
		}
	}

	$(".active").removeClass("active")

	$("#unitMenu.sub-menu").addClass("active")
	
	//updates the sub menu for the specific unit
	$("#unitMenu.sub-menu").attr("data-unit-id",unit.id)

	$("#unitMenu.sub-menu #unitId").val(unit.id)
	$("#unitMenu.sub-menu #unitType").val(unit.unitType)
	$("#unitMenu.sub-menu #lightUnit").prop('checked', unit.light)
	$("#unitMenu.sub-menu #unitPoint").val(unit.points)

}

$("#unitMenu.sub-menu #apply").click(function(){
	var unit = units[find($("#unitMenu.sub-menu").attr("data-unit-id"),units)]
	var drawingCond = false

	if($('#unitMenu.sub-menu #teams input[name=teamName]:checked').val() != unit.team){
		unit.team = $('#unitMenu.sub-menu #teams input[name=teamName]:checked').val()

		drawingCond = true
	}

	tempVisibilty = []
	$("#unitMenu.sub-menu #visibilty input[name=visibility]:checked").each(function() {
		tempVisibilty.push($(this).val());
	})

	unit.visibility = tempVisibilty

	if($("#unitMenu.sub-menu #unitType option:selected").val() !== unit.unitType){
		unit.unitType = $("#unitMenu.sub-menu #unitType").val()

		drawingCond = true
	}

	if($("#unitMenu.sub-menu #lightUnit").prop("checked") !== unit.light){
		unit.light = $("#unitMenu.sub-menu #lightUnit").prop("checked")
		
		drawingCond = true
	}

	if(parseInt($("#unitMenu.sub-menu #unitPoint").val()) !== unit.points){
		unit.points = parseInt($("#unitMenu.sub-menu #unitPoint").val())
	}

	if(drawingCond = true){
		var team = teams[find(unit.team, teams)]

		drawUnit(unit.unitType, [team.primaryColour, team.secondaryColour, team.highlightColour], unit.id, light=unit.light)
	}

	units[find($("#unitMenu.sub-menu").attr("data-unit-id").substring(5,$("#unitMenu.sub-menu").attr("data-unit-id").length), units, acton = "index")] = unit

})
//moves unit
$("#unitMenu #moveUnit").click(function(){

	if(movingUnit == false && rotatingUnit==false){
		$("#unit-"+$("#unitMenu.sub-menu").attr("data-unit-id")).toggleClass("moving")

		movingUnit=true

		$("#unitMenu.sub-menu").toggleClass("active")
	}
	
})

//rotates units
$("#unitMenu #rotateUnit").click(function(){
	if(movingUnit == false && rotatingUnit==false){
		//come back
		$("#unit-"+$("#unitMenu.sub-menu").attr("data-unit-id")).toggleClass("rotating")

		rotatingUnit=true

		$("#unitMenu.sub-menu").toggleClass("active")
	}
})

//deletes unit
$("#unitMenu #deleteUnit").click(function(){

	units.splice(find($("#unitMenu.sub-menu").attr("data-unit-id"),units),1)

	$("#unit-"+$("#unitMenu.sub-menu").attr("data-unit-id")).remove()


	$("#unitMenu.sub-menu").toggleClass("active")
})

//closes the mene
$("#unitMenu button").click(function(){
	$("#unitMenu").toggleClass("active")
})


//----------   map   ----------
var mouseDown = false
var lastPos = {x:0,y:0}

//loads map
function mapLoad(mapUrl){
	//sets up map
	$("img#map").attr("src",mapUrl)

	$("img#map").css("min-width","100vw")
	$("img#map").css("min-height","auto")

	$("img#map").css("width","100vw")
	$("img#map").css("height","auto")

	$("img#map").css("max-width","100vw")
	$("img#map").css("max-height","auto")


	setTimeout(function () {
		var mapWidth = document.querySelector("img#map").naturalWidth
		var mapHeight = document.querySelector("img#map").naturalHeight

		var widthToHeightRatio = mapHeight/mapWidth

		var clientWidth = $(document).width()
		var clientHeight = $(document).height()

		if(mapWidth>mapHeight){

			var width = (clientHeight/widthToHeightRatio)

			$("img#map").css("min-width",width+"px")
			$("img#map").css("min-height",clientHeight+"px")

			$("img#map").css("width",width+"px")
			$("img#map").css("height",clientHeight+"px")

			$("img#map").css("max-width",width+"px")
			$("img#map").css("max-height",clientHeight+"px")

		}else{
			
			var height = (clientWidth*widthToHeightRatio)

			$("img#map").css("min-width",clientWidth+"px")
			$("img#map").css("min-height",height+"px")

			$("img#map").css("width",clientWidth+"px")
			$("img#map").css("height",height+"px")

			$("img#map").css("max-width",clientWidth+"px")
			$("img#map").css("max-height",height+"px")

		}
	},500)
}

//places new unit on the map
function newUnit(teamColour){
	if(movingUnit==false && rotatingUnit==false){

		var temp = {id: idGen(), unitType: "zug", points: unitTemplates.get("zug").men, light: false, x: undefined, y: undefined, rotation: 0, team: teams[1].id, visibility: []}

		var team = teams[find(temp.team,teams)]

		units.push(temp)

		drawUnit("zug", [team.primaryColour, team.secondaryColour, team.highlightColour] , temp.id, light=false, placed = false)

		movingUnit = true;
	}
}

//creates ruler
function rulerStart(){
	$("#ruler").remove()
	$("#map >div").append("<div id='ruler'><div></div><label></label</div>")
	measure = true
}

//scales the maps
$("#map").mousewheel(function(event){
	
	mapScale+=event.deltaY*0.1

	if(mapScale<0.5){
		mapScale=0.5
	}
	transform($("#map"),scaleX = mapScale, scaleY = mapScale)
})



//checks if the mouse button is released
$(document).mouseup(function(){
	mouseDown = false;
})

$("#map").mousedown(function(event){
	mouseDown = true

	lastPos.x = event.clientX
	lastPos.y = event.clientY

})


//unit hovers on cursor when a unit is being placed
$("#map").mousemove(function(event){
	if(movingUnit){
		var newPos = [(event.pageX - $(this).offset().left)/mapScale,(event.pageY - $(this).offset().top)/mapScale]
		
		var unit = unitTemplates.get(units[find($(".moving").attr("id").substring(5,$(".moving").attr("id").length),units)].unitType)
		var newDist = [unit.width-unit.width*unitScale,unit.height-(unit.height*unitScale)]


		$(".moving").css("left",(newPos[0]-newDist[0]/2)+"px")
		$(".moving").css("top",(newPos[1]-newDist[1]/2)+"px")
	}else if(rotatingUnit){
		//rotate

		var unit = units[find($(".rotating").attr("id").substring(5,$(".rotating").attr("id").length), units)]

		// $(".moving").css("left",(event.pageX - $(this).offset().left)/mapScale+"px")
		// $(".moving").css("top",(event.pageY - $(this).offset().top)/mapScale+"px")

		var mousePos = {
			x: (event.pageX - $(this).offset().left)/mapScale,
			y: (event.pageY - $(this).offset().top)/mapScale}

		var changeX = -1*(mousePos.x-parseInt(unit.x.substring(0,unit.x.length-2)))
		var changeY = -1*(mousePos.y-parseInt(unit.y.substring(0,unit.y.length-2)))

		var angle = Math.atan2(changeY,changeX)
		var angle = (180*angle)/Math.PI-90
		transform($(".rotating"),ScaleX = unitScale, scaleY = unitScale ,rotation = angle+"deg")

		unit.rotation = angle
	//moves the map around
	}else if(measure){
		if(temp.length>0){


			var mousePos = {
				x: (event.pageX - $(this).offset().left)/mapScale,
				y: (event.pageY - $(this).offset().top)/mapScale}

			var changeX = (mousePos.x-temp[0].x)
			var changeY = (mousePos.y-temp[0].y-25)

			var angle = Math.atan2(changeY,changeX)
			var angle = (180*angle)/Math.PI

			var dist = Math.sqrt(Math.pow(changeX,2)+Math.pow(changeY,2))

			transform($("#ruler"),scaleX = 1, scaleY = 1/mapScale, rotation = angle+"deg")
			$("#ruler").css("width",dist+"px")
			$("#ruler > label").text(Math.round(dist/unitScale)+" paces")
			if(angle <-90 || angle>90){
				$("#ruler > label").css("transform","scale(-1)")
			}else{
				$("#ruler > label").css("transform","scale(1)")
			}
		}
	}else if(mouseDown){


		var deltaPos = {x:event.clientX-lastPos.x, y:event.clientY-lastPos.y}

		var mapPos = {x: parseInt($("#map").css("left").substring(0,$("#map").css("left").length-2)), y: parseInt($("#map").css("top").substring(0,$("#map").css("top").length-2))}

		$("#map").css("left",(mapPos.x+deltaPos.x)+"px")
		$("#map").css("top",(mapPos.y+deltaPos.y)+"px")


		lastPos.x=event.clientX
		lastPos.y=event.clientY
	}
})

//on mouse click a unit is placeds
$("#map").click(function(event){
	if(movingUnit===true){
		var unitIndex = find($(".moving").attr("id").substring(5,$(".moving").attr("id").length), units)

		units[unitIndex].x=(event.pageX - $(this).offset().left)/mapScale+"px"
		units[unitIndex].y=(event.pageY - $(this).offset().top)/mapScale+"px"

		$(".moving").css("left",(event.pageX - $(this).offset().left)/mapScale+"px")
		$(".moving").css("top",(event.pageY - $(this).offset().top)/mapScale+"px")
		$(".moving").removeClass("moving");

		movingUnit=false

		$(".moving").removeClass("moving");
	}else if(rotatingUnit){
		//fix rotation

		$(".rotating").removeClass("rotating")

		rotatingUnit=false
	}else if(mapCallibration){
		if(temp.length>0){

			var changeX = (event.pageX - $(this).offset().left)/mapScale - temp[0][0]
			var changeY = (event.pageY - $(this).offset().top)/mapScale - temp[0][1]

			var dist = Math.sqrt(Math.pow(changeX,2)+Math.pow(changeY,2))

			//come back
			$("#mapScale.sub-menu").addClass("active")

			temp.push(dist)
		}else{
			temp.push([(event.pageX - $(this).offset().left)/mapScale,(event.pageY - $(this).offset().top)/mapScale])
		}
	}else if(measure){
		//come back
		if(temp.length>0){

			var mousePos = {
				x: (event.pageX - $(this).offset().left)/mapScale,
				y: (event.pageY - $(this).offset().top)/mapScale}

			var changeX = (mousePos.x-temp[0].x)
			var changeY = (mousePos.y-temp[0].y-25)

			var angle = Math.atan2(changeY,changeX)
			var angle = (180*angle)/Math.PI

			var dist = Math.sqrt(Math.pow(changeX,2)+Math.pow(changeY,2))

			transform($("#ruler"),scaleX = 1,scaleY = 1/mapScale, rotation = angle+"deg")
			$("#ruler").css("width",dist+"px")

			measure = false
			temp=[]


		}else{
			temp = []
			temp.push({x:(event.pageX - $(this).offset().left)/mapScale,y:(event.pageY - $(this).offset().top)/mapScale-25})

			$("#ruler").css("left",temp[0].x+"px")
			$("#ruler").css("top",temp[0].y+"px")
		}
	}
})