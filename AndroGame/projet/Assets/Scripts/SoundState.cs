using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using UnityEngine.UI;

//Classe gestion du son
public class SoundState : MonoBehaviour {

	public static SoundState _instance;

	public static SoundState Instance { get { return _instance; } }

	public AudioClip playerShotSound;
	public AudioClip explosionSound;

	// Use this for initialization
	private void Awake() {

		if (_instance != null && _instance != this) {
			Destroy (this.gameObject);
		}else{
			_instance = this;
		}
	}

	public void touchButtonSound(){
		MakeSound(playerShotSound);
	}

	public void touchButtonExplosionSound(){
		MakeSound(explosionSound);
	}

	private void MakeSound(AudioClip originalClip){
		AudioSource.PlayClipAtPoint(originalClip, transform.position);
	}
}
