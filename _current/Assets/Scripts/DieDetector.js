#pragma strict

var respawnPoint:Transform;

function Start () {
}

function Update () {
}

function OnTriggerEnter (other : Collider) {
    
    
    //score
    var hitRecorder : HitRecorder = other.gameObject.GetComponent(HitRecorder);
    if(hitRecorder && hitRecorder.hitter){
    	hitRecorder.SendMessage("GetEffect", SendMessageOptions.DontRequireReceiver);
    } 
    
    if(other.gameObject.tag == "Player"){
    	//respawn
    	if(respawnPoint){
    		other.gameObject.transform.position = respawnPoint.position + Vector3(Random.Range(-1,1),0.0f,Random.Range(-1,1));
    		other.gameObject.rigidbody.velocity = Vector3.zero;
    	}
    }
    else{
    	//distory this
    	other.gameObject.SendMessageUpwards("SelfDestroy");
    }
}