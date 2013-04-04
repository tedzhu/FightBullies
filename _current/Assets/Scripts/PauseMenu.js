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
var currentButton: int;

var mouseOverSound : AudioClip;
var mouseClickSound : AudioClip;

function Start () {
/*
	menuItem = GameObject.FindGameObjectsWithTag("PauseMenu");
	focusOn = 0;
	var item : GameObject = menuItem[focusOn];
	item.SendMessage("Select");
	HideMenu();
*/
	showMenu = false;
	
}

function Update () {
	if(Input.GetKeyDown(KeyCode.Escape)){
		Time.timeScale = 0.0f;
	//	InvokeRepeating("pauseMenuUpdate",0,0.1);
		ShowMenu();
		currentButton=1;
	}
	if(showMenu&&Input.GetKeyDown("return"))
	{
		Camera.mainCamera.audio.PlayOneShot(mouseClickSound);
		if(currentButton==1)
		{
            showMenu = false;
			Time.timeScale = 1.0f;
		}
		else if(currentButton==2)
		{
            loadScript.loadedScene = Application.loadedLevelName;
           	Time.timeScale = 1.0f;
             Application.LoadLevel("loadScene");		
		}
		else if(currentButton==3)
		{
            Time.timeScale = 1.0f;
            Application.LoadLevel("Map");	
		}
	
	}
	else if(showMenu&&Input.GetKeyDown("down"))
	{
		if(currentButton<3)
			currentButton+=1;
		else
			currentButton=1;
			
		Camera.mainCamera.audio.PlayOneShot(mouseOverSound);
	}
	else if(showMenu&&Input.GetKeyDown("up"))
	{
		if(currentButton>1)
			currentButton-=1;
		else
			currentButton=3;
		Camera.mainCamera.audio.PlayOneShot(mouseOverSound);
	}
}

function pauseMenuUpdate(){
	if(Input.GetKeyDown("c")){
		print("down");
		var item : GameObject = menuItem[focusOn];
		item.SendMessage("DoAct");
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
		GUI.DrawTexture(Rect(logoPosition.x, logoPosition.y, logoTexture.width, logoTexture.height), logoTexture);
	
		var ScreenX = 100;
        var ScreenY = ((Screen.height * 0.5) - (areaHeight * 0.5)) ;

        GUILayout.BeginArea(Rect(ScreenX, ScreenY, areaWidth, areaHeight));

      /*   if(GUILayout.Button("Resume")){
            showMenu = false;
			Time.timeScale = 1.0f;
        }*/
        var newStyle:GUIStyle=GUI.skin.button;
        var normColor:Color=GUI.skin.button.normal.textColor;
 	    var onHoverColor:Color=GUI.skin.button.hover.textColor;	
        if(currentButton==1)
        {

 			newStyle.normal.textColor=onHoverColor;
 			GUILayout.Label("Resume",newStyle);
 			newStyle.normal.textColor=normColor;
 			GUILayout.Label("Restart Level",newStyle);
 			GUILayout.Label("Exit Level",newStyle);
        
        }
		else if(currentButton==2)
		{


 			newStyle.normal.textColor=normColor;
 			GUILayout.Label("Resume",newStyle);
 			newStyle.normal.textColor=onHoverColor;
 			GUILayout.Label("Restart Level",newStyle);
 			newStyle.normal.textColor=normColor;
 			GUILayout.Label("Exit Level",newStyle);		
		}
		else
		{
 			newStyle.normal.textColor=normColor;
 			GUILayout.Label("Resume",newStyle);		
 			GUILayout.Label("Restart Level",newStyle);
 			newStyle.normal.textColor=onHoverColor;
 			GUILayout.Label("Exit Level",newStyle);			
			newStyle.normal.textColor=normColor;
		}

        GUILayout.EndArea();
	}
}
