#pragma strict

var maxForce : float;

function Start () {

}

function Update () {	
	
}

function FixedUpdate(){
	
	var force = Vector3.zero;
	if(Input.GetKeyDown("a")){
		force -= Camera.mainCamera.transform.right;
	}
	if(Input.GetKeyDown("d")){
		force += Camera.mainCamera.transform.right;
	}
	if(Input.GetKeyDown("w")){
		force += Camera.mainCamera.transform.forward;
	}
	if(Input.GetKeyDown("s")){
		force -= Camera.mainCamera.transform.forward;
	}
	
	force.Normalize();
	force *= maxForce;
	
	rigidbody.AddForce(force.x, 0.0f, force.z);
}