#pragma strict

var explosionRadius : float;
var power : float;
var state : int;
var igniteTime : float;
var explodeTime : float;


var ignitePartical : GameObject;
var explodePartical : Transform;
var igniteSound : AudioClip;

function Start () {
	state = 0;
}

function Update () {
	if(state == 1){
		if(Time.time - igniteTime > explodeTime){
			Explode();
		}
	}
}

function OnCollisionEnter(collision : Collision) {

	if(collision.gameObject.tag == "RedBall"
		|| collision.gameObject.tag == "Player"){
		Ignite();
	}


}

function Ignite(){
	state = 1;
	igniteTime = Time.time;
	//do something
	if(ignitePartical){
		ignitePartical.particleEmitter.emit = true;
		ignitePartical.light.enabled = true;
	}
	
	audio.loop = true;
	audio.PlayOneShot(igniteSound);
}

function Explode(){


	var colliders : Collider[] = Physics.OverlapSphere(transform.position, explosionRadius);
	for(var hit : Collider in colliders){
		if(!hit)
			continue;
		if(hit.rigidbody){
			hit.rigidbody.AddExplosionForce(power, transform.position, explosionRadius, 0.0f);
		}
	}
	
	if(explodePartical){
		var temp : Transform = Instantiate(explodePartical, transform.position, transform.rotation);
		temp.particleEmitter.emit = true;
	}
	SendMessageUpwards("SelfDestroy");
}