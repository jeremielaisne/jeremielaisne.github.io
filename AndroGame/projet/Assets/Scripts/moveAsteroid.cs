using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class moveAsteroid : MonoBehaviour {

	// 1 - La vitesse de deplacement
	public Vector2 speed;

	// 2 - Stockage du mouvement
	public Vector2 movement;
	// 3 - Coin gauche de la caméra
	private Vector3 leftTopCameraBorder;

	private Vector2 siz;

	private float vitesseAsteroid;
	private float reapparitionAsteroid;

	private Sprite sprite;

	// Use this for initialization
	void Start () {
		leftTopCameraBorder=Camera.main.ViewportToWorldPoint(new Vector3 (0, 1, 0));
		this.vitAsteroid();
	}
	
	// Update is called once per frame
	void Update () {

		siz.x = gameObject.GetComponent<SpriteRenderer> ().bounds.size.x;
		siz.y = gameObject.GetComponent<SpriteRenderer> ().bounds.size.y;

		movement = new Vector2(this.vitesseAsteroid,0);
		GetComponent<Rigidbody2D>().velocity = movement;

		//Destruction de l'objet si il atteint sa limite
		if (transform.position.x < leftTopCameraBorder.x) {
			this.onDestroy (this.gameObject);
		}
	}
	//Réapparition aléatoire de l'asteroid
	void respawnAsteroid(){
		this.reapparitionAsteroid = Random.Range (-4.5f, 4.5f);
	}

	//Vitesse de l'asteroid à l'apparition
	void vitAsteroid(){
		this.vitesseAsteroid = Random.Range (-7.0f, -2.0f);
	}

	void OnTriggerEnter2D(Collider2D collisionAsteroid) {
		//Changement de sprite après collision
		/*
		if (collisionAsteroid.name == "shootJaune(Clone)") {
			//print ("Changement sprite...");
			this.gameObject.GetComponent<SpriteRenderer>().sprite = sprite;
		}*/

		if (collisionAsteroid.name == "myShip") {
			//print ("Detection asteroid");
			if (GameObject.FindGameObjectWithTag ("Life5"))
				GameObject.FindGameObjectWithTag ("Life5").AddComponent<fadeOut> ();
			else if (GameObject.FindGameObjectWithTag ("Life4"))
				GameObject.FindGameObjectWithTag ("Life4").AddComponent<fadeOut> ();
			else if (GameObject.FindGameObjectWithTag ("Life3"))
				GameObject.FindGameObjectWithTag ("Life3").AddComponent<fadeOut> ();
			else if (GameObject.FindGameObjectWithTag ("Life2"))
				GameObject.FindGameObjectWithTag ("Life2").AddComponent<fadeOut> ();
			else if (GameObject.FindGameObjectWithTag ("Life1")) {
				GameObject.FindGameObjectWithTag ("Life1").AddComponent<fadeOut> ();
				GameState.Instance.gameOver ();
			}
			SoundState.Instance.touchButtonExplosionSound ();
		} 
	}


	//Destruction de l'asteroid
	void onDestroy(GameObject gb) {
		Destroy(gb);
		//print("Destruction asteroid");
	}

	//Création d'un nouvel asteroid
	void createNewAsteroid(){
		//print("Instantiation asteroid");
		//attribution valeure aléatoire à l'asteroid
		respawnAsteroid();
		GameObject gY = Instantiate(Resources.Load("asteroidSp"), new Vector3(10,this.reapparitionAsteroid, 0), Quaternion.identity) as GameObject;
		gY.gameObject.tag = "Asteroid";
	}
		
}
