using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class moveShoot : MonoBehaviour {

	private Vector3 leftTopCameraBorder;
	private Vector3 rightTopCameraBorder;
	private Vector3 leftBottomCameraBorder;
	private Vector3 rightBottomCameraBorder;

	public Vector2 movement;
	private Vector2 siz;

	// Use this for initialization
	void Start () {
		rightTopCameraBorder=Camera.main.ViewportToWorldPoint(new Vector3 (1, 1, 0));
	}
	
	// Update is called once per frame
	void Update () {

		siz.x = gameObject.GetComponent<SpriteRenderer> ().bounds.size.x;
		siz.y = gameObject.GetComponent<SpriteRenderer> ().bounds.size.y;

		if (transform.position.x > rightTopCameraBorder.x)
			movement = new Vector2(0,0);
		else
			movement = new Vector2(10,0);

		GetComponent<Rigidbody2D>().velocity = movement;
	}

	void OnTriggerEnter2D(Collider2D collider) {
		//Destruction du missile en cas de contact, si on touche l'asteroid on perd 1pts
		if (collider.name != "myShip" && collider.name != "ennemi" && collider.name != "ennemi_bis") {
			GameState.Instance.addScorePlayer (-1);
			Destroy (this.gameObject);
		} else if (collider.name == "ennemi" || collider.name == "ennemi_bis") {
			GameState.Instance.addScorePlayer (1);
			Destroy (this.gameObject);
		}
	}
}
