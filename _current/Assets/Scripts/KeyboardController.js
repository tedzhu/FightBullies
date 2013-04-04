#pragma strict

var leftKey : String;
var rightKey : String;
var powerKey : String;

private var leftDown : int;
private var rightDown : int;
private var powerDown : int;

function Start () {
	leftDown = 0;
	rightDown = 0;
	powerDown = 0;
}

function Update () {
	if(Input.GetKeyDown(leftKey) || Input.GetKeyDown(KeyCode.LeftArrow)){
		leftDown = 1;
	}
	if(Input.GetKeyDown(rightKey) || Input.GetKeyDown(KeyCode.RightArrow)){
		rightDown = 1;
	}
	if(Input.GetKeyDown(powerKey) || Input.GetKeyDown(KeyCode.UpArrow)){
		powerDown = 1;
	}
	if(Input.GetKeyUp(leftKey) || Input.GetKeyUp(KeyCode.LeftArrow)){
		leftDown = 0;
	}
	if(Input.GetKeyUp(rightKey) || Input.GetKeyUp(KeyCode.RightArrow)){
		rightDown = 0;
	}
	if(Input.GetKeyUp(powerKey) || Input.GetKeyUp(KeyCode.UpArrow)){
		powerDown = 0;
	}
}

function wantLeft():int{
	return leftDown;
}
function wantRight():int{
	return rightDown;
}
function wantPower():int{
	return powerDown;
}