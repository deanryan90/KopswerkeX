#pragma strict

// Speed and acceleration variables
var acceleration : float;
var deceleration : float;
var maxSpeed : float;
var minPos : Vector3; //x: -5, y:-50
var maxPos : Vector3; //x: 16, y: 2.5
var drillSpeedNormal : float;
var drillSpeedHard : float;
var drillSpeedGravel: float;
var alignSpeed : float;

var normalBlockSound : AudioClip;
var hardBlockSound : AudioClip;
var gravelBlockSound : AudioClip;

// Private vars used with player movement and drilling
private var mov : Vector3;
private var c : CharacterController;
private var hit : RaycastHit;
private var allow_movement:boolean;
private var drill_direction:String;
private var destLocation:Vector3;
private var localBlockPosition:Vector3;
private var playerAlligned:boolean;
private var drillingObj : GameObject;
private var drillSpeed : float;
private final var raycastLength:float = 0.40;
private final var drillOffsetY : float = 0.2;

function Start () {
	mov = Vector3.zero;
	c = GetComponent(CharacterController);
	allow_movement = true;
	playerAlligned = false;
	drillingObj = null;
	localBlockPosition = Vector3.zero;
	destLocation = Vector3.zero;
	minPos.z = transform.position.z;
	maxPos.z = transform.position.z;
	gameObject.GetComponent("Drill");
}

function Update () {
	HandleInput();
	PlayerBoundaries();
	HandleMovement();
}

private function PlayerBoundaries(){
	transform.position = Vector3(Mathf.Clamp(transform.position.x, minPos.x, maxPos.x),Mathf.Clamp(transform.position.y, minPos.y, maxPos.y), transform.position.z);
}

private function DoRaycast(){
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.right), hit, raycastLength)) {
		// Collison found: drill down (destroy block)
		drillingObj = hit.collider.gameObject;
		var n = drillingObj.name;
		print(n);
		if (DrillManager.DRILL_HP < drillingObj.GetComponent(Block).GetDamageToDestroy(n)) {
			drillingObj = null;
		} else if (EnergyManager.ENERGY_AMOUNT < drillingObj.GetComponent(Block).GetEnergyToDestroy(n)) {
			drillingObj = null;
		} else if (n == "UnbreakableBlock(Clone)" || n == "UnbreakableBlock" ||n == "WaterBlock(Clone)" || n == "WaterBlock" 
			|| n == "WaterBlockBig(Clone)" || n == "WaterBlockBig" || n == "WaterBlockBiggest(Clone)"
			|| n == "WaterBlockBiggest" || n == "EmptyBlock(Clone)" || n == "EmptyBlock" 
			|| n == "PrimaryWaterReservoir" || n == "BottomGenerator(Clone)" || n == "BottomGenerator") {
			drillingObj = null;
		}
		SetDrillSpeed(n);
	}
}

private function DownwardRaycast(){
	if (Physics.Raycast(transform.position, transform.TransformDirection(-Vector3.up), hit, raycastLength)) {
		// Collison found: drill down (destroy block)
		drillingObj = hit.collider.gameObject;
		var n = drillingObj.name;
		print(n);
		if (DrillManager.DRILL_HP < drillingObj.GetComponent(Block).GetDamageToDestroy(n)) {
			drillingObj = null;
		} else if (EnergyManager.ENERGY_AMOUNT < drillingObj.GetComponent(Block).GetEnergyToDestroy(n)) {
			drillingObj = null;
		} else if (n == "UnbreakableBlock(Clone)" || n == "UnbreakableBlock" ||n == "WaterBlock(Clone)" || n == "WaterBlock" 
			|| n == "WaterBlockBig(Clone)" || n == "WaterBlockBig" || n == "WaterBlockBiggest(Clone)"
			|| n == "WaterBlockBiggest" || n == "EmptyBlock(Clone)" || n == "EmptyBlock" 
			|| n == "PrimaryWaterReservoir" || n == "BottomGenerator(Clone)" || n == "BottomGenerator") {
			drillingObj = null;
		}
		SetDrillSpeed(n);
	}
}

private function SetDrillSpeed(s : String){
	switch (s){
		case "NormalBlock(Clone)" || "NormalBlock":
			drillSpeed = drillSpeedNormal;
			break;
		case "HardBlock(Clone)" || "HardBlock" || "CementBlock(Clone)" || "CementBlock":
			drillSpeed = drillSpeedHard;
			break;
		case "GravelBlock(Clone)" || "GravelBlock":
			drillSpeed = drillSpeedGravel;
			break;
	}
}

private function SelectBlockPosition(){
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.right), hit, 0.5)) {
		try {
			localBlockPosition = hit.collider.gameObject.GetComponent(Block).rigidbody.position;
			localBlockPosition.y = localBlockPosition.y - drillOffsetY;
		} catch (err) {
			// TODO: Should probably do something about this...(?)
		}
		
	}
}

private function SelectDownBlockPosition(){
	if (Physics.Raycast(transform.position, transform.TransformDirection(-Vector3.up), hit, 0.5)) {
		try {
			localBlockPosition = hit.collider.gameObject.GetComponent(Block).rigidbody.position;
		} catch (err) {
			// TODO: Should probably do something about this...(?)
		}
		
	}
}

private function HandleMovement(){
		switch (drill_direction){
	    	case "down":
	    		//Move
	    		RotateDrill.IS_DRILLING_DOWN = true;
	    		if (!playerAlligned){				
			    	if (localBlockPosition.x >= this.transform.position.x){
			    		this.transform.position.x += drillSpeed * Time.deltaTime;
			    		if (localBlockPosition.x <= this.transform.position.x){
			    			this.transform.position.x = localBlockPosition.x;
			    			playerAlligned = true;
		    			}
			    	}else if (localBlockPosition.x <= this.transform.position.x){
			    		this.transform.position.x -= drillSpeed * Time.deltaTime;
			    		if (localBlockPosition.x >= this.transform.position.x){
			    			this.transform.position.x = localBlockPosition.x;
			    			playerAlligned = true;
		    			}
			    	}
		    	} else if (playerAlligned) {
		    		//playDrillingSound();
		    		if (this.transform.position.y > destLocation.y){
		    			this.transform.position.y -= drillSpeed * Time.deltaTime;
			    		if (this.transform.position.y <= destLocation.y){
							this.transform.position.y = destLocation.y;
						}
						if (this.transform.position.y == destLocation.y) {
							DoneDrilling();
							RotateDrill.REACHED_DEST = true;
						}
		    		}
	    		}
	    		break;
			case "left":
				//Move
				RotateDrill.IS_DRILLING = true;
	    		if (!playerAlligned){						
			    	if (localBlockPosition.y >= this.transform.position.y){
			    		this.transform.position.y += drillSpeed * Time.deltaTime;
			    		if (localBlockPosition.y <= this.transform.position.y){
			    			this.transform.position.y = localBlockPosition.y;
			    			playerAlligned = true;
		    			}
			    	}else if (localBlockPosition.y <= this.transform.position.y){
			    		this.transform.position.y -= drillSpeed * Time.deltaTime;
			    		if (localBlockPosition.y >= this.transform.position.y){
			    			this.transform.position.y = localBlockPosition.y;
			    			playerAlligned = true;
		    			}
			    	}
		    	}else if (playerAlligned){
		    		//playDrillingSound();
					if (this.transform.position.x >= destLocation.x){
			    		this.transform.position.x -= drillSpeed * Time.deltaTime;
			    		if (this.transform.position.x <= destLocation.x) {
							this.transform.position.x = destLocation.x;
						}
						if (this.transform.position.x == destLocation.x) {
							DoneDrilling();
						}
			    	}
		    	}
				break;
			case "right":
				//Move
				RotateDrill.IS_DRILLING = true;
	    		if (!playerAlligned){						
			    	if (localBlockPosition.y <= this.transform.position.y){
			    		this.transform.position.y -= drillSpeed * Time.deltaTime;
			    		if (localBlockPosition.y >= this.transform.position.y){
			    			this.transform.position.y = localBlockPosition.y;
			    			playerAlligned = true;
		    			}
			    	}else if (localBlockPosition.y >= this.transform.position.y){
			    		this.transform.position.y += drillSpeed * Time.deltaTime;
			    		if (localBlockPosition.y <= this.transform.position.y){
			    			this.transform.position.y = localBlockPosition.y;
			    			playerAlligned = true;
		    			}
			    	}
		    	}else if (playerAlligned){
		    		//playDrillingSound();
					if (this.transform.position.x <= destLocation.x){
			    		this.transform.position.x += drillSpeed * Time.deltaTime;
			    		if (this.transform.position.x >= destLocation.x){
							this.transform.position.x = destLocation.x;
						}
						if (this.transform.position.x == destLocation.x) {
							DoneDrilling();
						}
			    	}
		    	}
				break;
		}
}

private function HandleInput() {
	if (Input.GetKeyDown(KeyCode.Escape)) {
		Application.LoadLevel(0);
	}
	
	if (allow_movement && !DrillManager.OVERHEAT && !GameManager.GAME_DONE) {
		if (Input.GetKey(KeyCode.Space) && (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.LeftArrow))) {
			DrillLeft();
		} else if (Input.GetKey(KeyCode.Space) && (Input.GetKey(KeyCode.D) || Input.GetKey(KeyCode.RightArrow))) {
			DrillRight();
		} else if (Input.GetKey(KeyCode.Space) && (Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.DownArrow))) {
			DrillDown();
		}
	}

	mov = Vector3.zero;
	if (allow_movement && !EnergyManager.out_of_energy && !GameManager.GAME_DONE){
		// Accel/decel in x-direction
		if (Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.UpArrow)) {
			// Fly upwards
			MoveUp();
		}  else if (Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.DownArrow)) {
			// Apply gravity, decelerate and point drill downwards and drill down if space is pressed
			MoveDown();
		} else {
			// Only Decelerate
			DecelerateY();
		}
		
		if (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.LeftArrow)) {
			// Move left, turn drill left, maybe drill left if space is pressed
			MoveLeft();
		}else if (Input.GetKey(KeyCode.D) || Input.GetKey(KeyCode.RightArrow)) {
			// Move right, turn drill right, maybe drill right if space is pressed
			MoveRight();
		} else {
			// Only Decelerate
			DecelerateX();
		} 
		
		// Move the player
		c.Move(mov * Time.deltaTime);	
	} 
}

function DoneDrilling(){
	drillingObj.GetComponent(Block).Destroy();
	drillingObj = null;
	allow_movement = true;
	drill_direction = null;
	RotateDrill.START_DRILLING = false;
	localBlockPosition = Vector3.zero;
	playerAlligned = false;
	RotateDrill.IS_DRILLING = false;
	RotateDrill.IS_DRILLING_DOWN = false;
}

function BugDrill(){
	print("Done Drilling");
	drillingObj = null;
	allow_movement = true;
	drill_direction = null;
	//RotateDrill.START_DRILLING = false;
	localBlockPosition = Vector3.zero;
	playerAlligned = false;
	RotateDrill.IS_DRILLING = false;
	RotateDrill.IS_DRILLING_DOWN = false;
}

private function MoveLeft() {
	if (allow_movement){
		mov.x = Mathf.Clamp((c.velocity.x - acceleration), -maxSpeed, maxSpeed);
		transform.eulerAngles = Vector3(0, 180, 0);
	}
}

private function MoveRight() {
	if (allow_movement){
		mov.x = Mathf.Clamp((c.velocity.x + acceleration), -maxSpeed, maxSpeed);
		transform.eulerAngles = Vector3(0, 0, 0);
	}
}

private function MoveDown() {
	if (allow_movement){
		mov.y = Mathf.Clamp((c.velocity.y - acceleration), -maxSpeed, maxSpeed);
		//transform.eulerAngles = Vector3(0, 0, 270);
	}
}

private function MoveUp() {
	if (allow_movement){
		mov.y = Mathf.Clamp((c.velocity.y + acceleration), -maxSpeed, maxSpeed);
	}
}

private function DrillLeft() {
	DoRaycast();
	if (drillingObj != null) {
		if (this.transform.position.x > drillingObj.transform.position.x){
			destLocation = Vector3(this.transform.position.x-0.9, 0, 0);
			SelectBlockPosition();
			allow_movement = false;
			RotateDrill.START_DRILLING = true;
			drill_direction = "left";
		}else {
			BugDrill();
		}
	}
}
private function DrillRight() {
	DoRaycast();
	if (drillingObj != null) {
		if (this.transform.position.x < drillingObj.transform.position.x){
			destLocation = Vector3(this.transform.position.x+0.9, 0, 0);
			SelectBlockPosition();
			allow_movement = false;
			RotateDrill.START_DRILLING = true;
			drill_direction = "right";
		}else {
			BugDrill();
		}
	}
}
private function DrillDown() {
	DownwardRaycast();
	if (drillingObj != null) {
		SelectDownBlockPosition();
		allow_movement = false;
		RotateDrill.START_DRILLING = true;
		RotateDrill.DRILLING_DOWN = true;
		destLocation = Vector3(0, this.transform.position.y-0.9, 0);
		drill_direction = "down";
	}
}

private function DecelerateX() {
	var v = c.velocity.x;
	 if (v < 0) {
			mov.x = c.velocity.x * deceleration;
		 } else if (v > 0) {
		 	mov.x = c.velocity.x * deceleration;
	} 
}

private function DecelerateY() {
	var v = c.velocity.y;
	 if (v < 0) {
			mov.y = c.velocity.y * deceleration;
		 } else if (v > 0) {
		 	mov.y = c.velocity.y * deceleration;
	} 
}