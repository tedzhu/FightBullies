#pragma strict

var focusOn : int;
var menuItem : Array;
var showMenu : boolean;

var backTexture : Texture2D;
var faceTexture : Texture2D;
var skin : GUISkin;


var areaWidth : int;
var areaHeight : int;


var leave:boolean;
var menuO:GameObject;

function Start () {
	showMenu = false;
	leave=false;
	menuO=GameObject.Find("menu");

}

function Update () {

	
	if(showMenu&&(Input.GetKeyDown("return") || Input.GetKeyDown(KeyCode.Escape)))
	{
		menuO.audio.Play();
		showMenu = false;
		Time.timeScale = 1.0f;
		leave=true;

	}
	if(!leave&&(GameObject.FindObjectOfType(cameraMove).menuIndex==1)&&Input.GetKeyDown("return"))
	{	
		menuO.audio.Play();
		Time.timeScale = 0.0f;
		showMenu=true;
	}
	else if(leave)
	{
		leave=!leave;
	}

}
function ShowMenu(){
/*	for(var item in menuItem){
		var item_t : GameObject = item as GameObject;
		item_t.guiText.enabled = true;
	}
*/
	showMenu = true;
}

function HideMenu(){
/*
	for(var item in menuItem){
		var item_t : GameObject = item as GameObject;
		item_t.guiText.enabled = false;
	}
*/
	showMenu = false;
}


function OnGUI(){
	if(showMenu){
		GUI.skin = skin;
		GUI.color.a = 1.0;
		//GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), backTexture);
		GUI.DrawTexture(Rect(0, 0,
							Screen.width,
							Screen.height),
						faceTexture);

	}
}
