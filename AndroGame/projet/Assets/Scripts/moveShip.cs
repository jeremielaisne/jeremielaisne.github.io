using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class moveShip : MonoBehaviour {

	// 1 - La vitesse de deplacement
	public Vector2 speed;

	// 2 - Stockage du mouvement
	public Vector2 movement;
	
	// Update is called once per frame
	void Update () {

		// 3 - Récupérer les informations du clavier/manette 
		float inputY = Input.GetAxis("Vertical");

		// 4 - Calcul du mouvement
		movement = new Vector2 (0f, speed.y * inputY);

		// 5 - Deplacement 
		GetComponent<Rigidbody2D>().velocity = movement;

	}

	void OnTriggerEnter2D(Collider2D collisionVaisseau) {
		//GameObject.FindGameObjectWithTag ("Vaisseau").AddComponent<fadeOutAsteroid>();
	}
		
}
