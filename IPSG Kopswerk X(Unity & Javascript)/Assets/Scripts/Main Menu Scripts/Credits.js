#pragma strict

var creditsMenu : Texture2D;
var names : Texture2D;

function Start () {

}

function Update () {

}
function OnGUI()
{

	GUI.Label(Rect(200,50,700,700),names);
	GUI.contentColor = Color.yellow;
	GUI.Label(Rect(50,400,1000,100),"L-R , Aleksander L.Rasch, Manuel Tscholl, Karl J Overaa, Christer Olsen, Dean Ryan, Martin McGuinness, Maurtis De Leeuw, Michael De Beer, Alexander Baranov");
	GUI.contentColor = Color.white;
	GUI.Label(Rect(200,0,700,600),creditsMenu);
	if(GUI.Button(Rect(0,0,100,50),"Main Menu"))
	{
		Application.LoadLevel(0);
	}
	
}
