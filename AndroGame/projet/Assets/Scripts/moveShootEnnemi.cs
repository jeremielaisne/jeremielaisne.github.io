using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class moveShootEnnemi : MonoBehaviour {

	private Vector3 leftTopCameraBorder;
	private Vector3 rightTopCameraBorder;
	private Vector3 leftBottomCameraBorder;
	private Vector3 rightBottomCameraBorder;

	public Vector2 movement;
	private Vector2 siz;
	private float vitesseObject; 

	// Use this for initialization
	void Start () {
		rightTopCameraBorder=Camera.main.ViewportToWorldPoint(new Vector3 (1, 1, 0));
		// On donne une valeur aléatoire à l'objet
		this.vitesseObject = Random.Range (-10.5f, -7.5f);
	}

	// Update is called once per frame
	void Update () {

		siz.x = gameObject.GetComponent<SpriteRenderer> ().bounds.size.x;
		siz.y = gameObject.GetComponent<SpriteRenderer> ().bounds.size.y;

		//Donne une valeur aléatoire à l'objet lorsqu'il atteint le début de l'écran
		if (transform.position.x == -9)
			this.vitesseObject = Random.Range (-10.5f, -7.5f);

		// Vitesse et réapparition de l'objet sur le vaisseauu ennemi
		if (transform.position.x > -10)
			movement = new Vector2 (this.vitesseObject, 0);
		else {
			float hasard = Random.Range (0.0f, 2.0f);
			if (hasard >= 1.0f)
				this.transform.position = new Vector3 (GameObject.FindGameObjectWithTag ("Ennemi").transform.position.x, GameObject.FindGameObjectWithTag ("Ennemi").transform.position.y, 0);
			else
				this.transform.position = new Vector3 (GameObject.FindGameObjectWithTag ("Ennemi_bis").transform.position.x, GameObject.FindGameObjectWithTag ("Ennemi_bis").transform.position.y, 0);
		}
		GetComponent<Rigidbody2D>().velocity = movement;
	}

	void OnTriggerEnter2D(Collider2D collider) {
		//Destruction du missile en cas de contact
		if (collider.name == "myShip") {
			GameState.Instance.addScorePlayer (-10);
			SoundState.Instance.touchButtonExplosionSound ();

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
			this.transform.position = new Vector3 (GameObject.FindGameObjectWithTag ("Ennemi").transform.position.x,GameObject.FindGameObjectWithTag ("Ennemi").transform.position.y,0);
		}
	}
}

