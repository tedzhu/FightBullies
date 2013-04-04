
#pragma strict
var destDir:Vector3;
var destHeight:float=10;
var levelIndex:int=0;
var levelN:int=5;

var dDirThresh:float=0.05;
var dHeightThresh:float=10;
var damping:float=6.0;

var currMenuScale=new float[4];
var destMenuScale=new float[4];
var menuIndex:int=0;
var menuN:int=3;
var textFlag:boolean;

var sceneName : String[];
var earth:GameObject;
var menuO:GameObject;
var hint:GameObject;
var nameL:GameObject;
var turnUp=0.9f;
var names=new String[5];
function Start () {
	menuIndex=0;
	levelIndex=0;
	earth=GameObject.Find("earthUI");
	menuO=GameObject.Find("menu");
	hint=GameObject.Find("Hint");
	nameL=GameObject.Find("Name");
	hint.guiText.material.color.a=0;
	nameL.guiText.material.color.a=0;
	textFlag=false;
	names[0]="";
	names[1]="Playground";
	names[2]="Forest";
	names[3]="Antarctic";
	names[4]="Coming Soon: Dessert";
	
}

function Update () {		
	//select menu
	if(GameObject.FindObjectOfType(quitItem).showMenu==true|| GameObject.FindObjectOfType(creditItem).showMenu==true)
		return;
	if(levelIndex==0){
		if(Input.GetKeyDown(KeyCode.DownArrow) || Input.GetKeyDown(KeyCode.Space)){
			menuIndex+=1;
			Camera.mainCamera.audio.Play();
			
		}else if(Input.GetKeyDown(KeyCode.UpArrow)){
			menuIndex+=menuN-1;
			Camera.mainCamera.audio.Play();
		}
		
		menuIndex=menuIndex%menuN;
	}
	
	//select level
	if(menuIndex==0){
		if(Input.GetKeyDown(KeyCode.LeftArrow)){
			hint.guiText.material.color.a=0;
			nameL.guiText.material.color.a=0;
			textFlag=false;
			earth.audio.Play();
			levelIndex+=1;	
								
		}else if(Input.GetKeyDown(KeyCode.RightArrow)){
			hint.guiText.material.color.a=0;
			nameL.guiText.material.color.a=0;
			textFlag=false;
			earth.audio.Play();
			levelIndex-=1;
		}
		else if(Input.GetKeyDown(KeyCode.Return)){
			if(levelIndex>0 && levelIndex <= sceneName.Length){
				hint.guiText.material.color.a=0;
				nameL.guiText.material.color.a=0;
				nameL.guiText.text=names[levelIndex];
				textFlag=false;
				menuO.audio.Play();
				loadScript.loadedScene = sceneName[levelIndex-1];
				Application.LoadLevel("loadScene");
			}
		}
		levelIndex=(levelIndex+levelN)%levelN;	
		nameL.guiText.text=names[levelIndex];			
	}	
	var p:float;
	p=Time.deltaTime*damping;
	
	// menu
	var i:int;
	for(i=0;i<menuN;i++){
		currMenuScale[i]=GameObject.Find("menu"+i).transform.localScale.x;
		destMenuScale[i]=1.0f;
	}
	destMenuScale[menuIndex]=1.5f;

	for(i=0;i<menuN;i++){
		var te:float;
		te=Mathf.Lerp(currMenuScale[i],destMenuScale[i],p);
		GameObject.Find("menu"+i).transform.localScale=Vector3(te,te,te);
	}
	
	// level
	destDir=GameObject.Find("point"+levelIndex).transform.position.normalized;		
	var currDir:Vector3=Camera.mainCamera.transform.position.normalized;
	var currHeight:float=Camera.mainCamera.transform.position.magnitude;		
	var dDir:float=Vector3.Angle(currDir,destDir);
	if(dDir>30){		
		destHeight=6.6;
	}
	else{
		if(levelIndex==0){
			destHeight=6.6;
		}else{
			destHeight=4;
		}
	}
	if(levelIndex!=0 && dDir>0 && dDir<turnUp)
	{
		textFlag=true;
	}
	if(textFlag&&hint.guiText.material.color.a<0.8)
	{
		if(levelIndex<4)
			hint.guiText.material.color.a+=Time.deltaTime*3;
		nameL.guiText.material.color.a+=Time.deltaTime*3;
	
	}	
	var dHeight:float=Mathf.Abs(currHeight-destHeight);		
	var nextDir:Vector3;
	var nextHeight:float;				
	nextHeight=Mathf.Lerp(currHeight,destHeight,p);		
	nextDir=Vector3.Slerp(currDir,destDir,p).normalized;			
	Camera.mainCamera.transform.position=nextDir*nextHeight;
	Camera.mainCamera.transform.LookAt(Vector3(0,0,0));
	
	te=Mathf.Sin(Time.time)*0.2+4;
	GameObject.Find("logo").transform.localScale=Vector3(te,te,te);
	GameObject.Find("gui1").guiText.text="level:"+levelIndex+" menu:"+menuIndex+"\n"+
		destMenuScale[0]+" "+currMenuScale[0];		
}