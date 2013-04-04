#pragma strict

var score : int;
var text : GUIText;
var gainScoreBeam : Transform;
var gainScoreFlash: Transform;
var state : Array;

function Start () {
	state = new Array();
	var profile : PlayerProfile = gameObject.GetComponent(PlayerProfile);
	text.material.color = profile.playerColor;

	score = 0;
	if(text){
		text.text = "" + score;
	}
}

function Update () {

}

function AddScore(amount : float){
	score += amount;
	updateText();
	
	Instantiate(gainScoreBeam, transform.position + Vector3(0.0f, 5.0f, 0.0f), transform.rotation);
	var light : Transform = Instantiate(gainScoreFlash, transform.position, transform.rotation);
	light.gameObject.SendMessage("SetFollow",transform);
}

function AddState( theState : String){
	state.Add(theState);
	updateText();
}

function RemoveState(theState : String){
	state.remove(theState);
	updateText();
}

function updateText(){
	if(text){
		text.text = "" + score + "\n";
		var i=0;
		for(i=0; i<state.length; i++){
			text.text += state[i] + "\n";
		}
	}
}