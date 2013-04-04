#pragma strict



var hitPlayerPercent : int;
var angelAccuracy : float;

private var ballStick : BallStick;
private var curTarget : GameObject;

private var isWantLeft : boolean;
private var isWantRight : boolean;
private var isWantStrength : boolean;


function Start () {
	ballStick = GetComponent(BallStick);

}

function Update () {
	
	if(ballStick.CanBeControlled()){
		if(!curTarget){
			//find a target
			curTarget = findATarget();
		}
		if(!curTarget){	//still no target
			return;
		}
		
		//check if aim to it
		var targetPosition : Vector3 = curTarget.transform.position;
		var deltaV : Vector3 = targetPosition - transform.position;
		deltaV.y = 0.0f;
		var iDirection = ballStick.GetHitDirection(); // find my direction
		iDirection.y = 0.0f;
		
		var angle : float = Vector3.Angle( iDirection, deltaV);
		if( angle > angelAccuracy){	//must turn
			var cross = Vector3.Cross(iDirection, deltaV).y;
			if(cross < 0.0f){
				isWantLeft = true;
				isWantRight = false;
				isWantStrength = false;
			}
			else{
				isWantLeft = false;
				isWantRight = true;
				isWantStrength = false;
			}
			return;
		}
		
		//check if get power
		var curStrength = ballStick.GetCurStrength(); //get strength
		var curStrengthState = ballStick.GetStrengthState(); // get strength change state
		if(curStrengthState == StrengthState.increase || curStrength < 0.01f){ //increasing and none
			isWantLeft = false;
			isWantRight = false;
			isWantStrength = true;
		}
		else{
			isWantLeft = false;
			isWantRight = false;
			isWantStrength = false;	
		}
	}
	else{
		// reset all
		curTarget = null;
		isWantLeft = false;
		isWantRight = false;
		isWantStrength = false;

	}

}

function wantLeft():boolean{
	return isWantLeft;
}
function wantRight():boolean{
	return isWantRight;
}
function wantPower():boolean{
	return isWantStrength;
}

function findATarget():GameObject{
	//TODO: take a probability to hit player. Be careful don't pick up yourself
	var seed = Random.Range(0, 100);
	if(seed < hitPlayerPercent){
		var players = GameObject.FindGameObjectsWithTag("Player");
		if(players.Length > 0){
			var playerIndex = Random.Range(0, players.Length);
			if(players[playerIndex] != gameObject){
				return players[playerIndex];
			}
		}
	}
	
	var redballs = GameObject.FindGameObjectsWithTag("RedBall");
	if(redballs.Length > 0){
		var index = Random.Range(0, redballs.Length);
		return redballs[index];
	}
	else{
		return null;
	}
}