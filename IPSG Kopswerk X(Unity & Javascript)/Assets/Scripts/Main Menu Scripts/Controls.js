#pragma strict

var controlMenu : Texture2D;

function Start () {

}

function Update () {

}
function OnGUI(){


	GUI.Label(Rect(300,0,700,600),controlMenu);
	if(GUI.Button(Rect(485,20,100,50),"Main Menu"))
	{
		Application.LoadLevel(0);
	}
}
