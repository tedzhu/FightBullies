#pragma strict
var winText : GUIText;
var winnerText : GUIText;
var toContinue : GUIText;

var winTextTime : float;

private var end : boolean;

function Start () {
	end = false;
	winText.enabled = false;
	winnerText.enabled = false;
	toContinue.enabled = false;
	InvokeRepeating("WinnerDetect", 2.0f, 2.0f);
}

function Update () {
	if(end){
		winTextTime -= Time.deltaTime;
		if(winTextTime < 0.0f || Input.GetKeyDown(KeyCode.Return)){
			Time.timeScale = 1.0f;
			Application.LoadLevel("Map");
		}
	}
}

function WinnerDetect(){
	var redballs = GameObject.FindGameObjectsWithTag("RedBall");
	if(redballs.length == 0){
		CancelInvoke();
		
		// end the game
		var players = GameObject.FindGameObjectsWithTag("Player");
		var maxScore = -1;
		var winner = "";
		var winnerColor : Color;
		for( var player in players){
			var scoreRecorder = player.GetComponent(ScoreRecorder);
			if(scoreRecorder.score > maxScore){
				maxScore = scoreRecorder.score;
				var playerProfile = player.GetComponent(PlayerProfile);
				winner = playerProfile.playerName;
				winnerColor = playerProfile.playerColor;
			}
		}
		
		winText.material.color = winnerColor;
		winnerText.material.color = winnerColor;
		winText.enabled = true;
		winnerText.enabled = true;
		toContinue.enabled = true;
		winnerText.text = " "+winner;
		animation.Play("winAnimation");
		
		end = true;
		
		
	}
}