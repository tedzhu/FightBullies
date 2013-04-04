#pragma strict

var focusOn : int;
var menuItem : Array;
var showMenu : boolean;

var backTexture : Texture2D;
var faceTexture : Texture2D;
var logoTexture : Texture2D;
var skin : GUISkin;

var areaWidth : int;
var areaHeight : int;

var logoPosition : Vector2;
var currentButton:int;
var leave:boolean;
var menuO:GameObject;
function Start () {
	currentButton=0;
	showMenu = false;
	leave=false;
	menuO=GameObject.Find("menu");
}

function Update () {
	if(showMenu&&(Input.GetKeyDown("down") || showMenu&&Input.GetKeyDown("up")))
	{
		Camera.mainCamera.audio.Play();
		currentButton=1-currentButton;
	}
	
	if(showMenu&&Input.GetKeyDown("return"))
	{
		menuO.audio.Play();
		if(currentButton==0)
		{
			showMenu = false;
			leave=true;
			Time.timeScale = 1.0f;
		}
		else
		{
			currentButton=0;
			Time.timeScale = 1.0f;
			leave=true;
			Application.Quit();
		}
	}
	if(!leave&&(GameObject.FindObjectOfType(cameraMove).menuIndex==2)&&Input.GetKeyDown("return"))
	{	
		menuO.audio.Play();
		Time.timeScale = 0.0f;
		showMenu=true;
		currentButton=0;
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
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), backTexture);
		GUI.DrawTexture(Rect(Screen.width - faceTexture.width, 
							Screen.height - faceTexture.height,
							faceTexture.width,
							faceTexture.height),
							faceTexture);
		//GUI.DrawTexture(Rect(logoPosition.x, logoPosition.y, logoTexture.width, logoTexture.height), logoTexture);
	
		var ScreenX = 200;
        var ScreenY = ((Screen.height * 0.5) - (areaHeight * 0.5)) ;

        GUILayout.BeginArea(Rect(ScreenX, ScreenY, areaWidth, areaHeight));

      /*   if(GUILayout.Button("Resume")){
            showMenu = false;
			Time.timeScale = 1.0f;
        }*/
        var newStyle:GUIStyle=GUI.skin.button;
        var normColor:Color=GUI.skin.button.normal.textColor;
 	    var onHoverColor:Color=GUI.skin.button.hover.textColor;	
        if(currentButton==0)
        {

 			newStyle.normal.textColor=onHoverColor;
 			GUILayout.Label("Back",newStyle);
 			newStyle.normal.textColor=normColor;
 			GUILayout.Label("Quit Game",newStyle);
        
        }
		else if(currentButton==1)
		{


 			newStyle.normal.textColor=normColor;
 			GUILayout.Label("Back",newStyle);
 			newStyle.normal.textColor=onHoverColor;
 			GUILayout.Label("Quit Game",newStyle);
 			newStyle.normal.textColor=normColor;
		}

        GUILayout.EndArea();
	}
}
