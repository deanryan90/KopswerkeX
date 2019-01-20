#pragma strict

public var tutorialText : GUIText;

private var learnDigging : boolean;
private var learnEnergyAndOverheating : boolean;
private var learnSpotmarket : boolean;
private var learnMoneyandstuff : boolean;
private var learnPipes : boolean;
private var learnRemovePipes : boolean;
private var learnCement;
private var learnConnectReservoir : boolean;
private var learnFinishGame : boolean;

private var DIGGING_TEXT = "You move around with WASD or arrow keys.\nPress space to dig in the direction you're moving!\n\nDig three blocks to continue.";
private var ENERGY_TEXT = "It costs energy to drill, so you have to plan your route carefully!\n\nIf you drill fast and hard your drill will overheat,\nbe careful and keep and eye on the bars on the top. \n\nOverheat to continue!";
private var SPOTMARKET_TEXT = "Always keep and eye on the spotmarket, you can buy and sell energy.\n\nLacking money? Sell some energy!\nLacking energy? Buy some energy!\n\nRemember, the prices change all the time.\n\nBuy some energy to continue";
private var MONEYANDSTUFF = "You have money which you can spend on building pipes and buying energy.\nThere is also timer, the quicker you find the most efficient route, the higher your score will be!\n\nSell some energy to continue";
private var PIPES = "You will have to connect your pipes to the bottom generator to complete the level.\nIn the upper right corner you have access to all pipes and pumps.\n\nConnect a straight pipe to continue.";
private var REMOVEPIPE = "";
private var CEMENT = "To be able build a pipe it must be secured on the adajecent sides.\nIf you dug too much you must fill a block with cement.\n\nSelect the cement block in the upper right corner and fill something to continue.";
private var CONNECTUNDERGROUNDRESERVOIR = "To get a steady stream of schmoney, build a pump right above a underground reservoir and connect it to your upper resevoir.\n\nConnect a reservoir to continue.";
private var FINISHIT = "To finish a level you must connect the upper left reservoir to the lower right reservoir.\nYou do this with digging and building pipes across the level.\n\nComplete the level to finish the tutorial."; //TODO
private var DONE = "Congratulation! You've finished the tutorial!\n\nPress space to go back to the main menu.";

function Start () {
	learnDigging = true;
	learnEnergyAndOverheating = true;
	learnSpotmarket = true;
	learnMoneyandstuff = true;
	learnPipes = true;
	learnRemovePipes = false;
	learnCement = true;
	learnConnectReservoir = true;
	learnFinishGame = true;

	//GIF ALOT OF MONEY AND SUTTTF.

	// TODO Hide all GUI.

	HUD.money = 1000000;

	GUI.contentColor = Color.yellow;

}

function Update () {
	if (learnDigging) {
		tutorialText.text = DIGGING_TEXT;
		if (blocksRemoved() > 2) {
			tutorialText.text = "";
			learnDigging = false;
		}
	} else if (learnEnergyAndOverheating) {
		// Show energy and overheating
		tutorialText.text = ENERGY_TEXT;
		if (isOverheating()) {
			tutorialText.text = "";
			learnEnergyAndOverheating = false;
		}

	} else if (learnSpotmarket) {
		// Show spotmarket
		tutorialText.text = SPOTMARKET_TEXT;
		if (HUD.hasBought) {
			tutorialText.text = "";
			learnSpotmarket = false;
		}

	} else if (learnMoneyandstuff) {
		// Show moneyandstuff
		tutorialText.text = MONEYANDSTUFF;
		if (HUD.hasSold) {
			tutorialText.text = "";
			learnMoneyandstuff = false;
		}
	} else if (learnPipes) {
		//Show pipe HUD
		tutorialText.text = PIPES;
		if (hasPlacedPipe()) { //TODO check if built a straight pipe.
			tutorialText.text = "";
			learnPipes = false;
		}
	} else if (learnRemovePipes) { // Fuck eet
	} else if (learnCement) {
		tutorialText.text = CEMENT;
		if (hasPlacedCement()) { //TODO Should work.
			tutorialText.text = "";
			learnCement = false;
		}
	} else if (learnConnectReservoir) {
		tutorialText.text = CONNECTUNDERGROUNDRESERVOIR;
		if (hasConnectedReservoir()) {
			tutorialText.text = "";
			learnConnectReservoir = false;
		}
	} else if (learnFinishGame) {
		// All HUD should now be shown.
		tutorialText.text = FINISHIT;
		if (hasFinishedGame()) { //TODO check if user has connected to the underground reservoir.
			tutorialText.text = "";
			learnFinishGame = false;
		}
	} else {
		tutorialText.text = DONE;
		if (Input.GetKeyDown(KeyCode.Space)) {
			Application.LoadLevel(0);
		}
		//Give player button to return to main menu.
	}

}

private function blocksRemoved() {
	return GameObject.FindGameObjectsWithTag("EmptyBlock").length;
}

private function isOverheating() {
	return (DrillManager.DRILL_HP < 0.2);
}

private function hasPlacedCement() {
	return (GameObject.Find("CementBlock(Clone)") != null); //TODO Not equal.
}

private function hasPlacedPipe() {
	return (GameObject.Find("StraightPipeUpDown(Clone)") != null );
}

private function hasConnectedReservoir() {
	return (FindPipes.PIPES_FOUND > 0);
}

private function hasFinishedGame() {
	return EndPipe.GAME_COMPLETE;
}