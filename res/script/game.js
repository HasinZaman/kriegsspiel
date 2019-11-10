

//---------- login ----------

//gets all public game info
function gameInfoRequest(){
	var connection = $.ajax({
		url: "res/script/post.php",
		type: "POST",
		data: {method:"publicGameInfo"}
	}).done(gameInfoReciver)
}

function gameInfoReciver(reciver){
	console.log(reciver)
	result = JSON.parse(reciver)

	teams = result["scenarioTeams"]

	for (var i1 = 0; i1 < teams.length; i1++){
		$("#login.sub-menu").append("<label onclick='teamSelect(this)' data-team-id='"+teams[i1]["id"]+"'>"+teams[i1]["name"]+"</label>")
	}

	unitScale = result["scenarioScale"]

	$("#senerioInfo.sub-menu h1").text(result["scenarioTitle"])
	$("#senerioInfo.sub-menu p").text(result["scenarioDesc"])

	mapLoad(result["scenarioMap"])

}

//select team to login to
function teamSelect(element){
	$(".login").remove()
	$(element).after("<div class='login'><label>Password:</label><input type='text' name='Password'><button onclick='teamLogin(\""+$(element).attr("data-team-id")+"\")'>Submit</button></div>")
}

//logins the user to there chosen team
function teamLogin(selectedTeamId){

	inputPassword = $("#login.sub-menu input[type='text']").val()

	var connection = $.ajax({
		url: "res/script/post.php",
		type: "POST",
		data: {method:"teamLogin", team: selectedTeamId, password: inputPassword}
	}).done(teamLoginReciver)
}
function teamLoginReciver(reciver){
	console.log(reciver)
	if(reciver === 0){
		//fail

 	}else{
 		$("body").append(reciver)
 	}
}

//on page load
gameInfoRequest()
