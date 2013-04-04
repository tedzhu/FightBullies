#pragma strict

var followee : Transform;

function Start () {

}

function Update () {
	if(followee){
		transform.position.x = followee.position.x;
		transform.position.z = followee.position.z;
	}
}