#pragma strict

private var playerProfile : PlayerProfile;

function Start () {
	playerProfile = gameObject.GetComponent(PlayerProfile);
}

function Update () {

}

function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.tag == "RedBall" || collision.gameObject.tag == "Player"){
		var hitRecorder : HitRecorder = collision.gameObject.GetComponent(HitRecorder);
		if(hitRecorder && gameObject){
			hitRecorder.hitter = gameObject;
			hitRecorder.hitTime = Time.time;
			//hitRecorder.SetHitter(gameObject);
			print("set hitter");
		}
		if(collision.gameObject.tag == "RedBall"){
			//collision.gameObject.renderer.material.color = playerProfile.playerColor;
			var emotionPerformer : EmotionPerformer = collision.gameObject.GetComponent(EmotionPerformer);
			if(emotionPerformer){
				emotionPerformer.Colored(playerProfile.playerColor);
			}
		}
	}
}