#pragma strict

var repairFactor : float;
var overheatAlarmSound : AudioClip;
var cooldownSound : AudioClip;
var overheatAlarmLimit : float;

static public var DRILL_HP:float;
static public var OVERHEAT:boolean;
static public var max_drill_hp:float = 1;
static public var drill_upgrade_amount:int = 50;

function Start () {
	DRILL_HP = max_drill_hp;
}

function Update () {
	if (OVERHEAT){
		audio.PlayOneShot(cooldownSound);
	}
	
	audio.clip = overheatAlarmSound;
	if (DRILL_HP < overheatAlarmLimit && !audio.isPlaying) {
		audio.Play();
	}
	if (DRILL_HP > overheatAlarmLimit) {
		audio.Stop();
	}
	
	if (DRILL_HP > 0) {
		OVERHEAT = false;
	}
	REPAIR_DRILL(repairFactor);
}

static public function REPAIR_DRILL(i:float){
	//print("Repaired drill.");
	DRILL_HP += i;
	if (DRILL_HP > max_drill_hp){
		DRILL_HP = max_drill_hp;
	}
}

static public function UPGRADE_DRILL(){
	//print("Upgraded drill.");
	max_drill_hp += drill_upgrade_amount;
}

static public function TAKE_DAMAGE(i:float){
	//print("Drill took damage.");
	DRILL_HP -= i;
	if (DRILL_HP < 0){
		DRILL_HP = 0;
		OVERHEAT = true;
	}
}