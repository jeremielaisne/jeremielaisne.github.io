using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

// Classe affichage du score dans la scene de GameOver et retour au début
public class getScore : MonoBehaviour
{
	public Button Back;
	public GameObject Score;
	public GameObject BestScore;

	// Score des joueurs
	void Start()
	{
		// Affectation action bouton Go
		Button btnBack = Back.GetComponent<Button>();
		btnBack.onClick.AddListener(TaskOnClickBack);

		Score.GetComponent<UnityEngine.UI.Text> ().text = "Your score : "+PlayerPrefs.GetInt("score");
		BestScore.GetComponent<UnityEngine.UI.Text> ().text = "Best score : "+PlayerPrefs.GetInt("best_score");
	}

	// Action du bouton go, lancement du jeu
	void TaskOnClickBack()
	{
		Debug.Log("Go ... démarrage du jeu!");
		SceneManager.LoadScene("Scene0");
	}


}

