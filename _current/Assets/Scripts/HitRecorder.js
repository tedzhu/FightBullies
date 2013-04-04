#pragma strict

enum FallEffect{
	GetScore,
	ConstantControl,
	GreatMass,
	GreatStrength,
};

var hitter : GameObject; 
var hitTime : float;
var fallEffect : FallEffect;
var effectAmount : float;
var effectDuration : float;

function Start () {
	hitter = null;
}

function Update () {

}

function SetHitter(hit : GameObject){
	hitter = hit;
}

function GetEffect(){
	if(!hitter){
		return;
	}
	var args : Array;
	if(fallEffect == FallEffect.GetScore){
		hitter.SendMessage("AddScore", effectAmount);
	}
	else if(fallEffect == FallEffect.ConstantControl){
		hitter.SendMessage("ConstantControl", effectDuration);
	}
	else if(fallEffect == FallEffect.GreatMass){
		args = [effectAmount, effectDuration];
		hitter.SendMessage("GainMass", args);
	}
	else if(fallEffect == FallEffect.GreatStrength){
		args = [effectAmount, effectDuration];
		hitter.SendMessage("GainStrength", args);
	}
}