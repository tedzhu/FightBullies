#pragma strict

function Start () {

}

function Update () {

}

function Select(){
	guiText.renderer.material.color = Color.red;
}

function Deselect(){
	guiText.renderer.material.color = Color.white;
}

function DoAct(){
	Time.timeScale = 1.0f;
	gameObject.SendMessageUpwards("HideMenu");
}