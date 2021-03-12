
//VARIABLES ------------
var triangle = document.querySelector("#triangle");
var rules_close = document.querySelector("#rules_header div");
var rules = document.querySelector("#rules");
var rules_open = document.querySelector("#rules_span");
var body = document.querySelector("body");
var bg_opacity = document.querySelector("#bg_opacity");
var paper = document.querySelector(".paper");
var rock = document.querySelector(".rock");
var scissors = document.querySelector(".scissors");
var chosen_element = undefined;
var chosen_elements_array = "";
var rock_2 = document.querySelector("#rock_2");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var draw = document.querySelector(".draw");
var play_again = document.querySelectorAll(".play_again");
var score = 0;
var score_dom = document.querySelector("#score span:nth-child(2)");
var you = document.querySelector("#you");
var house = document.querySelector("#house");
var win_background_container = document.querySelector("#win_background_container");

var rps_array = [paper,rock,scissors];


//EVENT LISTENERS -------------------------
rules_close.onclick = ()=>{
	rules.style.visibility = "hidden";
	body.style.backgroundColor = "var(--gradient_bg)";
	bg_opacity.style.visibility = "hidden";
}

rules_open.onclick = ()=>{
	if(window.getComputedStyle(rules).getPropertyValue("visibility")=="visible"){
		rules.style.visibility = "hidden";
		body.style.backgroundColor = "var(--gradient_bg)";
		bg_opacity.style.visibility = "hidden";
	}else{
		rules.style.visibility = "visible";
		body.style.backgroundColor = "var(--gradient_bg_2)";
		bg_opacity.style.visibility = "visible";
	}
}



//FIRST STEP--------------------
rps_array.forEach(element=>{
	element.addEventListener("click", ()=>{
		chosen_elements_array = "";
		if(window.getComputedStyle(rules).getPropertyValue("visibility")=="hidden"){
			var element_position = element.getBoundingClientRect();
			triangle.style.visibility = "hidden";
			chosen_element = element.className;
			chosen_elements_array = chosen_element;
			var element_clone = element.cloneNode(true);
			element_clone.style.position = "absolute";
			element_clone.style.top = element_position.top + window.scrollY + "px"; 
			element_clone.style.left = element_position.left + window.scrollX + "px";
			body.appendChild(element_clone);
			element_clone.style.animation = "first_step_move 1s 1 forwards ease-in-out";
			second_step_appear(element_clone);
			
		}
	});
});


function second_step_appear(element_clone){
	var random_number = Math.floor(Math.random()*3);
	var element_house_clone = rps_array[random_number].cloneNode(true);
	chosen_elements_array += element_house_clone.className;
	setTimeout(()=>{
		rock_2.style.visibility = "visible";
	},1000);
	setTimeout(()=>{
		element_house_clone.style.position = "absolute";
		element_house_clone.classList.add("element_house_clone");
		body.appendChild(element_house_clone);
		element_house_clone.style.animation = "second_step_appear 1s 1 forwards ease-in-out";
	},1500);
	
	setTimeout(()=>{
		element_clone.style.left = element_clone.getBoundingClientRect().left + "px";
		element_clone.style.animation = "move_left 0.3s 1 forwards ease-in-out";
		element_clone.classList.add("clone");
		element_house_clone.classList.add("clone");
		element_clone.classList.add("element_clone");
		element_house_clone.style.animation = "move_right 0.3s 1 forwards ease-in-out";
		
		rock_2.style.visibility = "hidden";
		you.style.visibility = "visible";
		house.style.visibility = "visible";
		pick_winner();
		setTimeout(()=>{
			element_house_clone.style.animation = "";
			element_house_clone.classList.add("element_house_clone_post_animation");
			element_clone.style.animation = "";
			element_clone.style = "";
			element_clone.classList.add("element_clone_end");
		},300);
		
	},2900);	
}


function pick_winner(){
	var result;
	
	switch(chosen_elements_array){
		case "scissorsrock":
			result = "lose";
			break;
		case "scissorsscissors":
			result = "draw";
			break;
		case "scissorspaper":
			result = "win";
			break;
			
		case "rockrock":
			result = "draw";
			break;
		case "rockpaper":
			result = "lose";
			break;
		case "rockscissors":
			result = "win";
			break;
			
		case "paperpaper":
			result = "draw";
			break;
		case "paperrock":
			result = "win";
			break;
		case "paperscissors":
			result = "lose";
			break;
	}
	if(result == "win"){
		win.style.visibility = "visible";
		score++;
	}else if(result == "lose"){
		lose.style.visibility = "visible";
		score--;
	}else{
		draw.style.visibility = "visible";
	}
	score_dom.innerHTML = score;
	
	set_winning_background(result);
	
}


function set_winning_background(result){
	if(result=="draw"){return;}
	var background = document.createElement("div");
	background.classList.add("rock");
	background.classList.add("background");
	background.classList.add("clone"); 
	background.style.backgroundColor = "rgb(31, 55, 86)";
	if(result == "win"){
		background.classList.add("background_left");
	}else if(result=="lose"){
		background.classList.add("background_right");
	}
	var background_2 = document.createElement("div");
	var background_3 = document.createElement("div");
	background_2.classList.add("rock");
	background_2.style.backgroundColor = "rgb(31, 55, 86)";
	
	background_2.style.transform = "scale(0.8)";
	background.appendChild(background_2);
	
	background_3.classList.add("rock");
	background_3.style.backgroundColor = "rgb(31, 55, 86)";
	background_3.style.transform = "scale(0.73)";
	background_2.appendChild(background_3);
	setTimeout(()=>{win_background_container.appendChild(background);},500);
	setTimeout(()=>{change_color(background_3,95,86);},500);
	setTimeout(()=>{change_color(background_2,110,95);},800);
	setTimeout(()=>{change_color(background,130,110);},1100);
}


function change_color(background,x,y){
	//rgb(31, 55, 86)
	
	setInterval(()=>{
		if(y<x){
			y+=4;
			background.style.backgroundColor = "rgb(31,55,"+y+")";
		}
	},100);
}




//PLAY AGAIN ----------
play_again.forEach(play=>{
	play.addEventListener("click", ()=>{
		var clones = document.querySelectorAll(".clone");
		clones.forEach(clone=>{
			if(clone == document.querySelector("#win_background_container .clone")){
				win_background_container.removeChild(clone);
			}else{
				body.removeChild(clone);
			}
		});
		
		win.style.visibility = "hidden";
		lose.style.visibility = "hidden";
		draw.style.visibility = "hidden";
		triangle.style.visibility = "visible";
		you.style.visibility = "hidden";
		house.style.visibility = "hidden";
	});
});


