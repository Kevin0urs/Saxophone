# 🎷 SaxTénor Studio

> **Application web d’apprentissage du saxophone ténor (en Si♭) et du solfège pour débutant complet.**  
> Développée à 100% en **HTML5, CSS3 et JavaScript vanilla** (aucun framework, aucun bundle, zéro dépendance externe).  
> Fonctionne entièrement hors-ligne dans n'importe quel navigateur moderne et est immédiatement prête à être hébergée sur **GitHub Pages**.

---

## 🌟 Fonctionnalités principales

### 1. 🎯 Entraînement à la lecture de notes et aux doigtés
* **Portée en clé de sol dessinée en SVG vectoriel natif** (aucun fichier image externe, aucune police spéciale requise).
* **Schéma interactif du saxophone ténor vu de face** :
  * Clé d'octave au pouce gauche
  * Clés principales de la main gauche (Index 1, Bis Si♭, Majeur 2, Annulaire 3)
  * Clés de paume / palmes aiguës (Ré, Mi♭, Fa)
  * Plateau de clés de table pour l'auriculaire gauche (Sol♯, Do♯ grave, Si grave, Si♭ grave)
  * Clés principales de la main droite (Index 4, Majeur 5, Annulaire 6)
  * Clés latérales de côté (Mi aigu, Do côté, Si♭ côté, Fa♯ chromatique)
  * Plateau pour l'auriculaire droit (Mi♭ grave, Do grave)
* **Étendue réglable selon votre progression** :
  * *Niveau 1* : Les 5 premières notes de base (Sol, La, Si, Do, Ré)
  * *Niveau 2* : Registre médium (Do grave à Fa aigu)
  * *Niveau 3* : Premières altérations (Fa♯, Si♭, Do♯, Mi♭)
  * *Niveau 4* : Registre étendu (Si♭ grave à Fa aigu)
  * *Niveau 5* : Gamme chromatique complète (31 notes)
* **Modes d'entraînement** : Note par note (continu) ou séries de 5 ou 10 notes avec bilan de fin de série.
* **Validation instantanée ou manuelle** :
  * Si la réponse est correcte : carillon de succès, son synthétisé de saxophone de la note, et surbrillance verte.
  * Si la réponse est fausse : analyse détaillée des erreurs (touches manquantes signalées en orange avec animation pulsante, touches en trop signalées en rouge, explications pédagogiques).
* **Compteurs de session** : Bonnes réponses, Série en cours (Streak 🔥), Précision en pourcentage (%).

### 2. 🎶 Morceaux simples guidés
8 airs célèbres adaptés au saxophone ténor débutant :
1. **Au clair de la lune** (5 notes de base pour débuter sereinement)
2. **Ah ! vous dirai-je, maman** (Mozart / Air populaire)
3. **Ode à la joie** (Beethoven - Symphonie n°9)
4. **Happy Birthday** (Joyeux Anniversaire)
5. **Frère Jacques** (Canon populaire)
6. **Vive le vent** (Jingle Bells)
7. **When the Saints Go Marching In** (Le classique du jazz New Orleans)
8. **Bella Ciao** (Chant populaire italien)

* **Affichage synchronisé** : La portée musicale défile note par note, mettant en valeur la note active avec son nom en grand et les paroles/syllabes.
* **Doigté en temps réel** : Le schéma du saxophone affiche simultanément le doigté exact de la note à jouer.
* **Commandes complètes** : Précédent, Suivant, Début, Recommencer, et **Lecture automatique** avec potentiomètre de tempo réglable (BPM).
* **Mode Défi interactif** : La partition n'avance à la note suivante que lorsque vous formez le bon doigté sur le saxophone !

### 3. 📖 Table des Doigtés (Mode Révision & Dictionnaire)
* Tableau complet des **31 notes** du saxophone ténor (du Si♭ grave au Fa suraigu).
* Filtres par registres : Débutant facile, Grave, Médium, Aigu, Altérations (♯ / ♭).
* Recherche instantanée par nom de note.
* Bouton d'écoute audio sur chaque carte.
* Fenêtre d'inspection détaillée avec description, doigtés alternatifs et grand schéma du saxophone.

### 4. 💡 Guide du Débutant
* Explication simple de la **transposition en Si♭** propre au saxophone ténor.
* Comment lire une portée en clé de sol en 2 minutes.
* Posture des mains, position de l'embouchure et émission du premier son.
* L'ordre recommandé pour aborder ses premières notes.

---

## 🔊 Synthétiseur Web Audio API

L'application intègre un moteur de synthèse sonore autonome utilisant l'API Web Audio native du navigateur :
* **Timbre acoustique chaleureux** : combinaison d'oscillateurs en dent de scie et triangle, harmonique sub-grave, filtre résonant conique simulant le corps du saxophone, et vibrato subtil.
* **Sélecteur de transposition** (en haut à droite) :
  * **🎷 Son réel Sax Ténor (Si♭)** : joue la note exacte à la hauteur réelle de l'instrument (-14 demi-tons). Idéal si vous jouez en même temps avec votre vrai saxophone ténor !
  * **🎹 Hauteur écrite (Piano / Ut)** : joue la note au diapason concert écrit.

---

## 🚀 Déploiement sur GitHub Pages (Guide pas à pas)

L'application est conçue pour être déployée en 4 étapes simples et gratuites sur GitHub Pages :

### Étape 1 : Créer un dépôt sur GitHub
1. Rendez-vous sur [github.com](https://github.com) et connectez-vous.
2. Cliquez sur le bouton vert **« New repository »** (Nouveau dépôt).
3. Nommez votre dépôt (par exemple `saxophone-tenor-studio`).
4. Choisissez la visibilité **Public**.
5. Ne cochez pas « Add a README file » si vous poussez ce dossier déjà prêt.
6. Cliquez sur **« Create repository »**.

### Étape 2 : Pousser les fichiers avec Git
Dans votre terminal (ou PowerShell), placez-vous dans le dossier du projet et exécutez :

```bash
# 1. Initialiser le dépôt local (si ce n'est pas déjà fait)
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Créer le commit initial
git commit -m "Initial commit - SaxTénor Studio"

# 4. Renommer la branche principale en main
git branch -M main

# 5. Lier au dépôt distant (remplacez VOTRE_PSEUDO et NOM_DU_DEPOT)
git remote add origin https://github.com/VOTRE_PSEUDO/saxophone-tenor-studio.git

# 6. Pousser les fichiers sur GitHub
git push -u origin main
```

### Étape 3 : Activer GitHub Pages
1. Sur la page de votre dépôt GitHub, cliquez sur l'onglet **« Settings »** (Paramètres).
2. Dans le menu de gauche, descendez jusqu'à la section **« Pages »** (sous la catégorie *Code and automation*).
3. Dans la section **« Build and deployment »** :
   * **Source** : laissez sélectionné `Deploy from a branch`.
   * **Branch** : sélectionnez `main` et laissez le dossier sur `/ (root)`.
4. Cliquez sur **« Save »**.

### Étape 4 : Accéder à votre application en ligne
GitHub construira la page en quelques secondes. Votre application sera disponible à l'adresse :
```
https://VOTRE_PSEUDO.github.io/saxophone-tenor-studio/
```

---

## 💻 Utilisation locale hors-ligne

Aucun serveur n'est nécessaire ! Vous pouvez utiliser l'application immédiatement sur votre ordinateur :
1. Téléchargez ou clonez ce dossier.
2. Double-cliquez directement sur le fichier `index.html` pour l'ouvrir dans votre navigateur préféré (Chrome, Firefox, Safari, Edge).
3. Aucune connexion internet n'est requise.

---

## 📁 Structure des fichiers

```text
Saxophone/
├── index.html       # Structure HTML5 sémantique, portée et conteneurs d'onglets
├── style.css        # Styles CSS3 modernes, palette laiton/papier, responsive
├── script.js        # Moteur audio Web Audio, logique de solfège, SVG et interaction
├── .gitattributes   # Normalisation des fins de ligne Git
└── README.md        # Documentation complète et guide de déploiement
```

---

## ⌨️ Raccourcis clavier (Mode Entraînement)

* **Espace** : Valider le doigté saisi ou passer à la note suivante.
* **R** : Tout relâcher (réinitialiser les clés fermées).
* **S** : Écouter la note au synthétiseur.

---

## 📜 Licence

Ce projet est libre et ouvert, conçu pour favoriser l'apprentissage de la musique et du saxophone ténor.
Bonne pratique musicale ! 🎷🎶
