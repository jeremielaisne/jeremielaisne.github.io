using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class shootAgain : MonoBehaviour {

	private Vector3 leftTopCameraBorder;
	private Vector3 rightTopCameraBorder;
	private Vector3 leftBottomCameraBorder;
	private Vector3 rightBottomCameraBorder;

	private Vector2 siz;
	private GameObject gY;
	
	// Update is called once per frame
	void Update () {
		//Get the size of the gameObject containing the script
		siz.x = gameObject.GetComponent<SpriteRenderer> ().bounds.size.x;
		siz.y = gameObject.GetComponent<SpriteRenderer> ().bounds.size.y;

		//If space KeyPressed
		if (Input.GetKeyDown (KeyCode.Space)) {
			SoundState.Instance.touchButtonSound();
			//Get the position of the shoot using the ship position
			Vector3 tmpPos = new Vector3 (GameObject.FindGameObjectWithTag ("Vaisseau").transform.position.x, GameObject.FindGameObjectWithTag ("Vaisseau").transform.position.y, transform.position.z);
			//Instantiate shootOrange
			gY = Instantiate (Resources.Load ("shootJaune"), tmpPos, Quaternion.identity) as GameObject;
			gY.tag = "Balle Jaune";
			//Destruction de l'objet
			Destroy (gY, 2);
		}
	}
}
