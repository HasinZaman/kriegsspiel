
//---------- scenario menu ----------

function senerioCreator(object){
	
	var action = object.getAttribute("data-menu-option");

	if($(object).hasClass("active")){
		$(".active").removeClass("active")
	}else{
		$(".active").removeClass("active")

		$(object).toggleClass("active");
		$("#menu").addClass("active");

		if(action == "senerioSetting" || action == "teamSetting"){
		
			$("#"+action).toggleClass("active");
		
		}else if(action === "placeUnit"){
			try{
				if(teams.length>1){
					newUnit([teams[1].primaryColour,teams[1].secondaryColour,teams[1].highlightColour])
				}else{
					alert("there are no teams")
				}
				
			}catch(error){

				if(error.toString(0,45) === "TypeError: Cannot read property '1' of undefined"){
					alert("there are no teams")	
				}else{
					console.log(error)
				}
			 	
			}
			$(".active").removeClass("active")	
		}else if(action === "save"){
			console.log(teams)
			console.log(units)
			console.log(unitScale)
			console.log(senerioToken)
			console.log(mapURL)
			console.log($("#senerioSetting.sub-menu #senerioDesc").val())

			//todo list upload
			//	- teams
			//	- Units
			//	- Unit scale
			//	- senerio token
			//	- map url
			//	- description
		}
	}
}