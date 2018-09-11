using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

using UnityEngine.UI;

// Classe Singleton
public class GameState : MonoBehaviour {

	public static GameState _instance;
	private int scorePlayer = 0;
	private int bestScore = 0;

	public static GameState Instance { get { return _instance; } }

	// Use this for initialization
	private void Awake() {

		if (_instance != null && _instance != this) {
			Destroy (this.gameObject);
		}else{
			_instance = this;
			bestScore = PlayerPrefs.GetInt ("best_score");
		}
	}

	void FixedUpdate()
	{	
		//Gestion de l'affichage du score
		if (getScorePlayer () < 10 && getScorePlayer () > -1)
			GameObject.FindWithTag ("ScoreLabel").GetComponent<Text> ().text = "00" + getScorePlayer ();
		else if (getScorePlayer () >= 10 && (getScorePlayer () < 100))
			GameObject.FindWithTag ("ScoreLabel").GetComponent<Text> ().text = "0" + getScorePlayer ();
		else if (getScorePlayer () < 0) {
			GameObject.FindWithTag ("ScoreLabel").GetComponent<Text> ().text = "000";
			this.scorePlayer = 0;
		}
		else
			GameObject.FindWithTag("ScoreLabel").GetComponent<Text>().text = ""+getScorePlayer();
		// +2pts toutes les 10 sec
		addScoreTimePlayer ();
	}

	public void addScorePlayer(int toAdd){
		Instance.scorePlayer+=toAdd;
	}

	public void addScoreTimePlayer(){
		if (Time.time%10==0)
			Instance.scorePlayer+=4;
	}

	public int getScorePlayer(){
		return Instance.scorePlayer;
	}
		
	public void gameOver()
	{
		// Pas de points négatifs
		if (scorePlayer < 0)
			scorePlayer = 0;
		//Enregistrement du score du joueur à la fin de la partie
		PlayerPrefs.SetInt("score",scorePlayer);

		//Enregistrement du meilleur score si il celui-ci est supérieur au score réussi par le joueur
		if(scorePlayer>bestScore)
			PlayerPrefs.SetInt("best_score",scorePlayer);
		
		//Passage scene de game over
		SceneManager.LoadScene("Scene2");
	}
}
