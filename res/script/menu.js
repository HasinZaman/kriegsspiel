
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
				newUnit([teams[0][1],teams[0][2],teams[0][3]])
				$(".active").removeClass("active")
			}catch(error){

				if(error.toString(0,45) === "TypeError: Cannot read property '1' of undefined"){
					alert("there are no teams")	
				}else{
					console.log(error)
				}
			 	
			}
		}
	}
}