using System.Collections.Generic;
using UnityEngine;

public class moveEnnemi : MonoBehaviour {

	// 1 - La vitesse de deplacement
	public Vector2 speed;

	// 2 - Stockage du mouvement
	public Vector2 movement;

	private Vector2 siz;

	private float vitesseEnnemi;
	private float reapparitionEnnemi;

	public Sprite sprite;

	// Use this for initialization
	void Start () {
		this.reapparitionEnnemi = 0f;
		this.vitEnnemi();
	}

	// Update is called once per frame
	void Update () {

		siz.x = gameObject.GetComponent<SpriteRenderer> ().bounds.size.x;
		siz.y = gameObject.GetComponent<SpriteRenderer> ().bounds.size.y;

		movement = new Vector2(this.vitesseEnnemi,this.reapparitionEnnemi);
		GetComponent<Rigidbody2D>().velocity = movement;

		// Changement de vitesse du vaisseau ennemi selon qu'il atteint une limite minimale ou maximale de l'écran
		if (transform.position.x < 5 ) {
			this.vitesseEnnemi = 0.7f;
		} else if (transform.position.x > 10) {
			this.vitesseEnnemi = -1.1f;
		}
	}

	//Vitesse de l'ennemi à l'apparition
	void vitEnnemi(){
		this.vitesseEnnemi = Random.Range (-4.0f, -2.0f);
	}

	void patternEnnemi(){
		//Changement de vitesse du vaisseau ennemi lorsqu'il atteint le bout de l'écran
		if (transform.position.y <-1 ) {
			this.reapparitionEnnemi = 2.0f;
			this.vitesseEnnemi = 0f;
		} else if (transform.position.y >3 ) {
			this.reapparitionEnnemi = -2.0f;
			this.vitesseEnnemi = 0f;
		}
	}


	void OnTriggerEnter2D(Collider2D collisionAsteroid) {
	}
}