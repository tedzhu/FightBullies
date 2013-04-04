#pragma strict

var lookAtObject : Transform;
var curLookAtPosition : Vector3;
var radius : float;
var height : float;
var offsetDirection : Vector3;
var curOffsetDirection : Vector3;

function Start () {
	offsetDirection = Vector3(0.0f, 0.0f, -1.0f);
}

function Update () {
	var deltaV : Vector3 = lookAtObject.position - curLookAtPosition;
	deltaV.y = 0.0f;
	var deltaDir : Vector3 = offsetDirection - curOffsetDirection;
	
	
	//if(deltaV.x * deltaV.x + deltaV.z * deltaV.z > 0.01){
		curLookAtPosition += deltaV * 0.4;
		curOffsetDirection += deltaDir * 0.4;
		curOffsetDirection.Normalize();
		transform.position = curLookAtPosition + curOffsetDirection * radius + Vector3(0.0f, 1.0f, 0.0f)*height;
		transform.LookAt(lookAtObject.position, Vector3.up);
	
	//}	
}

function SetOffsetDirection(dir : Vector3){
	offsetDirection = dir;
}