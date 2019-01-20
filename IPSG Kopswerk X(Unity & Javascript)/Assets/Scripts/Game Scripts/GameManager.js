#pragma strict

var splashWon : Texture2D;
var splashLost : Texture2D;

static public var GAME_DONE : boolean;

private var GAME_WON : boolean;
private var GAME_LOST : boolean;
private var score : int;

function Start () {
	GAME_DONE = false;
	GAME_WON = false;
	GAME_LOST = false;
	HUD.money = 20000;
}

function Update () {
	if (EndPipe.GAME_COMPLETE) {
		GameWon();
	} else if (HUD.money < 100 && FindPipes.PIPES_FOUND == 0) {
		GameLost();
	}
}

function CalculateScore() {
	score = 0;
}

function GameWon() {
	GAME_DONE = true;
	GAME_WON = true;
}

function GameLost() {
	GAME_DONE = true;
	GAME_LOST = true;
}

function OnGUI() {
	if(GAME_WON) {
		GUI.Label(Rect(300, 50, 700, 700), splashWon);
		GUI.Label(Rect(500, 350, 100, 100), "Your score is: " + score);
	} else if(GAME_LOST) {
		GUI.Label(Rect(300, 50, 700, 700), splashLost);
		GUI.Label(Rect(500, 350, 100, 100), "Your score is: " + score);
	}
}