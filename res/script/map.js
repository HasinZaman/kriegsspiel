

//----------   Unit   ----------
//unit templates
var units = new Map();


//ever 10 units = 1 pace = 1px
units.set("zug",{height:25,width:100,men:83})
units.set("hBattalion",{height:100,width:100,men:500})
units.set("company",{height:75,width:75,men:250})

//drawsUnit can both create and convert a unit from one type to another
function drawUnit(type, teamColour, light=false, id=undefined){
	
	var unit;

	if (id == undefined){

		var unitId;

		var lastUnit = $(".unit").last().attr("id")

		if (lastUnit === undefined){
			unitId=0
		}else{
			unitId = parseInt(lastUnit.substring(5, lastUnit.length))+1	
		}

		$("#map div").append("<svg id='unit-"+unitId+"' class='unit new'></svg>")

		unit = $("#unit-"+unitId+".unit")
	}else{
		unit = $("#unit-"+id+".unit")
	}
	

	switch(type){
		case "zug":

			unit.css("width",units.get("zug").width+"px")
			unit.css("height",units.get("zug").height+"px")

			unit.html("<path fill='"+teamColour[0]+"' fill-rule='evenodd' stroke='none' stroke-width='1.33333' d='M 0,0 L 100,0 L 100,25 L 0,25 Z'/>")	

			break;
		case "hBattalion":
			
			unit.css("width",units.get("hBattalion").width+"px")
			unit.css("height",units.get("hBattalion").height+"px")

			unit.html("<path fill="+teamColour[2]+" fill-rule='evenodd' stroke='none' stroke-width='1.33333' d='M 0,0 L 100,0 L 100,100 L 0,100 Z '/>\n<path fill="+teamColour[0]+" fill-rule='evenodd' stroke='none' stroke-width='1.33333' d='M 0,0 L 100,0 L 100,50 L 0,50 Z'/>\n<path fill="+teamColour[1]+" fill-rule='evenodd' stroke='none' stroke-width='1.33333' d='M 0,100 L 100,50 L 100,100 Z'/>")	

			break;
		case "company":

			unit.css("width",units.get("company").width+"px")
			unit.css("height",units.get("company").height+"px")

			unit.html("<path fill="+teamColour[0]+" fill-rule='evenodd' stroke='none' stroke-width='1.33333' d='M 0,0 L 75,0 L 75,75 L 0,75 Z'/>\n<path fill="+teamColour[1]+" fill-rule='evenodd' stroke='none' stroke-width='1.33333' d='M 0,75 L 75,0 L 75,75 Z'/>")	
			break;
	}

	if (light===true){
		unit.toggleClass("light")
	}
}

//----------   map   ----------
//set up map
function start(mapUrl,units){
	//sets up map
	$("#map > img").attr("src",mapUrl)

}

//places new unit on the map
var placingUnit = false;
function newUnit(teamColour){
	if(placingUnit){
		drawUnit("zug",teamColour)
	}
	placingUnit = true;
}

$("#surface").mousemove(function(event){
	if(placingUnit===true){
		console.log(event.clientX)
		console.log(event.clientY)
		$(".new").css("left",event.clientX+"px")
		$(".new").css("top",event.clientY+"px")
	}
})

$("#surface").click(function(){
	if(placingUnit===true){
		$(".new").toggleClass("new");
		placingUnit=false
	}
})

