var morpion = {
	scoreJ1: 0,
	scoreJ2: 0,
	pion: "O",
	fin: false,
	grille : [0,1,2,3,4,5,6,7,8],
	verifScore: function(){
		if ((this.grille[0]===this.grille[1] && this.grille[1]===this.grille[2])
		||(this.grille[3]===this.grille[4] && this.grille[4]===this.grille[5])
		||(this.grille[6]===this.grille[7] && this.grille[7]===this.grille[8])
		||(this.grille[0]===this.grille[3] && this.grille[3]===this.grille[6])
		||(this.grille[1]===this.grille[4] && this.grille[4]===this.grille[7])
		||(this.grille[2]===this.grille[5] && this.grille[5]===this.grille[8])
		||(this.grille[0]===this.grille[4] && this.grille[4]===this.grille[8])
		||(this.grille[2]===this.grille[4] && this.grille[4]===this.grille[6])
		){
			this.fin = true

			if (this.pion === "X"){
				this.scoreJ1++
				document.getElementById("aff_score").innerHTML = "Score "+this.scoreJ1+" : "+this.scoreJ2
				document.getElementById("message").innerHTML = "<div class='alert alert-success'><p id='message_j'><strong>Joueur 1</strong> a gagné</p></div>"
			}else{
				this.scoreJ2++
				document.getElementById("aff_score").innerHTML = "Score "+this.scoreJ1+" : "+this.scoreJ2
				document.getElementById("message").innerHTML = "<div class='alert alert-success'><p id='message_j'><strong>Joueur 2</strong> a gagné</p></div>"
			}
		}
	},
	changeTour: function(){
		this.pion === "X" ? this.pion="O":this.pion="X"
	},
	nouvellePartie: function(){
		this.grille = [0,1,2,3,4,5,6,7,8]
		document.getElementById("aff_score").innerHTML = "Score "+morpion.scoreJ1+" : "+morpion.scoreJ2

		for (i=0;i<9;i++)
			document.getElementById("i"+i).innerHTML = ""

		document.getElementById("message").innerHTML = ""
		this.fin = false
	},
	partieAvecIA: function(){
		function posePionIA()
		{
			;
		}
		function verifIA(p,g)
		{
			let ptsJ = 0; let ptsIA = 0;
			let horizIA = 0;let horizJ = 0;let vertIA = 0;let vertJ = 0;let ascIA = 0;let ascJ = 0;let descIA = 0;let descJ = 0;
			for(let i=0;i<8;i++){
				//ligne horizontale
				if(i%3==2){horizIA=0;horizJ=0;}
				if(g[i]===g[i+1]){g[i]===p?(horizIA++,horizJ=0):(horizJ++,horizIA=0);}
				if(horizIA === 1 && ptsIA<10)ptsIA=10;if(horizJ === 1)ptsJ=10;
				if(horizIA === 2 && ptsIA<100)ptsIA=100;if(horizJ === 2)ptsJ=100;
				//ligne verticale
				if(i<=6 && g[i]===g[i+3]){g[i]==p?(vertIA++,vertJ=0):(vertJ++,vertIA=0);}
				if(vertIA === 1 && ptsIA<10)ptsIA=10;if(vertJ === 1 && ptsIA<10)ptsJ=10;
				if(vertIA === 2 && ptsIA<100)ptsIA=100;if(vertJ === 2 && ptsJ<100)ptsJ=100;
			}
			//diagonale ascendante
			if(g[0]===g[4]){g[0]==p?ascIA++:ascJ++;}
			if(g[4]===g[8]){g[4]==p?ascIA++:ascJ++;}
			//diagonale descendante
			if(g[2]===g[4]){g[2]==p?descIA++:descJ++;}
			if(g[4]===g[6]){g[4]==p?descIA++:descJ++;}
			//Attribution pts diagonale
			if(ascIA === 1 || descIA === 1 && ptsIA<10)ptsIA=10;if(ascJ === 1 || descJ === 1 && ptsJ<10)ptsJ=10;
			if(ascIA === 2 || descIA === 2 && ptsIA<100)ptsIA=100;if(ascJ === 2 || descJ === 2 && ptsJ<10)ptsJ=100;

			return [ptsIA,ptsJ];
		}
		console.log(this.grille);
	}
}

var mettrePion = (id)=>{
	let _id = id.charAt(id.length-1)
	if (!morpion.fin)
	{
		if (morpion.grille[_id]!="X" && morpion.grille[_id]!="O")
		{
			morpion.grille[_id] = morpion.pion
			document.getElementById("message").innerHTML = ""
			if (morpion.pion === "O")
				document.getElementById("i"+_id).innerHTML = "<i class='far fa-circle iconO p-3'></i>"
			else
				document.getElementById("i"+_id).innerHTML = "<i class='fas fa-times iconX p-3'></i>"
			morpion.changeTour()
		}else
			document.getElementById("message").innerHTML = "<div class='alert alert-danger'><p>La place est occupée</p></div>"
		
		morpion.verifScore()
	}
}

var nouvellePartie = ()=>{
	morpion.scoreJ1 = 0
	morpion.scoreJ2 = 0
	morpion.nouvellePartie()
}

var continueJeu = ()=>{
	morpion.nouvellePartie()
}

var partieIA = ()=>{
	morpion.partieAvecIA()
}

/* Onglets */
function openTab(evt, name) {
	// Declare all variables
	var i, tabcontent, tablinks;
  
	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
  
	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
  
	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(name).style.display = "block";
	evt.currentTarget.className += " active";
  }