#pragma strict

static var loadedScene : String;

var loadText : GUIText;

var tips : String[];
private var async : AsyncOperation;

function Start () {
	var index = Random.Range(0, tips.Length);
	loadText.text = "Loading...";
	guiText.text = tips[index];
	async = Application.LoadLevelAsync(loadedScene);
	yield async;
	loadText.text = "Press to Continue";
}


function Update () {
}
