#pragma strict

private var hitRecorder : HitRecorder;
private var emotionPerformer : EmotionPerformer;

function Start () {
	hitRecorder = gameObject.GetComponent(HitRecorder);
	emotionPerformer = gameObject.GetComponent(EmotionPerformer);
}

function Update () {
}

function OnCollisionEnter(collision : Collision) {
	
	if(collision.gameObject.tag == "RedBall"){
		
		//sound, trick: the one with greater x play sound
		
		
		
		var recorder : HitRecorder = collision.gameObject.GetComponent(HitRecorder);
		var playerProfile : PlayerProfile;
		if(!hitRecorder.hitter && recorder.hitter){
			//set color
			playerProfile = recorder.hitter.GetComponent(PlayerProfile);
			//gameObject.renderer.material.color = playerProfile.playerColor;
			emotionPerformer.Colored(playerProfile.playerColor);
			hitRecorder.hitter = recorder.hitter;
			hitRecorder.hitTime = recorder.hitTime;
		}
		else if(hitRecorder.hitter && recorder.hitter){
			/*
			// this is for speed judge
			var myV = rigidbody.velocity;
			var otherV = collision.gameObject.rigidbody.velocity;
			
			if(myV.x * myV.x + myV.z * myV.z <
				otherV.x * otherV.x + otherV.z * otherV.z){
				gameObject.renderer.material.color = Color.red;
				hitRecorder.hitter = recorder.hitter;
			}
			*/
			if(recorder.hitTime > hitRecorder.hitTime){
				playerProfile = recorder.hitter.GetComponent(PlayerProfile);
				//gameObject.renderer.material.color = playerProfile.playerColor;
				emotionPerformer.Colored(playerProfile.playerColor);
				hitRecorder.hitter = recorder.hitter;
				hitRecorder.hitTime = recorder.hitTime;
			}
		
		}
	}
}