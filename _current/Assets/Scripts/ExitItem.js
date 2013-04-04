#pragma strict

function Start () {

}

function Update () {

}

function Select(){
	guiText.material.color = Color.red;
}

function Deselect(){
	guiText.material.color = Color.white;
}

function DoAct(){
	Time.timeScale = 1.0f;
	gameObject.SendMessageUpwards("HideMenu");
}