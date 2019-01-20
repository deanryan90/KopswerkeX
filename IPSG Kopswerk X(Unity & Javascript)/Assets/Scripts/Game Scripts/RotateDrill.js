#pragma strict

static public var START_DRILLING:boolean;
static public var DRILLING_DOWN:boolean;
static public var REACHED_DEST:boolean;
static public var IS_DRILLING:boolean;
static public var IS_DRILLING_DOWN:boolean;

private var speed:float = 1.0;
private var espeed:float = 1.0;
private var anim:boolean = true;
private var revAnim:boolean = false;

public var horiEmitter : GameObject;
public var verEmitter : GameObject;

function Start () {

	START_DRILLING = false;
	DRILLING_DOWN = false;
	REACHED_DEST = false;
	IS_DRILLING_DOWN = false;
	IS_DRILLING = false;
	horiEmitter.particleSystem.enableEmission = false;
	
}

function Update () {

	//emitter.particleEmitter.emit = false;

	if (IS_DRILLING){
		horiEmitter.particleSystem.enableEmission = true;
	}else if (IS_DRILLING_DOWN){
		verEmitter.particleSystem.enableEmission = true;
	}else if (!IS_DRILLING || !IS_DRILLING_DOWN){
		horiEmitter.particleSystem.enableEmission = false;
		verEmitter.particleSystem.enableEmission = false;
	}

	if (START_DRILLING){
		StartDrill();
		if (DRILLING_DOWN){
			PlayAnimation();
		}
	}
	
	if (REACHED_DEST) {
		StopDrill();
	}

}

function StartDrill(){
	this.transform.Rotate(Vector3(0,10,0));
}

function PlayAnimation(){
	if (anim){
		//emitter.particleSystem.enableEmission = true;
		animation["DrillAnimation"].speed = speed;
		animation["DrillAnimation"].time = 0;
		animation.Play("DrillAnimation");
		anim = false;
		revAnim = true;
		DRILLING_DOWN = false;
	}
}

function StopDrill(){
	if (revAnim){
		animation["DrillAnimation"].speed = -speed;
		animation["DrillAnimation"].time = animation["DrillAnimation"].length;
		animation.Play("DrillAnimation");
		anim = true;
		revAnim = false;
		REACHED_DEST = false;
	}
}