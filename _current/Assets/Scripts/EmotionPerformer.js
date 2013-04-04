#pragma strict

private var preState : int;	// 0 for idle, 1 for sliding, 2 for color show
private var ballStick : BallStick;
var idleVelocity : float;
private var idleVelocity_2 : float;
private var stayTime : float;
private var curStateShow : int;
private var curState : int;

var idleMaterial : Material;
var idleSpeakTime : float;
var idleSpeak : int;

private var colorTime : float;
var colorShowTime : float;
var colorMaterial : Material;

//var emitterObject : GameObject;
private var emitter : ParticleEmitter;

var billboard : GameObject;

var questionair : GameObject;
var exclamation : GameObject;

private var transferAgent : TransferAgent;

function Start () {
	ballStick = gameObject.GetComponent(BallStick);
	idleVelocity_2 = idleVelocity * idleVelocity;
	preState = 0;
	curState = 1;
	curStateShow = 0;
	
	//emitter = emitterObject.GetComponent(ParticleEmitter);
	//emitter.emit = false;
	//billboard.renderer.enabled = false;
	if(questionair){
		questionair.SendMessage("Hide");
	}
	if(exclamation){
		exclamation.SendMessage("Hide");
	}
	//transferAgent = billboard.GetComponent(TransferAgent);
}

function Update () {
	
	if(curState == 2){	//judge if quit curState 2
		if(Time.time - colorTime > colorShowTime){
			curState = 0;
			//emitter.emit = false;
			//billboard.renderer.enabled = false;
			//transferAgent.Hide();
			if(exclamation){
				exclamation.SendMessage("Hide");
			}
		}
	}
	else{
		var velocity = rigidbody.velocity;
		var vel_2 = velocity.x * velocity.x + velocity.z * velocity.z;
	
		if(vel_2 < idleVelocity_2){
			curState = 0;
		}
		else{
			curState = 1;
		}
		
		if(curState != preState){	//state change
			//emitter.emit = false;
			//billboard.renderer.enabled = false;
			//transferAgent.Hide();
			if(curState == 0){	//enter state 0
				EnterIdle();
			}
			else{
				EnterSliding();
			}
		}
		else{	// in-state update
			if(curState == 0 && idleSpeak && Time.time - stayTime > idleSpeakTime){
				IdleSpeak();
			}
		}
	}
	preState = curState;
}

function Colored(color : Color){
//	emitter.renderer.material.color = color;
//	billboard.renderer.material.color = color;
	if(questionair){
		questionair.renderer.material.color = color;
	}
	if(exclamation){
		exclamation.renderer.material.color = color;
	}
	EnterColorSpeak(color);
}

function EnterColorSpeak(color : Color){
	curState = 2;
	colorTime = Time.time;
	//emitter.renderer.material = colorMaterial;
	//emitter.emit = true;
	
	//billboard.renderer.material = colorMaterial;
	//billboard.renderer.material.color = color;
	//billboard.renderer.material.SetColor('_TintColor',color);
	//billboard.renderer.enabled = true;
	//transferAgent.Show();
	if(questionair){
		questionair.SendMessage("Hide");
	}
	if(exclamation){
		exclamation.SendMessage("Show");
	}
	
}


function EnterIdle(){
	curState = 0;
	stayTime = Time.time;
	
}

function IdleSpeak(){
	//emitter.renderer.material = idleMaterial;
	//emitter.renderer.material.color = Color.white;
	//emitter.emit = true;
	
	//billboard.renderer.material = idleMaterial;
	//billboard.renderer.material.color = Color.white;
	//billboard.renderer.material.SetColor('_TintColor',Color.white);
	//billboard.renderer.enabled = true;
	//transferAgent.Show();
	if(questionair){
		questionair.SendMessage("Show");
	}
}

function EnterSliding(){
	curState = 1;
}