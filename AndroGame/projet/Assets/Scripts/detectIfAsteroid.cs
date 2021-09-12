using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class detectIfAsteroid : MonoBehaviour {

	public GameObject[] respawns; 

	private Vector2 siz;

	private Vector3 leftTopCameraBorder;
	private Vector3 rightTopCameraBorder;
	private Vector3 leftBottomCameraBorder;
	private Vector3 rightBottomCameraBorder;

	
	// Update is called once per frame
	void Update () {
		
		respawns = GameObject.FindGameObjectsWithTag ("Asteroid");
		//Debug.Log (respawns.Length);
		//if less than 10 asteroid
		if (respawns.Length > 0) {
			siz.x = respawns[0].GetComponent<SpriteRenderer> ().bounds.size.x;
			siz.y = respawns[0].GetComponent<SpriteRenderer> ().bounds.size.y;
		}
		if (respawns.Length < 15) {
			if (Random.Range (1, 100) == 50 || respawns.Length < 7) {
				Vector3 tmpPos = new Vector3 (15, Random.Range (-5f, 5f), 0);
				GameObject gY = Instantiate (Resources.Load("asteroidSP"), tmpPos, Quaternion.identity) as GameObject;
				gY.gameObject.tag = "Asteroid";
			}
		}
	}
}
