using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class posShip : MonoBehaviour {

	private Vector3 leftTopCameraBorder;
	private Vector3 leftBottomCameraBorder;

	private Vector2 siz;

	void Start(){
		// Coin de caméra
		leftBottomCameraBorder=Camera.main.ViewportToWorldPoint(new Vector3 (0, 0, 0));
		leftTopCameraBorder=Camera.main.ViewportToWorldPoint(new Vector3 (0, 1, 0));
	}
	void Update(){

		siz.x = gameObject.GetComponent<SpriteRenderer> ().bounds.size.x;
		siz.y = gameObject.GetComponent<SpriteRenderer> ().bounds.size.y;

		//print(siz.y);
		//Limite en hauteur de l'écran
		if (transform.position.y > leftTopCameraBorder.y - (siz.y / 2))
			gameObject.transform.position = new Vector3(transform.position.x, 
				leftTopCameraBorder.y - (siz.y/2),
				transform.position.z);
		
		//print (transform.position.y);
		//print (rightBottomCameraBorder.y);
		// Limite en bas de l'ecran
		if (transform.position.y < leftBottomCameraBorder.y + (siz.y/2))
			gameObject.transform.position = new Vector3(transform.position.x, 
				leftBottomCameraBorder.y + (siz.y/2),
				transform.position.z);
	}
}
