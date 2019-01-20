#pragma strict
static public var ENERGY_AMOUNT:float;
static public var max_energy_amount:int;
static public var upgrade_amount:int;
static public var out_of_energy:boolean;

function Start () {
	max_energy_amount = 1;
	ENERGY_AMOUNT = max_energy_amount;
	//Debug.Log(ENERGY_AMOUNT);
	upgrade_amount = 50;
	out_of_energy = false;
}

function Update () {

	if (out_of_energy){
		//print("Cant move anymore.");
		// Game Over I guess...
	}
	if (ENERGY_AMOUNT > 0) {
		out_of_energy = false;
	}
}

static public function INCREASE_ENERGY(i:float){
	//print("Energy increased.");
	ENERGY_AMOUNT += i;
	if (ENERGY_AMOUNT > max_energy_amount){
		ENERGY_AMOUNT = max_energy_amount;
	}
}
 
static public function DECREASE_ENERGY(i:float){
	//print("Energy decreased.");
	ENERGY_AMOUNT -= i;
	if (ENERGY_AMOUNT < 0){
		ENERGY_AMOUNT = 0;
		out_of_energy = true;
	}
}