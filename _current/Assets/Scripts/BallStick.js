#pragma strict

enum BallState{
	idle,
	powering,
	hitting,
};

enum StrengthState{
	increase,
	decrease,
};

var aimRadius : float;
var ballRadius : float;
var maxStrength : float;
var hitVelocityThreshold : float;
var aimLineLength: float;

var stickModel : GameObject;
var aimLine : GameObject;
var strengthChangeSpeed : float;

var canControl : boolean;
var canControlRemainTime : float;

var greatForceDecal : Transform;
var originalMass : float;
var greatMassRemainTime : float;
var greatMassObject : GameObject;
var greatMassDecal : Transform;

var greatStrengthDecal : Transform;
var originalStrength : float;
var greatStrengthRemainTime : float;
var greatStrengthObject : GameObject;

var stickAcc : float;

var spark : GameObject;

var spotLight : GameObject;

var constantForceDecal : Transform;
var constantForceObject : GameObject;

private var stickV : float;
private var strengthState : StrengthState;
private var angle : float;
private var stickOffsetRadius : float;
private var curStrength : float;
private var state : BallState;

private var playerProfile : PlayerProfile;
private var hitVelocityThreshold_2 : float;
private var lineRenderer : LineRenderer;
private var controller : KeyboardController;
private var AIcontroller : SimpleAI;
private var aimMaterialOffset : float;

var curRotateVelocity : float;
var maxRotateVelocity : float;
var RotateVelocityAcc : float;

var stickBallSound : AudioClip;


function Start () {
	angle = 0.0f;
	stickOffsetRadius = aimRadius;
	curStrength = 0.0f;
	state = BallState.idle;
	strengthState = StrengthState.increase;
	playerProfile = gameObject.GetComponent(PlayerProfile);
	hitVelocityThreshold_2 = hitVelocityThreshold * hitVelocityThreshold;
	lineRenderer = aimLine.GetComponent(LineRenderer);
	controller = gameObject.GetComponent(KeyboardController);
	AIcontroller = gameObject.GetComponent(SimpleAI);
	
	stickV = 0.0f;
	aimMaterialOffset = 0.0f;
	canControl = false;
	
	canControlRemainTime = 0.0f;
	
	originalMass = rigidbody.mass;
	greatMassRemainTime = 0.0f;
	
	originalStrength = maxStrength;
	greatStrengthRemainTime = 0.0f;
	
}

function Update () {
	
	// effect timing
	if(canControl){
		canControlRemainTime -= Time.deltaTime;
		if(canControlRemainTime < 0.0f){
			canControlRemainTime = 0.0f;
			canControl = false;
			
			Destroy(constantForceObject);
			gameObject.SendMessage("RemoveState","Incredible Controller!");
		}
	}
	if(rigidbody.mass != originalMass){
		greatMassRemainTime -= Time.deltaTime;
		if(greatMassRemainTime < 0.0f){
			greatMassRemainTime = 0.0f;
			rigidbody.mass = originalMass;
			//other things
			Destroy(greatMassObject);
			gameObject.SendMessage("RemoveState","Super Mass!");
		}
	}
	if(maxStrength != originalStrength){
		greatStrengthRemainTime -= Time.deltaTime;
		if(greatStrengthRemainTime < 0.0f){
			greatStrengthRemainTime = 0.0f;
			maxStrength = originalStrength;
			
			Destroy(greatStrengthObject);
			gameObject.SendMessage("RemoveState","Mega Strength!");
		}
	}
	
	//check if the ball has stopped, ignore vertical speed
	var velocity_h : Vector3 = gameObject.rigidbody.velocity;
	velocity_h.y = 0.0f;
	
	// can control
	if( canControl || velocity_h.x * velocity_h.x + velocity_h.z * velocity_h.z < hitVelocityThreshold_2){
		
		//calculate position
		var dir = Vector3(-Mathf.Sin(angle), 0, Mathf.Cos(angle));
		dir.Normalize();
		stickModel.transform.position = transform.position + dir * (ballRadius + stickOffsetRadius);
		stickModel.transform.LookAt(transform.position, Vector3.up);
		
		//calculate line
		var sourcePosition = transform.position - dir * ( ballRadius );
		var destinationPosition = Vector3();
		var raycastHit : RaycastHit;
		if(Physics.Raycast( sourcePosition, -dir, raycastHit, aimLineLength)){
			destinationPosition = raycastHit.point;
			spark.renderer.enabled = true;
		}
		else{
			destinationPosition = sourcePosition - dir * aimLineLength;
			spark.renderer.enabled = false;
		}
		lineRenderer.SetPosition(0, sourcePosition);
		lineRenderer.SetPosition(1, destinationPosition);
		spark.transform.position = destinationPosition;
		spark.transform.LookAt(sourcePosition);
		
		spotLight.transform.position = destinationPosition + dir * 0.3;
		spotLight.transform.LookAt(destinationPosition);

		aimMaterialOffset -= 0.5f * Time.deltaTime;
		lineRenderer.material.mainTextureOffset = Vector2(1,0) * aimMaterialOffset;
		lineRenderer.material.mainTextureScale = Vector2((destinationPosition - sourcePosition).magnitude, 1); 
		
		Camera.mainCamera.SendMessage("SetOffsetDirection", dir);
		
		//control
		if(state == BallState.idle || state == BallState.powering)
		{
			var hasRotate = false;
			if( (controller && controller.wantLeft()) ||
				(AIcontroller && AIcontroller.wantLeft())){
				if(curRotateVelocity < maxRotateVelocity){
					curRotateVelocity += RotateVelocityAcc * Time.deltaTime;
				}
				hasRotate = true;
				angle += curRotateVelocity * Time.deltaTime;
			}
			if((controller && controller.wantRight()) ||
				(AIcontroller && AIcontroller.wantRight())){
				if(curRotateVelocity < maxRotateVelocity){
					curRotateVelocity += RotateVelocityAcc * Time.deltaTime;
				}
				hasRotate = true;
				angle -= curRotateVelocity * Time.deltaTime;
			}
			if( !hasRotate && curRotateVelocity > 0.0f){
				curRotateVelocity *= 0.8;
			}
			if( curRotateVelocity < 0.001f){
				curRotateVelocity = 0.0f;
			}
			if((controller && controller.wantPower()) ||
				(AIcontroller && AIcontroller.wantPower())){
				if(strengthState == StrengthState.increase){
					if(curStrength < maxStrength){
						curStrength += strengthChangeSpeed * Time.deltaTime;
						stickOffsetRadius += 0.8 * Time.deltaTime;
					}
					else{
						strengthState = StrengthState.decrease;
					}
				}
				else{
					if(curStrength > 0.0f){
						curStrength -= strengthChangeSpeed * Time.deltaTime;
						stickOffsetRadius -= 0.8 * Time.deltaTime;
					}
					else{
						strengthState = StrengthState.increase;
					}
				
				}
				state = BallState.powering;
			}
			else{
				if(state == BallState.powering){
					state = BallState.hitting;
				}
			}
		}
		else{
			stickV += stickAcc * Time.deltaTime;
			stickOffsetRadius -= stickV * Time.deltaTime;
			if(stickOffsetRadius < 0.005){
				hit( -dir * curStrength);
				curStrength = 0.0f;
				stickOffsetRadius = aimRadius;
				state = BallState.idle;
			}
		}
		
		//show
		if( aimLine.renderer.enabled == false){
			aimLine.renderer.enabled = true;
		}
		
		if( spark.particleEmitter.emit == false){
			spark.particleEmitter.emit = true;
		}
		
		if( stickModel.renderer.enabled == false){
			stickModel.renderer.enabled = true;
		}
	}
	else{
	
		curStrength = 0.0f;
		stickOffsetRadius = aimRadius;
	
		if( aimLine.renderer.enabled == true){
			aimLine.renderer.enabled = false;	
		}
		
		if( spark.particleEmitter.emit == true){
			spark.particleEmitter.emit = false;
		}
	
		if( stickModel.renderer.enabled == true){
			stickModel.renderer.enabled = false;
		}
	}
		
}

function hit(force : Vector3){
	audio.PlayOneShot(stickBallSound);
	rigidbody.AddForce(force);

}

function ConstantControl(time : float){
	canControlRemainTime = time;
	
	if(!canControl){
		canControl = true;
	
		var rotate : Quaternion = new Quaternion();
		rotate.SetLookRotation(Vector3.down);
		var temp : Transform = Instantiate(constantForceDecal, transform.position, rotate);
		temp.gameObject.SendMessage("SetFollow", transform);
		constantForceObject = temp.gameObject;
		
		gameObject.SendMessage("AddState","Incredible Controller!");
	}
}

function GainMass(args : Object){

	var array : Array = args as Array;
	var amount : int = array[0];
	var duration : int = array[1];

	if( (rigidbody.mass - originalMass)*(rigidbody.mass - originalMass) < 0.01f){
		var rotate : Quaternion = new Quaternion();
		rotate.SetLookRotation(Vector3.down);
		var temp : Transform = Instantiate(greatMassDecal, transform.position, rotate);
		temp.gameObject.SendMessage("SetFollow", transform);
		greatMassObject = temp.gameObject;
		gameObject.SendMessage("AddState","Super Mass!");
	}
	
	greatMassRemainTime = duration;
	rigidbody.mass = originalMass + amount;
} 

function GainStrength(args : Object){
	var array : Array = args as Array;
	var amount : int = array[0];
	var duration : int = array[1];


	
	if( (maxStrength - originalStrength)*(maxStrength - originalStrength) < 0.01f){
		var rotate : Quaternion = new Quaternion();
		rotate.SetLookRotation(Vector3.down);
		
		var temp : Transform = Instantiate(greatStrengthDecal, transform.position, rotate);
		temp.gameObject.SendMessage("SetFollow", transform);
		greatStrengthObject = temp.gameObject;
		
		gameObject.SendMessage("AddState","Mega Strength!");
	}
	
	maxStrength = originalStrength + amount;
	greatStrengthRemainTime = duration;
}

function CanBeControlled(): boolean{

	var velocity_h : Vector3 = gameObject.rigidbody.velocity;
	velocity_h.y = 0.0f;
	
	// can control
	return (canControl || velocity_h.x * velocity_h.x + velocity_h.z * velocity_h.z < hitVelocityThreshold_2);
}

function GetHitDirection(): Vector3{
	return  -Vector3(-Mathf.Sin(angle), 0, Mathf.Cos(angle));
}

function GetCurStrength() : float{
	return curStrength;
}

function GetStrengthState() : StrengthState{
	return strengthState;
}