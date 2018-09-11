using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class fadeOutAsteroid : MonoBehaviour {

	private float time;

	// Update is called once per frame
	void Update () {
		Color cl = GetComponent<SpriteRenderer> ().color;
		this.time += Time.deltaTime;
		if (this.time < 5) {
			cl.a -= 0.01f;
		} else {
			cl.a += 0.01f;
			this.time--;
		}
	}
}

