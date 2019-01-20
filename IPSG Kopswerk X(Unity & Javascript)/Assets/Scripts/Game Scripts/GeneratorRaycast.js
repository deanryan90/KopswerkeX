#pragma strict
private var hit : RaycastHit;
static public var FOUND_PIPE:boolean;


function Start () {
	FOUND_PIPE = false;
}

function Update () {

	FindWaterpipes();
	if (FOUND_PIPE){
		//YOU HAVE WON THE GAME
	}
}

private function CheckPipes(s:String){
	var n = hit.collider.gameObject.name;
	if (n == "CurvedBottomRight(Clone)" || n == "CurvedBottomRight" || n == "CurvedRightTop(Clone)" 
	|| n == "CurvedRightTop" || n == "CurvedTopLeft(Clone)" || n == "CurvedTopLeft" || n == "CurvedLeftBottom(Clone)" || n == "CurvedLeftBottom"
	|| n == "PipeTsplitDown(Clone)" || n == "PipeTsplitDown" || n == "PipeTsplitLeft" || n == "PipeTsplitLeft(Clone)"
	|| n == "PipeTsplitRight" || n == "PipeTsplitRight(Clone)" || n == "PipeTsplitUp" || n == "PipeTsplitUp(Clone)"
	|| n == "PumpTsplit" || n == "PumpTsplit(Clone)" || n == "StraightPipeUpDown" || n == "StraightPipeUpDown(Clone)"
	|| n == "StraightPipLeftRight" || n == "StraightPipLeftRight(Clone)") {
		//Allow pipe placement
		FOUND_PIPE = true;
	}
}


function FindWaterpipes(){
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.left), hit, 0.9)) {
		CheckPipes("left");
	}
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.down), hit, 0.9)) {
		CheckPipes("down");
	}
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.up), hit, 0.9)) {
		CheckPipes("up");
	}
}