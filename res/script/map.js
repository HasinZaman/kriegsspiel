

//----------   Unit   ----------
//unit templates
var unitTemplates = new Map();


//ever 1 units = 1 pace = 1px
unitTemplates.set("zug",{height:25,width:100,men:83})
unitTemplates.set("hBattalion",{height:100,width:100,men:500})
unitTemplates.set("company",{height:75,width:75,men:250})

//all the units on the map
var units = [];

//all the teams on the maps
var teams= [["team1","#0054FE","#9293FF","#FFFFFF"],["team2","#FF0800","#28AE00","#FFFFFF"]];

//action booleans
var movingUnit = false;
var rotatingUnit = false;

//drawsUnit can both create and convert a unit from one type to another
function drawUnit(type, teamColour, light=false, id=undefined, moveable=false){
	
	var unit;

	if (id == undefined){

		var unitId;

		var lastUnit = $(".unit").last().attr("id")

		if (lastUnit === undefined){
			unitId=0
		}else{
			unitId = parseInt(lastUnit.substring(5, lastUnit.length))+1	
		}

		$("#map div").append("<svg id='unit-"+unitId+"' class='unit moving' onclick='unitMenuOpen(this)'></svg>")

		unit = $("#unit-"+unitId+".unit")
	}else{
		unit = $("#unit-"+id+".unit")
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

	if (light===true){
		unit.toggleClass("light")
	}
	if(moveable===true){
		unit.attr("onclick","unitEdit()")
	}
}

//opens unit sub menu
function unitMenuOpen(unitRaw){

	var unit = units[$(unitRaw).attr("id").substring(5,$(unitRaw).attr("id").length)]

	$("#unitMenu.sub-menu").toggleClass("active")
	
	//updates the sub menu for the specific unit
	$("#unitMenu.sub-menu").attr("data-unit-id",unit.unitId)

	$("#unitMenu.sub-menu #unitId").val(unit.unitId)
	$("#unitMenu.sub-menu #unitType").val(unit.unitType)
	$("#unitMenu.sub-menu #lightUnit").attr('checked', unit.light)
	$("#unitMenu.sub-menu #unitPoint").val(unit.points)

	$("#unitMenu select")
}

//moves unit
$("#unitMenu #moveUnit").click(function(){

	if(movingUnit == false && rotatingUnit==false){
		$("#"+$("#unitMenu.sub-menu").attr("data-unit-id")).toggleClass("moving")

		movingUnit=true

		$("#unitMenu.sub-menu").toggleClass("active")
	}
	
})

$("#unitMenu #rotateUnit").click(function(){
	if(movingUnit == false && rotatingUnit==false){
		$("#"+$("#unitMenu.sub-menu").attr("data-unit-id")).toggleClass("rotating")

		rotatingUnit=true

		$("#unitMenu.sub-menu").toggleClass("active")
	}
})

//closes the mene
$("#unitMenu button").click(function(){
	$("#unitMenu").toggleClass("active")
})


//----------   map   ----------
//set up map
function start(mapUrl,units){
	//sets up map
	$("#map > img").attr("src",mapUrl)

}
//places new unit on the map
function newUnit(teamColour){
	if(movingUnit==false && rotatingUnit==false){
		
		var unitId;
		
		if(units.length<= 0){
			unitId = "unit-0"
		}else{
			unitId = "unit-"+(parseInt($(".unit").last().attr("id").substring(5, $(".unit").last().attr("id").length))+1)
		}
		
		
		var temp = {unitId: unitId, unitType: "zug", points: unitTemplates.get("zug").men, light: false, x: undefined, y: undefined, rotation: 0, team: teams[0][0], visibility: ""}

		units.push(temp)

		drawUnit("zug",teamColour)

		movingUnit = true;
	}
}


//unit hovers on cursor when a unit is being placed
$("#map").mousemove(function(event){
	if(movingUnit){
		$(".moving").css("left",event.clientX+"px")
		$(".moving").css("top",event.clientY+"px")
	}else if(rotatingUnit){
		//rotate

		unit=units[$(".rotating").attr("id").substring(5,$(".rotating").attr("id").length)]

		var changeX = Math.abs(event.clientX-parseInt(unit.x.substring(0,unit.x.length-2)))
		var changeY = Math.abs(event.clientY-parseInt(unit.y.substring(0,unit.y.length-2)))

		var angle = Math.atan(changeY/changeX)


		//coverts angle from counter clock wise to clock wise and makes postive y axis the new starting point of the angle
		angle = 90-(180*angle)/Math.PI

		//qudrant 4
		if(event.clientX >= parseInt(unit.x.substring(0,unit.x.length-2)) && event.clientY>=parseInt(unit.y.substring(0,unit.y.length-2))){
			angle= 180-angle
		//quadrant 3
		}else if(event.clientX<=parseInt(unit.x.substring(0,unit.x.length-2)) && event.clientY>=parseInt(unit.y.substring(0,unit.y.length-2))){
			angle= 180 + angle
		//quadrant 2
		}else if(event.clientX<=parseInt(unit.x.substring(0,unit.x.length-2)) && event.clientY<=parseInt(unit.y.substring(0,unit.y.length-2))){
			angle= 360 - angle
		//quadrant 1
		}
		
		$(".rotating").css("transform","rotate("+angle+"deg)")
	}
})

//on mouse click a unit is placeds
$("#map").click(function(event){
	if(movingUnit===true){

		units[$(".moving").attr("id").substring(5,$(".moving").attr("id").length)].x=event.clientX+"px"
		units[$(".moving").attr("id").substring(5,$(".moving").attr("id").length)].y=event.clientY+"px"

		$(".moving").css("left",event.clientX+"px")
		$(".moving").css("top",event.clientY+"px")
		$(".moving").removeClass("moving");

		movingUnit=false
	}else if(rotatingUnit){
		//fix rotation

		$(".rotating").removeClass("rotating")

		rotatingUnit=false
	}
})