#pragma strict

enum State{
	showing,
	hiding,
};
var state : State;
var changeSpeed : float;
var alpha : float;

private var maxScale : float;

var ep : float;

function Start () {
	state = State.hiding;
	renderer.material.color = Color.white;
	alpha = 1.0;
	maxScale = transform.localScale.x;
}

function Update () {
	if(state == State.showing){
		renderer.enabled = true;
		
		if(alpha < 1.0f){
			alpha += (1.0f - alpha)*changeSpeed;
		}
		if(alpha >= 1.0f - ep){
			alpha = 1.0f;
		}
		//renderer.material.color.a = alpha;
		transform.localScale = Vector3.one * alpha * maxScale;
	}
	else{	//hiding
		if(alpha > 0.0f){
			alpha -= alpha * changeSpeed;
		}
		if(alpha <=0.0f + ep){
			alpha = 0.0f;
			renderer.enabled = false;
		}
		//renderer.material.color.a = alpha;
		transform.localScale = Vector3.one * alpha * maxScale;
	}
	
}

function Show(){
	state = State.showing;
}

function Hide(){
	state = State.hiding;
}