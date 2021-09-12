using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;

// Classe de Gestion des scenes
public class Control : MonoBehaviour
{
	public Button Go;
	public Button Back;
	public Button How;
	public GameObject Menu;

	void Start()
	{	// Affectation action bouton Go
		Button btnGo = Go.GetComponent<Button>();
		btnGo.onClick.AddListener(TaskOnClickGo);

		// Affectation action bouton Go du menu How
		Button btnBack = Back.GetComponent<Button>();
		btnBack.onClick.AddListener(TaskOnClickBack);

		// Affectation action bouton How
		Button btnHow = How.GetComponent<Button>();
		btnHow.onClick.AddListener(TaskOnClickHow);
	}

	// Action du bouton go, lancement du jeu
	void TaskOnClickGo()
	{
		Debug.Log("Go ... démarrage du jeu!");
		SceneManager.LoadScene("Scene1");
	}

	// Action du bouton go, lancement de l'ecran d'explication
	void TaskOnClickHow()
	{
		Debug.Log("How to play!");
		Menu.SetActive (false);
	}

	// Action du bouton go, lancement de l'ecran d'explication
	void TaskOnClickBack()
	{
		Debug.Log("Back..");
		Menu.SetActive (true);
	}
}