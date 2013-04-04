#pragma strict

var ballBall : AudioClip;
var ballEdge : AudioClip;

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {
	if(collision.collider.tag == "RedBall" || collision.collider.tag == "Player"){
		if(collision.collider.transform.position.x < transform.position.x){
			audio.PlayOneShot(ballBall);
		}
	}
	else{// if(collision.collider.tag == "Edge"){
		audio.PlayOneShot(ballEdge);
	}

}