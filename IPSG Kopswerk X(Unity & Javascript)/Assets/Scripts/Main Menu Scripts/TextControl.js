
var myClip : AudioClip;

var isQuitButton = false;
var isControlButton = false;
var isCreditButton = false;
var isNewGameButton = false;
var isPlayTutorialButton = false;


function Start()
{
	renderer.material.color = Color.blue;
}
function OnMouseEnter()
{
	renderer.material.color = Color.white;
	audio.PlayOneShot(myClip);
}
function OnMouseExit()
{
	renderer.material.color = Color.blue;
}
function OnMouseUp()
{
	//are we quit button
	if(isQuitButton)
	{
		//quit the game
		Application.Quit();
	}
	else if(isNewGameButton == true)
	{
		//load level#
		Application.LoadLevel(1);
		audio.PlayOneShot(myClip);
	}
	else if(isPlayTutorialButton == true)
	{
	   Application.LoadLevel(2);
	}
	else if(isControlButton == true)
	{
		Application.LoadLevel(3);
		print("Controls");
	}
	else if(isNewGameButton == true)
	{
		//load level#
		Application.LoadLevel(1);
		audio.PlayOneShot(myClip);
	}
	else if(isPlayTutorialButton == true)
	{
	   Application.LoadLevel(2);
	}else if(isControlButton == true)
	{
		Application.LoadLevel(3);
		print("Controls");
	}
	else if(isCreditButton == true)
	{
	   Application.LoadLevel(4);
	   print("Credits");
	}
}