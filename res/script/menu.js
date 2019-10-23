
//---------- scenario menu ----------

function senerioCreator(object){
	
	var action = object.getAttribute("data-menu-option");

	$(".active").removeClass("active")

	$(object).toggleClass("active");
	$("#menu").addClass("active");

	if(action == "senerioSetting" || action == "teamSetting"){
	
		$("#"+action).toggleClass("active");
	
	}
}