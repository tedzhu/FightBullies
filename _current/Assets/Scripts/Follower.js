#pragma strict

var follow : Transform;
var adjustHeight : int;
var height : float;

function Start () {
}

function SetFollow( tran : Transform){
	follow = tran;
}

function Update () {
	if(follow){
		transform.position.x = follow.position.x;
		transform.position.z = follow.position.z;
		if(adjustHeight){
			transform.position.y = follow.position.y + height;
			
		}
	}
}