using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// Fonction de déplacement de l'image de fond
public class moveBackground : MonoBehaviour {

	public GameObject Image;
	public GameObject Image_1;


	private float respawn;
	public Vector2 movement;
	public Vector2 movement_stars;

	private Vector3 leftTopCameraBorder;
	private Vector3 leftBottomCameraBorder;

	// Initialisation des bords de caméra, et zone de respawn à l'emplacement 
	void Start ()
	{
		leftBottomCameraBorder=Camera.main.ViewportToWorldPoint(new Vector3 (0, 0, 0));
		leftTopCameraBorder=Camera.main.ViewportToWorldPoint(new Vector3 (0, 1, 0));

		respawn = Image_1.transform.position.x;
	}

	// Si l'object depasse entièrement de l'écran, il réapparait à l'emplacement dans la zone de respawn
	void Update ()
	{
		Image.GetComponent<Rigidbody2D>().velocity= movement;
		Image_1.GetComponent<Rigidbody2D>().velocity= movement;

		if (Image.transform.position.x < leftBottomCameraBorder.x + (Image.GetComponent<Transform>().position.x / 2)){
			Image.transform.position = new Vector3 (respawn,Image.transform.position.y,Image.transform.position.z);
		}
		if (Image_1.transform.position.x < leftTopCameraBorder.x + (Image_1.GetComponent<Transform>().position.x / 2)) {
			Image_1.transform.position = new Vector3 (respawn,Image_1.transform.position.y,Image_1.transform.position.z);
		}
	}
		
}

