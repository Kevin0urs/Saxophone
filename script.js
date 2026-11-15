/**
 * ============================================================================
 * SaxTénor Studio - Application d'apprentissage du saxophone ténor & solfège
 * 100% Vanilla JavaScript - Aucun framework, aucune dépendance externe.
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. BASE DE DONNÉES DES NOTES DU SAXOPHONE TÉNOR
  // ==========================================================================
  // Diatonic steps: Line 1 (E4 / Mi) is step 0.
  // Each line/space is 1 diatonic step (+1 step = +1 line or space upwards).
  // Notes standardly written in treble clef for tenor saxophone.
  // Frequencies given for standard written pitch (A4 = 440 Hz).
  // ==========================================================================

  const SAX_NOTES = [
    {
      id: 'bb3',
      name: 'Si bémol grave',
      solfege: 'Si♭',
      octave: 3,
      step: -4,
      accidental: 'b',
      freq: 116.54,
      category: 'grave',
      level: 4,
      keys: ['lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_2', 'rh_3', 'rh_c', 'lh_bb'],
      altKeys: [['lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_2', 'rh_3', 'rh_c', 'lh_b', 'lh_bb']],
      summary: 'MG: 1, 2, 3 + Si♭ grave | MD: 4, 5, 6 + Do grave',
      desc: 'La note la plus grave du saxophone ! Fermez tous les doigts des deux mains, plus la clé de Do grave (petit doigt droit) et la clé de Si♭ grave (plateau petit doigt gauche).'
    },
    {
      id: 'b3',
      name: 'Si grave',
      solfege: 'Si',
      octave: 3,
      step: -3,
      accidental: '',
      freq: 123.47,
      category: 'grave',
      level: 4,
      keys: ['lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_2', 'rh_3', 'rh_c', 'lh_b'],
      summary: 'MG: 1, 2, 3 + Si grave | MD: 4, 5, 6 + Do grave',
      desc: 'Fermez tous les doigts des deux mains, plus la clé de Do grave au petit doigt droit et la clé de Si grave au petit doigt gauche.'
    },
    {
      id: 'c4',
      name: 'Do grave',
      solfege: 'Do',
      octave: 4,
      step: -2,
      accidental: '',
      freq: 130.81,
      category: 'grave',
      level: 2,
      keys: ['lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_2', 'rh_3', 'rh_c'],
      summary: 'MG: 1, 2, 3 | MD: 4, 5, 6 + Clé Do',
      desc: 'Doigté du Ré grave (les 6 doigts principaux) en ajoutant la clé de Do grave avec le petit doigt de la main droite.'
    },
    {
      id: 'cs4',
      name: 'Do dièse grave',
      solfege: 'Do♯',
      octave: 4,
      step: -2,
      accidental: '#',
      freq: 138.59,
      category: 'grave',
      level: 4,
      keys: ['lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_2', 'rh_3', 'rh_c', 'lh_cs'],
      altKeys: [['lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_2', 'rh_3', 'lh_cs']],
      summary: 'MG: 1, 2, 3 + Do♯ | MD: 4, 5, 6 + Do',
      desc: 'Fermez les 6 doigts principaux, la clé de Do grave (main droite) et la clé de Do♯ grave (plateau petit doigt gauche).'
    },
    {
      id: 'd4',
      name: 'Ré grave',
      solfege: 'Ré',
      octave: 4,
      step: -1,
      accidental: '',
      freq: 146.83,
      category: 'grave',
      level: 2,
      keys: ['lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_2', 'rh_3'],
      summary: 'MG: 1, 2, 3 | MD: 4, 5, 6',
      desc: 'Les 6 doigts principaux fermés : Index, Majeur, Annulaire des deux mains.'
    },
    {
      id: 'eb4',
      name: 'Mi bémol grave',
      solfege: 'Mi♭',
      octave: 4,
      step: 0,
      accidental: 'b',
      freq: 155.56,
      category: 'grave',
      level: 3,
      keys: ['lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_2', 'rh_3', 'rh_eb'],
      summary: 'MG: 1, 2, 3 | MD: 4, 5, 6 + Clé Mi♭',
      desc: 'Doigté du Ré grave + clé de Mi♭ avec le petit doigt de la main droite (clé supérieure du petit doigt droit).'
    },
    {
      id: 'e4',
      name: 'Mi',
      solfege: 'Mi',
      octave: 4,
      step: 0,
      accidental: '',
      freq: 164.81,
      category: 'medium',
      level: 2,
      keys: ['lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_2'],
      summary: 'MG: 1, 2, 3 | MD: 4, 5',
      desc: 'Main gauche 1, 2, 3 et main droite 4, 5 (Index et Majeur de la main droite).'
    },
    {
      id: 'f4',
      name: 'Fa',
      solfege: 'Fa',
      octave: 4,
      step: 1,
      accidental: '',
      freq: 174.61,
      category: 'medium',
      level: 2,
      keys: ['lh_1', 'lh_2', 'lh_3', 'rh_1'],
      summary: 'MG: 1, 2, 3 | MD: 4 (Index)',
      desc: 'Main gauche 1, 2, 3 et index de la main droite (touche 4).'
    },
    {
      id: 'fs4',
      name: 'Fa dièse',
      solfege: 'Fa♯',
      octave: 4,
      step: 1,
      accidental: '#',
      freq: 185.00,
      category: 'medium',
      level: 3,
      keys: ['lh_1', 'lh_2', 'lh_3', 'rh_2'],
      altKeys: [['lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_fsharp']],
      summary: 'MG: 1, 2, 3 | MD: 5 (Majeur)',
      desc: 'Main gauche 1, 2, 3 + majeur de la main droite (touche 5). Doigté alternatif : Fa normal + clé latérale Fa♯ chromatique.'
    },
    {
      id: 'g4',
      name: 'Sol',
      solfege: 'Sol',
      octave: 4,
      step: 2,
      accidental: '',
      freq: 196.00,
      category: 'medium',
      level: 1,
      keys: ['lh_1', 'lh_2', 'lh_3'],
      summary: 'MG: 1, 2, 3 (Main droite libre)',
      desc: 'Les 3 premiers doigts de la main gauche : Index, Majeur, Annulaire. La main droite ne touche à rien.'
    },
    {
      id: 'gs4',
      name: 'Sol dièse',
      solfege: 'Sol♯',
      octave: 4,
      step: 2,
      accidental: '#',
      freq: 207.65,
      category: 'medium',
      level: 3,
      keys: ['lh_1', 'lh_2', 'lh_3', 'lh_gs'],
      summary: 'MG: 1, 2, 3 + Clé Sol♯',
      desc: 'Doigté du Sol + appuyez sur la clé de Sol♯ avec le petit doigt de la main gauche.'
    },
    {
      id: 'a4',
      name: 'La',
      solfege: 'La',
      octave: 4,
      step: 3,
      accidental: '',
      freq: 220.00,
      category: 'medium',
      level: 1,
      keys: ['lh_1', 'lh_2'],
      summary: 'MG: 1, 2 (Index et Majeur)',
      desc: 'Index et Majeur de la main gauche (touches 1 et 2).'
    },
    {
      id: 'bb4',
      name: 'Si bémol',
      solfege: 'Si♭',
      octave: 4,
      step: 4,
      accidental: 'b',
      freq: 233.08,
      category: 'medium',
      level: 3,
      keys: ['lh_1', 'lh_bis'],
      altKeys: [['lh_1', 'rh_1'], ['lh_1', 'side_bb']],
      summary: 'MG: 1 + Bis (ou 1 MG + 1 MD)',
      desc: 'Doigté Bis (le plus fluide) : l\'index gauche appuie simultanément sur la touche 1 et la petite touche Bis en dessous. Doigté alternatif : 1 main gauche + 1 main droite.'
    },
    {
      id: 'b4',
      name: 'Si',
      solfege: 'Si',
      octave: 4,
      step: 4,
      accidental: '',
      freq: 246.94,
      category: 'medium',
      level: 1,
      keys: ['lh_1'],
      summary: 'MG: 1 (Index seul)',
      desc: 'L\'index de la main gauche seul sur la touche 1. C\'est généralement la première note apprise au saxophone !'
    },
    {
      id: 'c5',
      name: 'Do médium',
      solfege: 'Do',
      octave: 5,
      step: 5,
      accidental: '',
      freq: 261.63,
      category: 'medium',
      level: 1,
      keys: ['lh_2'],
      altKeys: [['lh_1', 'side_c']],
      summary: 'MG: 2 (Majeur seul)',
      desc: 'Le majeur de la main gauche seul sur la touche 2 (l\'index est levé).'
    },
    {
      id: 'cs5',
      name: 'Do dièse médium',
      solfege: 'Do♯',
      octave: 5,
      step: 5,
      accidental: '#',
      freq: 277.18,
      category: 'medium',
      level: 3,
      keys: [],
      summary: 'Tube ouvert (Aucune touche)',
      desc: 'Tube entièrement ouvert ! Aucun doigt n\'appuie sur une touche.'
    },
    {
      id: 'd5',
      name: 'Ré aigu',
      solfege: 'Ré',
      octave: 5,
      step: 6,
      accidental: '',
      freq: 293.66,
      category: 'aigu',
      level: 1,
      keys: ['octave', 'lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_2', 'rh_3'],
      summary: 'Clé d\'octave + 6 doigts (Ré)',
      desc: 'Clé d\'octave (pouce gauche) + le doigté complet du Ré (main gauche 1, 2, 3 et main droite 4, 5, 6).'
    },
    {
      id: 'eb5',
      name: 'Mi bémol aigu',
      solfege: 'Mi♭',
      octave: 5,
      step: 7,
      accidental: 'b',
      freq: 311.13,
      category: 'aigu',
      level: 3,
      keys: ['octave', 'lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_2', 'rh_3', 'rh_eb'],
      summary: 'Clé d\'octave + Ré aigu + Mi♭',
      desc: 'Clé d\'octave + 6 doigts + clé de Mi♭ au petit doigt droit.'
    },
    {
      id: 'e5',
      name: 'Mi aigu',
      solfege: 'Mi',
      octave: 5,
      step: 7,
      accidental: '',
      freq: 329.63,
      category: 'aigu',
      level: 2,
      keys: ['octave', 'lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_2'],
      summary: 'Clé d\'octave + MG 1, 2, 3 + MD 4, 5',
      desc: 'Clé d\'octave + 3 doigts main gauche + 2 doigts main droite.'
    },
    {
      id: 'f5',
      name: 'Fa aigu',
      solfege: 'Fa',
      octave: 5,
      step: 8,
      accidental: '',
      freq: 349.23,
      category: 'aigu',
      level: 2,
      keys: ['octave', 'lh_1', 'lh_2', 'lh_3', 'rh_1'],
      summary: 'Clé d\'octave + MG 1, 2, 3 + MD 4',
      desc: 'Clé d\'octave + 3 doigts main gauche + index main droite.'
    },
    {
      id: 'fs5',
      name: 'Fa dièse aigu',
      solfege: 'Fa♯',
      octave: 5,
      step: 8,
      accidental: '#',
      freq: 369.99,
      category: 'aigu',
      level: 3,
      keys: ['octave', 'lh_1', 'lh_2', 'lh_3', 'rh_2'],
      altKeys: [['octave', 'lh_1', 'lh_2', 'lh_3', 'rh_1', 'rh_fsharp']],
      summary: 'Clé d\'octave + MG 1, 2, 3 + MD 5',
      desc: 'Clé d\'octave + 3 doigts main gauche + majeur main droite (touche 5).'
    },
    {
      id: 'g5',
      name: 'Sol aigu',
      solfege: 'Sol',
      octave: 5,
      step: 9,
      accidental: '',
      freq: 392.00,
      category: 'aigu',
      level: 2,
      keys: ['octave', 'lh_1', 'lh_2', 'lh_3'],
      summary: 'Clé d\'octave + MG 1, 2, 3',
      desc: 'Clé d\'octave au pouce gauche + 3 doigts de la main gauche.'
    },
    {
      id: 'gs5',
      name: 'Sol dièse aigu',
      solfege: 'Sol♯',
      octave: 5,
      step: 9,
      accidental: '#',
      freq: 415.30,
      category: 'aigu',
      level: 4,
      keys: ['octave', 'lh_1', 'lh_2', 'lh_3', 'lh_gs'],
      summary: 'Clé d\'octave + Sol + Clé Sol♯',
      desc: 'Clé d\'octave + Sol aigu + clé Sol♯ au petit doigt gauche.'
    },
    {
      id: 'a5',
      name: 'La aigu',
      solfege: 'La',
      octave: 5,
      step: 10,
      accidental: '',
      freq: 440.00,
      category: 'aigu',
      level: 2,
      keys: ['octave', 'lh_1', 'lh_2'],
      summary: 'Clé d\'octave + MG 1, 2',
      desc: 'Clé d\'octave + Index et Majeur de la main gauche.'
    },
    {
      id: 'bb5',
      name: 'Si bémol aigu',
      solfege: 'Si♭',
      octave: 5,
      step: 11,
      accidental: 'b',
      freq: 466.16,
      category: 'aigu',
      level: 3,
      keys: ['octave', 'lh_1', 'lh_bis'],
      altKeys: [['octave', 'lh_1', 'rh_1'], ['octave', 'lh_1', 'side_bb']],
      summary: 'Clé d\'octave + 1 + Bis',
      desc: 'Clé d\'octave + Touche 1 et petite touche Bis.'
    },
    {
      id: 'b5',
      name: 'Si aigu',
      solfege: 'Si',
      octave: 5,
      step: 11,
      accidental: '',
      freq: 493.88,
      category: 'aigu',
      level: 2,
      keys: ['octave', 'lh_1'],
      summary: 'Clé d\'octave + MG 1',
      desc: 'Clé d\'octave au pouce gauche + Index gauche seul.'
    },
    {
      id: 'c6',
      name: 'Do aigu',
      solfege: 'Do',
      octave: 6,
      step: 12,
      accidental: '',
      freq: 523.25,
      category: 'aigu',
      level: 2,
      keys: ['octave', 'lh_2'],
      altKeys: [['octave', 'lh_1', 'side_c']],
      summary: 'Clé d\'octave + MG 2',
      desc: 'Clé d\'octave au pouce gauche + Majeur gauche seul.'
    },
    {
      id: 'cs6',
      name: 'Do dièse aigu',
      solfege: 'Do♯',
      octave: 6,
      step: 12,
      accidental: '#',
      freq: 554.37,
      category: 'aigu',
      level: 4,
      keys: ['octave'],
      summary: 'Clé d\'octave seule',
      desc: 'Clé d\'octave seule, aucun autre doigt n\'appuie sur le tube.'
    },
    {
      id: 'd6',
      name: 'Ré suraigu',
      solfege: 'Ré',
      octave: 6,
      step: 13,
      accidental: '',
      freq: 587.33,
      category: 'aigu',
      level: 5,
      keys: ['octave', 'palm_d'],
      summary: 'Clé d\'octave + Palme Ré',
      desc: 'Clé d\'octave + Palme de Ré (D) avec la paume / troisième phalange de la main gauche.'
    },
    {
      id: 'eb6',
      name: 'Mi bémol suraigu',
      solfege: 'Mi♭',
      octave: 6,
      step: 14,
      accidental: 'b',
      freq: 622.25,
      category: 'aigu',
      level: 5,
      keys: ['octave', 'palm_d', 'palm_eb'],
      summary: 'Clé d\'octave + Palmes Ré + Mi♭',
      desc: 'Clé d\'octave + Palme de Ré + Palme de Mi♭.'
    },
    {
      id: 'f6',
      name: 'Fa suraigu',
      solfege: 'Fa',
      octave: 6,
      step: 15,
      accidental: '',
      freq: 659.25,
      category: 'aigu',
      level: 5,
      keys: ['octave', 'palm_d', 'palm_eb', 'palm_f'],
      altKeys: [['octave', 'palm_d', 'palm_eb', 'side_e']],
      summary: 'Clé d\'octave + Palmes Ré, Mi♭, Fa',
      desc: 'Clé d\'octave + Palmes de Ré, Mi♭ et Fa (ou clé latérale Mi).'
    }
  ];

  // ==========================================================================
  // 2. BIBLIOTHÈQUE DES MORCEAUX GUIDÉS (AIRS POUR DÉBUTANTS)
  // ==========================================================================

  const SONGS = [
    {
      id: 'song-clair-de-lune',
      title: 'Au clair de la lune',
      genre: 'Air traditionnel français',
      meta: '5 notes (Sol, La, Si, Do, Ré) • Le morceau idéal pour commencer',
      advice: 'Ce morceau classique n\'utilise que les notes les plus naturelles de la main gauche. Veillez à relâcher les doigts non utilisés.',
      notes: [
        { noteId: 'g4', lyric: 'Au' },
        { noteId: 'g4', lyric: 'clair' },
        { noteId: 'g4', lyric: 'de' },
        { noteId: 'a4', lyric: 'la' },
        { noteId: 'b4', lyric: 'lu-' },
        { noteId: 'a4', lyric: 'ne,' },
        { noteId: 'g4', lyric: 'Mon' },
        { noteId: 'b4', lyric: 'a-' },
        { noteId: 'a4', lyric: 'mi' },
        { noteId: 'a4', lyric: 'Pier-' },
        { noteId: 'g4', lyric: 'rot,' },
        { noteId: 'g4', lyric: 'Prê-' },
        { noteId: 'g4', lyric: 'te-' },
        { noteId: 'g4', lyric: 'moi' },
        { noteId: 'a4', lyric: 'ta' },
        { noteId: 'b4', lyric: 'plu-' },
        { noteId: 'a4', lyric: 'me,' },
        { noteId: 'g4', lyric: 'Pour' },
        { noteId: 'b4', lyric: 'é-' },
        { noteId: 'a4', lyric: 'crire' },
        { noteId: 'a4', lyric: 'un' },
        { noteId: 'g4', lyric: 'mot.' }
      ]
    },
    {
      id: 'song-maman',
      title: 'Ah ! vous dirai-je, maman',
      genre: 'Air classique populaire / Mozart',
      meta: 'De Do grave à La • Travail du passage main gauche / main droite',
      advice: 'Idéal pour coordonner les deux mains : veillez à fermer ensemble les 3 doigts de la main droite pour le passage du Sol au Fa.',
      notes: [
        { noteId: 'c4', lyric: 'Ah !' },
        { noteId: 'c4', lyric: 'vous' },
        { noteId: 'g4', lyric: 'di-' },
        { noteId: 'g4', lyric: 'rai-' },
        { noteId: 'a4', lyric: 'je,' },
        { noteId: 'a4', lyric: 'ma-' },
        { noteId: 'g4', lyric: 'man,' },
        { noteId: 'f4', lyric: 'Ce' },
        { noteId: 'f4', lyric: 'qui' },
        { noteId: 'e4', lyric: 'cau-' },
        { noteId: 'e4', lyric: 'se' },
        { noteId: 'd4', lyric: 'mon' },
        { noteId: 'd4', lyric: 'tour-' },
        { noteId: 'c4', lyric: 'ment.' },
        { noteId: 'g4', lyric: 'Pa-' },
        { noteId: 'g4', lyric: 'pa' },
        { noteId: 'f4', lyric: 'veut' },
        { noteId: 'f4', lyric: 'que' },
        { noteId: 'e4', lyric: 'je' },
        { noteId: 'e4', lyric: 'rai-' },
        { noteId: 'd4', lyric: 'sonne,' },
        { noteId: 'g4', lyric: 'Comme' },
        { noteId: 'g4', lyric: 'u-' },
        { noteId: 'f4', lyric: 'ne' },
        { noteId: 'f4', lyric: 'gran-' },
        { noteId: 'e4', lyric: 'de' },
        { noteId: 'e4', lyric: 'per-' },
        { noteId: 'd4', lyric: 'sonne.' }
      ]
    },
    {
      id: 'song-ode-joie',
      title: 'Ode à la joie',
      genre: 'L. van Beethoven • 9ème Symphonie',
      meta: 'De Sol à Ré aigu • Clé d\'octave au pouce gauche',
      advice: 'Ce thème héroïque monte jusqu\'au Ré aigu. Pensez à bien faire basculer le pouce gauche sur la clé d\'octave sans lever le pouce !',
      notes: [
        { noteId: 'b4', lyric: 'Ode' },
        { noteId: 'b4', lyric: 'à' },
        { noteId: 'c5', lyric: 'la' },
        { noteId: 'd5', lyric: 'joie,' },
        { noteId: 'd5', lyric: 'bel-' },
        { noteId: 'c5', lyric: 'le' },
        { noteId: 'b4', lyric: 'é-' },
        { noteId: 'a4', lyric: 'tin-' },
        { noteId: 'g4', lyric: 'cel-' },
        { noteId: 'g4', lyric: 'le' },
        { noteId: 'a4', lyric: 'des' },
        { noteId: 'b4', lyric: 'a-' },
        { noteId: 'b4', lyric: 'zurs' },
        { noteId: 'a4', lyric: 'ra-' },
        { noteId: 'a4', lyric: 'di-' },
        { noteId: 'b4', lyric: 'Ode' },
        { noteId: 'b4', lyric: 'à' },
        { noteId: 'c5', lyric: 'la' },
        { noteId: 'd5', lyric: 'joie,' },
        { noteId: 'd5', lyric: 'bel-' },
        { noteId: 'c5', lyric: 'le' },
        { noteId: 'b4', lyric: 'é-' },
        { noteId: 'a4', lyric: 'tin-' },
        { noteId: 'g4', lyric: 'cel-' },
        { noteId: 'g4', lyric: 'le,' },
        { noteId: 'a4', lyric: 'du' },
        { noteId: 'b4', lyric: 'bon-' },
        { noteId: 'a4', lyric: 'heur' },
        { noteId: 'g4', lyric: 'en-' },
        { noteId: 'g4', lyric: 'fin.' }
      ]
    },
    {
      id: 'song-happy-birthday',
      title: 'Joyeux Anniversaire (Happy Birthday)',
      genre: 'Chanson universelle',
      meta: 'Mélodie populaire • Grand écart mélodique',
      advice: 'Faites attention au grand saut d\'octave vers le Sol aigu dans la 3ème phrase. Gardez une bonne colonne d\'air soutenue.',
      notes: [
        { noteId: 'g4', lyric: 'Joy-' },
        { noteId: 'g4', lyric: 'eux' },
        { noteId: 'a4', lyric: 'an-' },
        { noteId: 'g4', lyric: 'ni-' },
        { noteId: 'c5', lyric: 'ver-' },
        { noteId: 'b4', lyric: 'saire,' },
        { noteId: 'g4', lyric: 'Joy-' },
        { noteId: 'g4', lyric: 'eux' },
        { noteId: 'a4', lyric: 'an-' },
        { noteId: 'g4', lyric: 'ni-' },
        { noteId: 'd5', lyric: 'ver-' },
        { noteId: 'c5', lyric: 'saire,' },
        { noteId: 'g4', lyric: 'Joy-' },
        { noteId: 'g4', lyric: 'eux' },
        { noteId: 'g5', lyric: 'an-' },
        { noteId: 'e5', lyric: 'ni-' },
        { noteId: 'c5', lyric: 'ver-' },
        { noteId: 'b4', lyric: 'saire' },
        { noteId: 'a4', lyric: 'cher' },
        { noteId: 'f5', lyric: 'a-' },
        { noteId: 'f5', lyric: 'mi,' },
        { noteId: 'e5', lyric: 'Joy-' },
        { noteId: 'c5', lyric: 'eux' },
        { noteId: 'd5', lyric: 'an-' },
        { noteId: 'c5', lyric: 'an !' }
      ]
    },
    {
      id: 'song-frere-jacques',
      title: 'Frère Jacques',
      genre: 'Canon traditionnel',
      meta: 'Mélodie à 4 phrases répétées • Très stable et régulier',
      advice: 'Parfait pour s\'entraîner au tempo régulier et à la respiration détendue.',
      notes: [
        { noteId: 'c4', lyric: 'Frè-' },
        { noteId: 'd4', lyric: 're' },
        { noteId: 'e4', lyric: 'Jac-' },
        { noteId: 'c4', lyric: 'ques,' },
        { noteId: 'c4', lyric: 'Frè-' },
        { noteId: 'd4', lyric: 're' },
        { noteId: 'e4', lyric: 'Jac-' },
        { noteId: 'c4', lyric: 'ques,' },
        { noteId: 'e4', lyric: 'Dor-' },
        { noteId: 'f4', lyric: 'mez-' },
        { noteId: 'g4', lyric: 'vous ?' },
        { noteId: 'e4', lyric: 'Dor-' },
        { noteId: 'f4', lyric: 'mez-' },
        { noteId: 'g4', lyric: 'vous ?' },
        { noteId: 'g4', lyric: 'Son-' },
        { noteId: 'a4', lyric: 'nez' },
        { noteId: 'g4', lyric: 'les' },
        { noteId: 'f4', lyric: 'ma-' },
        { noteId: 'e4', lyric: 'ti-' },
        { noteId: 'c4', lyric: 'nes !' },
        { noteId: 'g4', lyric: 'Son-' },
        { noteId: 'a4', lyric: 'nez' },
        { noteId: 'g4', lyric: 'les' },
        { noteId: 'f4', lyric: 'ma-' },
        { noteId: 'e4', lyric: 'ti-' },
        { noteId: 'c4', lyric: 'nes !' }
      ]
    },
    {
      id: 'song-jingle-bells',
      title: 'Vive le vent (Jingle Bells)',
      genre: 'Chant populaire • J. Pierpont',
      meta: 'Rythme enjoué • Répétition de la note Mi',
      advice: 'Donnez une petite impulsion de langue ("Té") pour détacher chaque Mi répété sans couper votre colonne d\'air.',
      notes: [
        { noteId: 'e4', lyric: 'Vi-' },
        { noteId: 'e4', lyric: 've' },
        { noteId: 'e4', lyric: 'le' },
        { noteId: 'e4', lyric: 'vent,' },
        { noteId: 'e4', lyric: 'vi-' },
        { noteId: 'e4', lyric: 've' },
        { noteId: 'e4', lyric: 'le' },
        { noteId: 'e4', lyric: 'vent,' },
        { noteId: 'e4', lyric: 'Vi-' },
        { noteId: 'g4', lyric: 've' },
        { noteId: 'c4', lyric: 'le' },
        { noteId: 'd4', lyric: 'vent' },
        { noteId: 'e4', lyric: 'd\'hi-' },
        { noteId: 'f4', lyric: 'ver !' },
        { noteId: 'f4', lyric: 'Boules' },
        { noteId: 'f4', lyric: 'de' },
        { noteId: 'f4', lyric: 'neige' },
        { noteId: 'f4', lyric: 'et' },
        { noteId: 'e4', lyric: 'jour' },
        { noteId: 'e4', lyric: 'de' },
        { noteId: 'e4', lyric: 'l\'an' },
        { noteId: 'd4', lyric: 'et' },
        { noteId: 'd4', lyric: 'bon-' },
        { noteId: 'e4', lyric: 'ne' },
        { noteId: 'd4', lyric: 'an-' },
        { noteId: 'g4', lyric: 'née !' }
      ]
    },
    {
      id: 'song-saints',
      title: 'When the Saints Go Marching In',
      genre: 'Standard de jazz New Orleans',
      meta: 'L\'air incontournable du saxophone jazz !',
      advice: 'Swignez légèrement le tempo ! Ce morceau met en valeur la puissance du son chaud du saxophone ténor.',
      notes: [
        { noteId: 'c4', lyric: 'Oh' },
        { noteId: 'e4', lyric: 'when' },
        { noteId: 'f4', lyric: 'the' },
        { noteId: 'g4', lyric: 'saints,' },
        { noteId: 'c4', lyric: 'Oh' },
        { noteId: 'e4', lyric: 'when' },
        { noteId: 'f4', lyric: 'the' },
        { noteId: 'g4', lyric: 'saints,' },
        { noteId: 'c4', lyric: 'Oh' },
        { noteId: 'e4', lyric: 'when' },
        { noteId: 'f4', lyric: 'the' },
        { noteId: 'g4', lyric: 'saints' },
        { noteId: 'e4', lyric: 'go' },
        { noteId: 'c4', lyric: 'mar-' },
        { noteId: 'e4', lyric: 'ching' },
        { noteId: 'd4', lyric: 'in !' },
        { noteId: 'e4', lyric: 'Lord' },
        { noteId: 'e4', lyric: 'I' },
        { noteId: 'd4', lyric: 'want' },
        { noteId: 'c4', lyric: 'to' },
        { noteId: 'c4', lyric: 'be' },
        { noteId: 'e4', lyric: 'in' },
        { noteId: 'g4', lyric: 'that' },
        { noteId: 'g4', lyric: 'num-' },
        { noteId: 'f4', lyric: 'ber,' },
        { noteId: 'e4', lyric: 'When' },
        { noteId: 'f4', lyric: 'the' },
        { noteId: 'g4', lyric: 'saints' },
        { noteId: 'e4', lyric: 'go' },
        { noteId: 'c4', lyric: 'mar-' },
        { noteId: 'd4', lyric: 'ching' },
        { noteId: 'c4', lyric: 'in !' }
      ]
    },
    {
      id: 'song-bella-ciao',
      title: 'Bella Ciao',
      genre: 'Chant populaire italien',
      meta: 'Mineur & dynamique • De Mi à Do aigu',
      advice: 'Rythme vif et entraînant. Articulez bien le passage La - Si - Do avec l\'index et le majeur de la main gauche.',
      notes: [
        { noteId: 'e4', lyric: 'U-' },
        { noteId: 'a4', lyric: 'na' },
        { noteId: 'b4', lyric: 'mat-' },
        { noteId: 'c5', lyric: 'ti-' },
        { noteId: 'a4', lyric: 'na' },
        { noteId: 'e4', lyric: 'mi' },
        { noteId: 'a4', lyric: 'so' },
        { noteId: 'b4', lyric: 'sve-' },
        { noteId: 'c5', lyric: 'glia-' },
        { noteId: 'a4', lyric: 'to,' },
        { noteId: 'e4', lyric: 'O' },
        { noteId: 'a4', lyric: 'bel-' },
        { noteId: 'b4', lyric: 'la' },
        { noteId: 'c5', lyric: 'ciao,' },
        { noteId: 'b4', lyric: 'bel-' },
        { noteId: 'a4', lyric: 'la' },
        { noteId: 'c5', lyric: 'ciao,' },
        { noteId: 'b4', lyric: 'bel-' },
        { noteId: 'a4', lyric: 'la' },
        { noteId: 'e4', lyric: 'ciao,' },
        { noteId: 'e4', lyric: 'ciao,' },
        { noteId: 'e4', lyric: 'ciao !' }
      ]
    }
  ];

  // ==========================================================================
  // 3. MOTEUR AUDIO (WEB AUDIO API - SYNTHÉTISEUR SAXOPHONE TÉNOR)
  // ==========================================================================

  const AudioEngine = {
    ctx: null,
    masterGain: null,
    volume: 0.7,
    soundEnabled: true,
    pitchMode: 'tenor', // 'tenor' (Bb transposed) or 'concert' (written)

    init() {
      if (this.ctx) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch (e) {
        console.warn('Web Audio non disponible :', e);
      }
    },

    resume() {
      if (!this.ctx) this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },

    setVolume(vol) {
      this.volume = Math.max(0, Math.min(1, vol));
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.soundEnabled ? this.volume : 0, this.ctx.currentTime);
      }
    },

    setSoundEnabled(enabled) {
      this.soundEnabled = enabled;
      this.setVolume(this.volume);
    },

    setPitchMode(mode) {
      this.pitchMode = mode;
    },

    /**
     * Calcule la fréquence effective selon le mode (Son réel Sax Ténor en Si♭ ou Hauteur écrite).
     * Le saxophone ténor sonne une 9ème majeure en dessous de la note écrite (-14 demi-tons).
     */
    getEffectiveFrequency(writtenFreq) {
      if (this.pitchMode === 'tenor') {
        // -14 demi-tons = fréquence / (2^(14/12))
        return writtenFreq * Math.pow(2, -14 / 12);
      }
      return writtenFreq;
    },

    /**
     * Joue une note au timbre de saxophone (harmoniques paires et impaires, filtre passe-bas, vibrato léger)
     */
    playSaxTone(writtenFreq, duration = 0.7) {
      if (!this.soundEnabled) return;
      this.resume();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freq = this.getEffectiveFrequency(writtenFreq);

      // Oscillateurs harmoniques pour un son chaud de bois/cuivre
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const osc3 = this.ctx.createOscillator();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq, now);

      // Sub-harmonique subtile pour la rondeur du tube ténor
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(freq / 2, now);

      // Filtre acoustique passe-bas résonant (modélisation de la perce conique du saxophone)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      const cutoff = Math.min(2600, freq * 5.2);
      filter.frequency.setValueAtTime(cutoff, now);
      filter.Q.setValueAtTime(1.8, now);

      // Vibrato léger après 150ms
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(4.8, now); // ~5 Hz
      lfoGain.gain.setValueAtTime(0, now);
      lfoGain.gain.setValueAtTime(0, now + 0.12);
      lfoGain.gain.linearRampToValueAtTime(freq * 0.012, now + 0.35); // Légère modulation
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);

      // Enveloppe d'amplitude douce (respiration humaine)
      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.7, now + 0.04); // Attaque 40ms
      noteGain.gain.linearRampToValueAtTime(0.55, now + 0.15); // Décroissance
      noteGain.gain.setValueAtTime(0.55, now + duration - 0.08); // Soutien
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration); // Relâchement 80ms

      // Mixage
      const g1 = this.ctx.createGain();
      g1.gain.value = 0.55;
      const g2 = this.ctx.createGain();
      g2.gain.value = 0.35;
      const g3 = this.ctx.createGain();
      g3.gain.value = 0.18;

      osc1.connect(g1);
      osc2.connect(g2);
      osc3.connect(g3);

      g1.connect(filter);
      g2.connect(filter);
      g3.connect(filter);

      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      lfo.start(now);
      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      const stopTime = now + duration + 0.05;
      osc1.stop(stopTime);
      osc2.stop(stopTime);
      osc3.stop(stopTime);
      lfo.stop(stopTime);
    },

    /**
     * Carillon mélodique de félicitations
     */
    playSuccessChime() {
      if (!this.soundEnabled) return;
      this.resume();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Do - Mi - Sol - Do aigu

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    },

    /**
     * Son doux d'erreur bienveillante
     */
    playErrorChime() {
      if (!this.soundEnabled) return;
      this.resume();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(175, now + 0.22);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.28);
    }
  };

  // ==========================================================================
  // 4. MOTEUR SVG : PORTÉE MUSICALE (CLEF DE SOL PURE SANS IMAGE EXTERNE)
  // ==========================================================================

  const StaffRenderer = {
    // Chemin SVG précis de la clé de sol
    CLEF_PATH: 'M 28 85 C 24 85 20 83 17 79 C 14 74 15 67 20 61 C 25 54 33 50 41 51 C 49 52 55 58 56 66 C 57 74 51 82 44 85 C 38 87 31 84 27 79 C 24 75 25 70 29 67 C 32 64 36 64 38 67 C 40 69 39 72 37 74 C 34 76 32 74 32 73 C 32 72 33 71 34 71 C 35 71 36 72 35 72 C 33 74 34 78 39 78 C 44 78 47 72 46 66 C 45 59 39 55 32 55 C 24 55 18 61 17 69 C 16 78 23 86 32 87 C 40 88 48 83 51 76 C 54 69 54 60 50 52 C 45 40 37 28 33 16 C 32 13 32 9 34 6 C 36 3 40 2 42 4 C 45 6 45 12 44 17 C 42 30 38 44 36 58 L 36 96 C 36 102 32 108 27 109 C 21 110 16 105 16 99 C 16 93 21 89 26 89 C 30 89 32 91 33 93 C 34 95 33 98 30 99 C 28 100 26 99 25 97 C 25 95 26 94 28 94 C 29 94 30 95 30 96 C 29 98 26 98 24 97 C 21 95 20 92 21 88 C 22 83 26 80 31 80 C 37 80 40 84 40 90 L 40 55 C 43 43 47 29 49 17 C 50 11 49 4 44 1 C 39 -2 33 0 29 5 C 25 10 26 18 28 25 C 33 37 40 49 44 61 C 48 70 48 80 42 87 C 38 92 31 93 25 91 Z',

    /**
     * Calcule la coordonnée Y pour un degré diatonique
     * Ligne 1 (Mi4 / step 0) est à y = 110. Écartement de ligne = 14px (7px par degré).
     */
    getStepY(step) {
      return 110 - step * 7;
    },

    /**
     * Dessine une note unique sur la portée
     */
    drawSingleNote(container, note, options = {}) {
      if (!container) return;
      const width = options.width || 340;
      const height = options.height || 160;
      const noteX = options.noteX || 200;

      const y = this.getStepY(note.step);
      const isHigh = note.step >= 4; // B4 et au-dessus : hampe vers le bas
      const stemEndX = isHigh ? noteX - 8.5 : noteX + 8.5;
      const stemEndY = isHigh ? y + 36 : y - 36;

      let svg = `
        <svg viewBox="0 0 ${width} ${height}" class="staff-svg" aria-label="Portée avec la note ${note.name}">
          <!-- 5 Lignes de la portée -->
          <g stroke="#334155" stroke-width="1.6" stroke-linecap="round">
            <line x1="20" y1="54" x2="${width - 20}" y2="54" />
            <line x1="20" y1="68" x2="${width - 20}" y2="68" />
            <line x1="20" y1="82" x2="${width - 20}" y2="82" />
            <line x1="20" y1="96" x2="${width - 20}" y2="96" />
            <line x1="20" y1="110" x2="${width - 20}" y2="110" />
          </g>

          <!-- Clé de Sol SVG -->
          <g transform="translate(30, 22) scale(0.92)" fill="#1E293B">
            <path d="${this.CLEF_PATH}" />
          </g>
      `;

      // Lignes supplémentaires inférieures (notes graves : Do, Si, Si♭)
      if (note.step <= -2) {
        for (let s = -2; s >= note.step; s -= 2) {
          const ly = this.getStepY(s);
          svg += `<line x1="${noteX - 18}" y1="${ly}" x2="${noteX + 18}" y2="${ly}" stroke="#1E293B" stroke-width="1.8" stroke-linecap="round" />`;
        }
      }

      // Lignes supplémentaires supérieures (notes aiguës : La, Do, Ré, Mi, Fa)
      if (note.step >= 10) {
        for (let s = 10; s <= note.step; s += 2) {
          const ly = this.getStepY(s);
          svg += `<line x1="${noteX - 18}" y1="${ly}" x2="${noteX + 18}" y2="${ly}" stroke="#1E293B" stroke-width="1.8" stroke-linecap="round" />`;
        }
      }

      // Altération (Dièse ou Bémol)
      if (note.accidental === '#') {
        svg += `
          <g transform="translate(${noteX - 22}, ${y + 6})" font-family="sans-serif" font-weight="800" font-size="24" fill="#B45309">
            <text text-anchor="middle">♯</text>
          </g>
        `;
      } else if (note.accidental === 'b') {
        svg += `
          <g transform="translate(${noteX - 22}, ${y + 5})" font-family="sans-serif" font-weight="800" font-size="24" fill="#B45309">
            <text text-anchor="middle">♭</text>
          </g>
        `;
      }

      // Tête de la note (ovale incliné)
      svg += `
        <!-- Tête de note -->
        <ellipse cx="${noteX}" cy="${y}" rx="9.5" ry="7" transform="rotate(-22 ${noteX} ${y})" fill="#0F172A" />
        
        <!-- Hampe -->
        <line x1="${stemEndX}" y1="${y}" x2="${stemEndX}" y2="${stemEndY}" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round" />
      `;

      svg += `</svg>`;
      container.innerHTML = svg;
    },

    /**
     * Dessine une partition complète pour un morceau avec surbrillance de la note active
     */
    drawSongStaff(container, songNotes, activeIndex = 0) {
      if (!container || !songNotes || !songNotes.length) return;

      const noteSpacing = 44;
      const startX = 110;
      const totalWidth = Math.max(620, startX + songNotes.length * noteSpacing + 60);
      const height = 160;

      let svg = `
        <svg viewBox="0 0 ${totalWidth} ${height}" class="staff-svg" style="min-width: ${totalWidth}px;" aria-label="Partition du morceau">
          <!-- 5 Lignes de la portée -->
          <g stroke="#475569" stroke-width="1.5" stroke-linecap="round">
            <line x1="20" y1="54" x2="${totalWidth - 20}" y2="54" />
            <line x1="20" y1="68" x2="${totalWidth - 20}" y2="68" />
            <line x1="20" y1="82" x2="${totalWidth - 20}" y2="82" />
            <line x1="20" y1="96" x2="${totalWidth - 20}" y2="96" />
            <line x1="20" y1="110" x2="${totalWidth - 20}" y2="110" />
          </g>

          <!-- Clé de Sol -->
          <g transform="translate(30, 22) scale(0.92)" fill="#1E293B">
            <path d="${this.CLEF_PATH}" />
          </g>

          <!-- Barre de fin de portée -->
          <line x1="${totalWidth - 28}" y1="54" x2="${totalWidth - 28}" y2="110" stroke="#334155" stroke-width="1.5" />
          <line x1="${totalWidth - 22}" y1="54" x2="${totalWidth - 22}" y2="110" stroke="#334155" stroke-width="4" />
      `;

      songNotes.forEach((item, idx) => {
        const note = SAX_NOTES.find(n => n.id === item.noteId);
        if (!note) return;

        const noteX = startX + idx * noteSpacing;
        const y = this.getStepY(note.step);
        const isActive = idx === activeIndex;
        const isPast = idx < activeIndex;

        const isHigh = note.step >= 4;
        const stemEndX = isHigh ? noteX - 8 : noteX + 8;
        const stemEndY = isHigh ? y + 34 : y - 34;

        // Halo lumineux pour la note active
        if (isActive) {
          svg += `
            <circle cx="${noteX}" cy="${y}" r="20" fill="rgba(245, 158, 11, 0.25)" />
            <circle cx="${noteX}" cy="${y}" r="15" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4 2" />
          `;
        }

        // Lignes supplémentaires si nécessaire
        if (note.step <= -2) {
          for (let s = -2; s >= note.step; s -= 2) {
            const ly = this.getStepY(s);
            svg += `<line x1="${noteX - 14}" y1="${ly}" x2="${noteX + 14}" y2="${ly}" stroke="#334155" stroke-width="1.5" />`;
          }
        }
        if (note.step >= 10) {
          for (let s = 10; s <= note.step; s += 2) {
            const ly = this.getStepY(s);
            svg += `<line x1="${noteX - 14}" y1="${ly}" x2="${noteX + 14}" y2="${ly}" stroke="#334155" stroke-width="1.5" />`;
          }
        }

        // Altération éventuelle
        if (note.accidental === '#') {
          svg += `<text x="${noteX - 16}" y="${y + 5}" font-family="sans-serif" font-weight="700" font-size="16" fill="${isActive ? '#B45309' : '#475569'}">♯</text>`;
        } else if (note.accidental === 'b') {
          svg += `<text x="${noteX - 16}" y="${y + 4}" font-family="sans-serif" font-weight="700" font-size="16" fill="${isActive ? '#B45309' : '#475569'}">♭</text>`;
        }

        // Couleur de la note
        let noteFill = '#1E293B';
        if (isActive) noteFill = '#D97706';
        else if (isPast) noteFill = '#64748B';

        // Tête et hampe
        svg += `
          <ellipse cx="${noteX}" cy="${y}" rx="8.5" ry="6.2" transform="rotate(-22 ${noteX} ${y})" fill="${noteFill}" />
          <line x1="${stemEndX}" y1="${y}" x2="${stemEndX}" y2="${stemEndY}" stroke="${noteFill}" stroke-width="1.8" />
        `;

        // Paroles ou nom de note en dessous
        const lyricText = item.lyric || note.solfege;
        svg += `
          <text x="${noteX}" y="142" font-family="sans-serif" font-size="11" font-weight="${isActive ? '800' : '500'}" fill="${isActive ? '#B45309' : '#64748B'}" text-anchor="middle">
            ${lyricText}
          </text>
        `;
      });

      svg += `</svg>`;
      container.innerHTML = svg;

      // Défilement automatique pour garder la note active visible
      const activeX = startX + activeIndex * noteSpacing;
      const scrollParent = container.parentElement;
      if (scrollParent) {
        const targetScroll = activeX - scrollParent.clientWidth / 2;
        scrollParent.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
      }
    }
  };

  // ==========================================================================
  // 5. COMPOSANT SVG DU SAXOPHONE INTERACTIF (VUE DE FACE AVEC CLÉS)
  // ==========================================================================

  const SaxophoneComponent = {
    /**
     * Génère le balisage SVG complet du saxophone
     */
    generateSVG(idPrefix = 'sax') {
      return `
        <svg viewBox="0 0 340 680" class="sax-svg" id="${idPrefix}-svg" role="img" aria-label="Schéma interactif du saxophone ténor">
          <defs>
            <!-- Dégradé Laiton doré pour le corps du saxophone -->
            <linearGradient id="${idPrefix}-brass-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FCD34D" />
              <stop offset="25%" stop-color="#FBBF24" />
              <stop offset="65%" stop-color="#F59E0B" />
              <stop offset="100%" stop-color="#B45309" />
            </linearGradient>

            <!-- Dégradé Pavillon cuivré -->
            <linearGradient id="${idPrefix}-bell-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FEF08A" />
              <stop offset="40%" stop-color="#F59E0B" />
              <stop offset="100%" stop-color="#78350F" />
            </linearGradient>

            <!-- Dégradé Nacre des clés -->
            <radialGradient id="${idPrefix}-pearl-grad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="65%" stop-color="#F8FAFC" />
              <stop offset="100%" stop-color="#CBD5E1" />
            </radialGradient>
          </defs>

          <!-- ============================================== -->
          <!-- CORPS DU SAXOPHONE (BOCAL, TUBE, CULASSE, PAVILLON) -->
          <!-- ============================================== -->
          <g class="sax-body" opacity="0.95">
            <!-- Bec & Liège -->
            <rect x="145" y="10" width="18" height="24" rx="3" fill="#0F172A" />
            <rect x="146" y="34" width="16" height="14" fill="#D97706" />

            <!-- Bocal (courbure supérieure) -->
            <path d="M 154 48 C 154 75, 175 85, 175 105 L 175 125" fill="none" stroke="url(#${idPrefix}-brass-grad)" stroke-width="16" stroke-linecap="round" />
            <path d="M 154 48 C 154 75, 175 85, 175 105 L 175 125" fill="none" stroke="#FDE68A" stroke-width="3" opacity="0.6" />

            <!-- Bague de serrage du bocal -->
            <rect x="162" y="125" width="26" height="8" rx="2" fill="#92400E" />

            <!-- Tube principal vertical -->
            <path d="M 164 133 L 158 520 L 192 520 L 186 133 Z" fill="url(#${idPrefix}-brass-grad)" />

            <!-- Culasse (courbure du bas) -->
            <path d="M 158 520 C 158 580, 240 590, 246 510 L 254 390 C 254 360, 280 340, 295 330 L 255 330 C 240 350, 215 375, 215 420 L 210 500 C 205 530, 185 530, 180 520 Z" fill="url(#${idPrefix}-brass-grad)" />

            <!-- Pavillon évasé (Bell) -->
            <path d="M 240 430 C 248 370, 275 320, 310 300 C 315 315, 305 375, 265 445 Z" fill="url(#${idPrefix}-bell-grad)" />
            <ellipse cx="282" cy="335" rx="24" ry="46" transform="rotate(-28 282 335)" fill="#78350F" opacity="0.45" />
            <ellipse cx="280" cy="335" rx="22" ry="44" transform="rotate(-28 280 335)" fill="none" stroke="#FDE68A" stroke-width="2.5" />

            <!-- Gardes de clés et tringlerie esthétique -->
            <line x1="175" y1="140" x2="175" y2="510" stroke="#92400E" stroke-width="2" opacity="0.4" />
          </g>

          <!-- ============================================== -->
          <!-- LABELS ET GUIDES VISUELS                       -->
          <!-- ============================================== -->
          <text x="36" y="160" class="sax-section-label">Main Gauche</text>
          <line x1="36" y1="166" x2="115" y2="166" class="sax-guide-line" />

          <text x="36" y="360" class="sax-section-label">Main Droite</text>
          <line x1="36" y1="366" x2="115" y2="366" class="sax-guide-line" />

          <!-- Repose-pouce gauche et droit (repères) -->
          <circle cx="120" cy="190" r="11" fill="#78350F" stroke="#FDE68A" stroke-width="1.5" />
          <text x="120" y="191" font-size="8" fill="#FFF" text-anchor="middle" dominant-baseline="central">Pouce</text>

          <!-- ============================================== -->
          <!-- CLÉS INTERACTIVES DU SAXOPHONE                 -->
          <!-- ============================================== -->

          <!-- 1. POUCE GAUCHE : Clé d'octave -->
          <g class="sax-key" data-key="octave" role="button" tabindex="0" aria-label="Clé d'octave (Pouce gauche)">
            <rect x="108" y="142" width="24" height="34" rx="12" class="key-shape" />
            <text x="120" y="159" class="key-label" font-size="10">8ve</text>
          </g>

          <!-- 2. PALMES AIGUËS (Main gauche supérieure) -->
          <!-- Palme Ré (D) -->
          <g class="sax-key" data-key="palm_d" role="button" tabindex="0" aria-label="Palme Ré aigu (Main gauche)">
            <rect x="135" y="132" width="18" height="20" rx="6" class="key-shape" />
            <text x="144" y="142" class="key-label" font-size="9">D</text>
          </g>
          <!-- Palme Mi♭ (Eb) -->
          <g class="sax-key" data-key="palm_eb" role="button" tabindex="0" aria-label="Palme Mi bémol aigu (Main gauche)">
            <rect x="135" y="156" width="18" height="20" rx="6" class="key-shape" />
            <text x="144" y="166" class="key-label" font-size="8">E♭</text>
          </g>
          <!-- Palme Fa (F) -->
          <g class="sax-key" data-key="palm_f" role="button" tabindex="0" aria-label="Palme Fa aigu (Main gauche)">
            <rect x="135" y="180" width="18" height="20" rx="6" class="key-shape" />
            <text x="144" y="190" class="key-label" font-size="9">F</text>
          </g>

          <!-- 3. CLÉS PRINCIPALES MAIN GAUCHE -->
          <!-- Touche 1 (Index - Si) -->
          <g class="sax-key" data-key="lh_1" role="button" tabindex="0" aria-label="Touche 1 - Index gauche (Si)">
            <circle cx="172" cy="188" r="15" class="key-shape" />
            <text x="172" y="188" class="key-label">1</text>
          </g>

          <!-- Clé Bis (Si bémol - entre 1 et 2) -->
          <g class="sax-key" data-key="lh_bis" role="button" tabindex="0" aria-label="Clé Bis - Si bémol (Index gauche)">
            <circle cx="172" cy="216" r="9" class="key-shape" />
            <text x="172" y="216" class="key-label" font-size="9">Bis</text>
          </g>

          <!-- Touche 2 (Majeur - La / Do) -->
          <g class="sax-key" data-key="lh_2" role="button" tabindex="0" aria-label="Touche 2 - Majeur gauche (La / Do)">
            <circle cx="172" cy="242" r="15" class="key-shape" />
            <text x="172" y="242" class="key-label">2</text>
          </g>

          <!-- Touche 3 (Annulaire - Sol) -->
          <g class="sax-key" data-key="lh_3" role="button" tabindex="0" aria-label="Touche 3 - Annulaire gauche (Sol)">
            <circle cx="172" cy="282" r="15" class="key-shape" />
            <text x="172" y="282" class="key-label">3</text>
          </g>

          <!-- 4. PLATEAU AURICULAIRE GAUCHE (Clés graves) -->
          <!-- Clé Sol♯ (G#) -->
          <g class="sax-key" data-key="lh_gs" role="button" tabindex="0" aria-label="Clé de Sol dièse (Auriculaire gauche)">
            <rect x="130" y="268" width="22" height="15" rx="4" class="key-shape" />
            <text x="141" y="276" class="key-label" font-size="8">G♯</text>
          </g>

          <!-- Clé Do♯ grave (C#) -->
          <g class="sax-key" data-key="lh_cs" role="button" tabindex="0" aria-label="Clé de Do dièse grave (Auriculaire gauche)">
            <rect x="118" y="288" width="24" height="15" rx="4" class="key-shape" />
            <text x="130" y="296" class="key-label" font-size="8">C♯</text>
          </g>

          <!-- Clé Si grave (B) -->
          <g class="sax-key" data-key="lh_b" role="button" tabindex="0" aria-label="Clé de Si grave (Auriculaire gauche)">
            <rect x="144" y="288" width="20" height="15" rx="4" class="key-shape" />
            <text x="154" y="296" class="key-label" font-size="8">B</text>
          </g>

          <!-- Clé Si♭ grave (Bb) -->
          <g class="sax-key" data-key="lh_bb" role="button" tabindex="0" aria-label="Clé de Si bémol grave (Auriculaire gauche)">
            <rect x="124" y="308" width="36" height="16" rx="4" class="key-shape" />
            <text x="142" y="316" class="key-label" font-size="8">B♭</text>
          </g>

          <!-- ============================================== -->
          <!-- 5. CLÉS DE CÔTÉ MAIN DROITE (Side keys)        -->
          <!-- ============================================== -->
          <!-- Clé latérale Mi aigu (Side E) -->
          <g class="sax-key" data-key="side_e" role="button" tabindex="0" aria-label="Clé latérale Mi aigu (Main droite)">
            <rect x="202" y="324" width="16" height="18" rx="5" class="key-shape" />
            <text x="210" y="333" class="key-label" font-size="8">C4</text>
          </g>
          <!-- Clé latérale Do (Side C) -->
          <g class="sax-key" data-key="side_c" role="button" tabindex="0" aria-label="Clé latérale Do (Main droite)">
            <rect x="202" y="348" width="16" height="18" rx="5" class="key-shape" />
            <text x="210" y="357" class="key-label" font-size="8">Tc</text>
          </g>
          <!-- Clé latérale Si♭ (Side Bb) -->
          <g class="sax-key" data-key="side_bb" role="button" tabindex="0" aria-label="Clé latérale Si bémol (Main droite)">
            <rect x="202" y="372" width="16" height="18" rx="5" class="key-shape" />
            <text x="210" y="381" class="key-label" font-size="8">Ta</text>
          </g>

          <!-- ============================================== -->
          <!-- 6. CLÉS PRINCIPALES MAIN DROITE                -->
          <!-- ============================================== -->
          <!-- Touche 4 (Index - Fa) -->
          <g class="sax-key" data-key="rh_1" role="button" tabindex="0" aria-label="Touche 4 - Index droit (Fa)">
            <circle cx="174" cy="380" r="15" class="key-shape" />
            <text x="174" y="380" class="key-label">4</text>
          </g>

          <!-- Clé Fa♯ chromatique -->
          <g class="sax-key" data-key="rh_fsharp" role="button" tabindex="0" aria-label="Clé Fa dièse chromatique">
            <rect x="194" y="402" width="16" height="16" rx="5" class="key-shape" />
            <text x="202" y="410" class="key-label" font-size="8">F♯</text>
          </g>

          <!-- Touche 5 (Majeur - Mi) -->
          <g class="sax-key" data-key="rh_2" role="button" tabindex="0" aria-label="Touche 5 - Majeur droit (Mi)">
            <circle cx="174" cy="420" r="15" class="key-shape" />
            <text x="174" y="420" class="key-label">5</text>
          </g>

          <!-- Touche 6 (Annulaire - Ré) -->
          <g class="sax-key" data-key="rh_3" role="button" tabindex="0" aria-label="Touche 6 - Annulaire droit (Ré)">
            <circle cx="174" cy="460" r="15" class="key-shape" />
            <text x="174" y="460" class="key-label">6</text>
          </g>

          <!-- 7. PLATEAU AURICULAIRE DROIT (Clés Do et Mi♭) -->
          <!-- Clé Mi♭ grave (Eb) -->
          <g class="sax-key" data-key="rh_eb" role="button" tabindex="0" aria-label="Clé de Mi bémol grave (Auriculaire droit)">
            <rect x="188" y="482" width="24" height="16" rx="5" class="key-shape" />
            <text x="200" y="490" class="key-label" font-size="8">E♭</text>
          </g>

          <!-- Clé Do grave (C) -->
          <g class="sax-key" data-key="rh_c" role="button" tabindex="0" aria-label="Clé de Do grave (Auriculaire droit)">
            <rect x="188" y="504" width="24" height="22" rx="6" class="key-shape" />
            <text x="200" y="515" class="key-label" font-size="9">C</text>
          </g>
        </svg>
      `;
    },

    /**
     * Attache les écouteurs de clic sur un saxophone interactif
     */
    initInteractive(container, onKeysChange) {
      if (!container) return;
      container.innerHTML = this.generateSVG('train-sax');

      const keys = container.querySelectorAll('.sax-key');
      keys.forEach(keyEl => {
        keyEl.addEventListener('click', () => {
          keyEl.classList.toggle('active');
          if (onKeysChange) {
            onKeysChange(this.getActiveKeys(container));
          }
        });

        // Accessibilité clavier
        keyEl.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            keyEl.click();
          }
        });
      });
    },

    /**
     * Retourne la liste des clés actives
     */
    getActiveKeys(container) {
      if (!container) return [];
      const activeEls = container.querySelectorAll('.sax-key.active');
      return Array.from(activeEls).map(el => el.getAttribute('data-key'));
    },

    /**
     * Définit précisément les clés actives
     */
    setActiveKeys(container, keysArray = []) {
      if (!container) return;
      const keySet = new Set(keysArray);
      const allKeys = container.querySelectorAll('.sax-key');
      allKeys.forEach(el => {
        const k = el.getAttribute('data-key');
        if (keySet.has(k)) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
        // Efface les retours de feedback
        el.classList.remove('feedback-correct', 'feedback-missing', 'feedback-extra');
      });
    },

    /**
     * Applique un retour visuel sur les clés (vert = correct, orange pulsé = manquant, rouge = en trop)
     */
    applyFeedback(container, correctKeys, missingKeys, extraKeys) {
      if (!container) return;
      const allKeys = container.querySelectorAll('.sax-key');
      allKeys.forEach(el => {
        el.classList.remove('feedback-correct', 'feedback-missing', 'feedback-extra');
        const k = el.getAttribute('data-key');
        if (correctKeys && correctKeys.includes(k)) {
          el.classList.add('feedback-correct');
        } else if (missingKeys && missingKeys.includes(k)) {
          el.classList.add('feedback-missing');
        } else if (extraKeys && extraKeys.includes(k)) {
          el.classList.add('feedback-extra');
        }
      });
    },

    /**
     * Efface toutes les clés
     */
    clearAll(container) {
      if (!container) return;
      const allKeys = container.querySelectorAll('.sax-key');
      allKeys.forEach(el => {
        el.classList.remove('active', 'feedback-correct', 'feedback-missing', 'feedback-extra');
      });
    }
  };

  // ==========================================================================
  // 6. CONTRÔLEUR : ENTRAÎNEMENT (LECTURE & DOIGTÉS)
  // ==========================================================================

  const TrainingController = {
    currentNote: null,
    score: 0,
    totalQuestions: 0,
    streak: 0,
    bestStreak: 0,
    mode: 'single', // 'single', 'series5', 'series10'
    range: 'level1',
    autoValidate: true,
    seriesCount: 0,
    seriesTarget: 5,
    isAnswered: false,

    // Noms lisibles des clés pour les explications
    KEY_NAMES: {
      octave: "Clé d'octave",
      lh_1: "Index gauche (1)",
      lh_bis: "Clé Bis (Si♭)",
      lh_2: "Majeur gauche (2)",
      lh_3: "Annulaire gauche (3)",
      lh_gs: "Clé Sol♯",
      lh_cs: "Clé Do♯ grave",
      lh_b: "Clé Si grave",
      lh_bb: "Clé Si♭ grave",
      palm_d: "Palme Ré",
      palm_eb: "Palme Mi♭",
      palm_f: "Palme Fa",
      rh_1: "Index droit (4)",
      rh_2: "Majeur droit (5)",
      rh_3: "Annulaire droit (6)",
      rh_fsharp: "Clé Fa♯ chromatique",
      rh_c: "Clé Do grave",
      rh_eb: "Clé Mi♭ grave",
      side_e: "Clé côté Mi",
      side_c: "Clé côté Do",
      side_bb: "Clé côté Si♭"
    },

    init() {
      const saxContainer = document.getElementById('training-sax-wrapper');
      SaxophoneComponent.initInteractive(saxContainer, (keys) => this.onKeysChanged(keys));

      // Écouteurs d'événements
      document.getElementById('btn-validate').addEventListener('click', () => this.validateAnswer());
      document.getElementById('btn-clear-keys').addEventListener('click', () => this.clearKeys());
      document.getElementById('btn-reveal-answer').addEventListener('click', () => this.revealAnswer());
      document.getElementById('btn-next-note').addEventListener('click', () => this.nextQuestion());
      document.getElementById('btn-hint-name').addEventListener('click', () => this.toggleNoteHint());
      document.getElementById('btn-play-note').addEventListener('click', () => this.playCurrentNote());
      document.getElementById('btn-reset-stats').addEventListener('click', () => this.resetStats());

      document.getElementById('practice-range').addEventListener('change', (e) => {
        this.range = e.target.value;
        this.resetStats();
        this.nextQuestion();
      });

      document.getElementById('practice-mode').addEventListener('change', (e) => {
        this.mode = e.target.value;
        this.seriesCount = 0;
        this.seriesTarget = this.mode === 'series10' ? 10 : 5;
        this.updateSeriesUI();
        this.nextQuestion();
      });

      document.getElementById('auto-validate').addEventListener('change', (e) => {
        this.autoValidate = e.target.checked;
      });

      // Raccourcis clavier
      window.addEventListener('keydown', (e) => {
        // Uniquement si l'onglet entraînement est actif
        const tabTraining = document.getElementById('tab-training');
        if (!tabTraining || !tabTraining.classList.contains('active')) return;

        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

        if (e.code === 'Space') {
          e.preventDefault();
          const nextBtn = document.getElementById('btn-next-note');
          if (!nextBtn.classList.contains('hidden')) {
            this.nextQuestion();
          } else {
            this.validateAnswer();
          }
        } else if (e.key === 'r' || e.key === 'R') {
          this.clearKeys();
        } else if (e.key === 's' || e.key === 'S') {
          this.playCurrentNote();
        }
      });

      this.nextQuestion();
    },

    /**
     * Récupère la liste des notes éligibles selon le niveau sélectionné
     */
    getEligibleNotes() {
      switch (this.range) {
        case 'level1':
          return SAX_NOTES.filter(n => ['g4', 'a4', 'b4', 'c5', 'd5'].includes(n.id));
        case 'level2':
          return SAX_NOTES.filter(n => n.level <= 2 && n.category !== 'accidental');
        case 'level3':
          return SAX_NOTES.filter(n => n.level <= 3);
        case 'level4':
          return SAX_NOTES.filter(n => n.level <= 4);
        case 'level5':
        default:
          return SAX_NOTES;
      }
    },

    nextQuestion() {
      this.isAnswered = false;
      const eligible = this.getEligibleNotes();
      let randomNote;

      // Évite de reposer exactement la même note consécutivement si possible
      do {
        randomNote = eligible[Math.floor(Math.random() * eligible.length)];
      } while (eligible.length > 1 && this.currentNote && randomNote.id === this.currentNote.id);

      this.currentNote = randomNote;

      // Réinitialise l'interface
      this.clearKeys();
      this.resetFeedbackUI();

      // Dessine la note sur la portée
      const staffContainer = document.getElementById('training-staff-container');
      StaffRenderer.drawSingleNote(staffContainer, this.currentNote);

      // Met à jour le badge indice (masqué au début)
      document.getElementById('training-note-name').classList.add('hidden');
      document.getElementById('badge-solfege').textContent = this.currentNote.solfege;
      document.getElementById('badge-octave').textContent = this.currentNote.octave;
      document.getElementById('badge-desc').textContent = `(${this.currentNote.name})`;

      // Boutons d'action
      document.getElementById('btn-validate').classList.remove('hidden');
      document.getElementById('btn-next-note').classList.add('hidden');

      // Gestion de la série
      if (this.mode !== 'single') {
        this.seriesCount++;
        this.updateSeriesUI();
      }
    },

    updateSeriesUI() {
      const wrapper = document.getElementById('series-progress-wrapper');
      if (this.mode === 'single') {
        wrapper.classList.add('hidden');
        return;
      }
      wrapper.classList.remove('hidden');
      const counterText = document.getElementById('series-counter-text');
      const scorePreview = document.getElementById('series-score-preview');
      const fill = document.getElementById('series-progress-fill');

      counterText.textContent = `Note ${this.seriesCount} sur ${this.seriesTarget}`;
      scorePreview.textContent = `Score de série : ${this.score}/${this.totalQuestions}`;
      const percent = Math.min(100, Math.round((this.seriesCount / this.seriesTarget) * 100));
      fill.style.width = `${percent}%`;
    },

    onKeysChanged(activeKeys) {
      this.updateActiveKeysReadout(activeKeys);

      // Si la validation immédiate est activée et la question n'est pas encore validée
      if (this.autoValidate && !this.isAnswered && this.currentNote) {
        if (this.checkFingeringMatch(activeKeys, this.currentNote)) {
          this.validateAnswer();
        }
      }
    },

    updateActiveKeysReadout(activeKeys) {
      const tagsContainer = document.getElementById('active-keys-tags');
      const matchedReadout = document.getElementById('sax-matched-note');

      if (!activeKeys || activeKeys.length === 0) {
        tagsContainer.innerHTML = '<span class="key-tag-empty">Aucune clé (tube ouvert)</span>';
      } else {
        tagsContainer.innerHTML = activeKeys
          .map(k => `<span class="key-tag">${this.KEY_NAMES[k] || k}</span>`)
          .join('');
      }

      // Cherche si ce doigté correspond à une note du dictionnaire
      const matched = SAX_NOTES.find(n => this.checkFingeringMatch(activeKeys, n));
      if (matched) {
        matchedReadout.textContent = `${matched.name} (${matched.solfege}${matched.octave})`;
      } else {
        matchedReadout.textContent = activeKeys.length === 0 ? 'Tube ouvert (Do♯)' : 'Doigté personnalisé';
      }
    },

    checkFingeringMatch(userKeys, targetNote) {
      const setA = new Set(userKeys);
      const isMatch = (keysList) => {
        if (setA.size !== keysList.length) return false;
        return keysList.every(k => setA.has(k));
      };

      if (isMatch(targetNote.keys)) return true;
      if (targetNote.altKeys) {
        return targetNote.altKeys.some(alt => isMatch(alt));
      }
      return false;
    },

    validateAnswer() {
      if (this.isAnswered) return;

      const saxContainer = document.getElementById('training-sax-wrapper');
      const userKeys = SaxophoneComponent.getActiveKeys(saxContainer);
      const isCorrect = this.checkFingeringMatch(userKeys, this.currentNote);

      this.isAnswered = true;
      this.totalQuestions++;

      const feedbackBox = document.getElementById('feedback-box');
      const feedbackIcon = document.getElementById('feedback-icon');
      const feedbackTitle = document.getElementById('feedback-title');
      const feedbackMessage = document.getElementById('feedback-message');
      const feedbackDiff = document.getElementById('feedback-diff');

      // Affiche le nom de la note
      document.getElementById('training-note-name').classList.remove('hidden');

      if (isCorrect) {
        // SUCCÈS
        this.score++;
        this.streak++;
        if (this.streak > this.bestStreak) this.bestStreak = this.streak;

        AudioEngine.playSuccessChime();
        AudioEngine.playSaxTone(this.currentNote.freq, 0.8);

        feedbackBox.className = 'feedback-box success';
        feedbackIcon.textContent = '🎉';
        feedbackTitle.textContent = `Bravo ! C'est le bon doigté pour ${this.currentNote.name} !`;
        feedbackMessage.textContent = this.currentNote.desc;
        feedbackDiff.innerHTML = `<span class="diff-tag correct">✓ Doigté parfait (${userKeys.length} clés)</span>`;

        // Surbrillance verte sur le saxophone
        SaxophoneComponent.applyFeedback(saxContainer, userKeys, [], []);

        // Boutons
        document.getElementById('btn-validate').classList.add('hidden');
        document.getElementById('btn-next-note').classList.remove('hidden');

        // Passage automatique à la note suivante après 1.4s si mode continu
        if (this.mode === 'single') {
          setTimeout(() => {
            if (this.isAnswered) this.nextQuestion();
          }, 1400);
        } else if (this.seriesCount >= this.seriesTarget) {
          this.showSeriesCompleted();
        }

      } else {
        // ERREUR
        this.streak = 0;
        AudioEngine.playErrorChime();

        feedbackBox.className = 'feedback-box error';
        feedbackIcon.textContent = '💡';
        feedbackTitle.textContent = `Oups ! Ce n'est pas tout à fait le doigté du ${this.currentNote.name}.`;
        feedbackMessage.textContent = `Observez les corrections ci-dessous : ${this.currentNote.desc}`;

        // Calcul du diff
        const targetKeys = this.currentNote.keys;
        const correctKeys = userKeys.filter(k => targetKeys.includes(k));
        const missingKeys = targetKeys.filter(k => !userKeys.includes(k));
        const extraKeys = userKeys.filter(k => !targetKeys.includes(k));

        let diffHtml = '<div class="diff-tag-row">';
        if (missingKeys.length > 0) {
          diffHtml += missingKeys.map(k => `<span class="diff-tag missing">+ Clé oubliée : ${this.KEY_NAMES[k] || k}</span>`).join('');
        }
        if (extraKeys.length > 0) {
          diffHtml += extraKeys.map(k => `<span class="diff-tag extra">✕ Clé en trop : ${this.KEY_NAMES[k] || k}</span>`).join('');
        }
        diffHtml += '</div>';
        feedbackDiff.innerHTML = diffHtml;

        // Feedback visuel sur le saxophone
        SaxophoneComponent.applyFeedback(saxContainer, correctKeys, missingKeys, extraKeys);

        // Bouton note suivante disponible
        document.getElementById('btn-validate').classList.add('hidden');
        document.getElementById('btn-next-note').classList.remove('hidden');

        if (this.mode !== 'single' && this.seriesCount >= this.seriesTarget) {
          this.showSeriesCompleted();
        }
      }

      this.updateStatsUI();
    },

    revealAnswer() {
      if (!this.currentNote) return;
      const saxContainer = document.getElementById('training-sax-wrapper');
      SaxophoneComponent.setActiveKeys(saxContainer, this.currentNote.keys);
      this.onKeysChanged(this.currentNote.keys);

      document.getElementById('training-note-name').classList.remove('hidden');

      const feedbackBox = document.getElementById('feedback-box');
      feedbackBox.className = 'feedback-box info';
      document.getElementById('feedback-icon').textContent = '📖';
      document.getElementById('feedback-title').textContent = `Solution : Doigté du ${this.currentNote.name}`;
      document.getElementById('feedback-message').textContent = this.currentNote.desc;
      document.getElementById('feedback-diff').innerHTML = `<span class="diff-tag correct">Clés requises : ${this.currentNote.summary}</span>`;

      AudioEngine.playSaxTone(this.currentNote.freq, 0.7);

      document.getElementById('btn-validate').classList.add('hidden');
      document.getElementById('btn-next-note').classList.remove('hidden');
    },

    clearKeys() {
      const saxContainer = document.getElementById('training-sax-wrapper');
      SaxophoneComponent.clearAll(saxContainer);
      this.onKeysChanged([]);
    },

    toggleNoteHint() {
      const badge = document.getElementById('training-note-name');
      badge.classList.toggle('hidden');
    },

    playCurrentNote() {
      if (this.currentNote) {
        AudioEngine.playSaxTone(this.currentNote.freq, 0.8);
      }
    },

    resetFeedbackUI() {
      const feedbackBox = document.getElementById('feedback-box');
      feedbackBox.className = 'feedback-box empty';
      document.getElementById('feedback-icon').textContent = '👉';
      document.getElementById('feedback-title').textContent = 'À vous de jouer !';
      document.getElementById('feedback-message').textContent = 'Cliquez sur les touches du saxophone pour composer le doigté.';
      document.getElementById('feedback-diff').innerHTML = '';
    },

    updateStatsUI() {
      document.getElementById('stat-correct').textContent = this.score;
      document.getElementById('stat-total').textContent = `sur ${this.totalQuestions}`;
      document.getElementById('stat-streak').textContent = `${this.streak} 🔥`;
      document.getElementById('stat-best-streak').textContent = this.bestStreak;

      const accuracy = this.totalQuestions > 0 ? Math.round((this.score / this.totalQuestions) * 100) : 100;
      document.getElementById('stat-accuracy').textContent = `${accuracy}%`;
    },

    resetStats() {
      this.score = 0;
      this.totalQuestions = 0;
      this.streak = 0;
      this.seriesCount = 0;
      this.updateStatsUI();
      this.updateSeriesUI();
    },

    showSeriesCompleted() {
      setTimeout(() => {
        const accuracy = Math.round((this.score / this.totalQuestions) * 100);
        alert(`🎉 Série de ${this.seriesTarget} notes terminée !\n\nScore : ${this.score} / ${this.totalQuestions} (${accuracy}% de précision)\nMeilleure série : ${this.bestStreak} à la suite.\n\nContinuez sur votre lancée !`);
        this.resetStats();
        this.nextQuestion();
      }, 600);
    }
  };

  // ==========================================================================
  // 7. CONTRÔLEUR : MORCEAUX GUIDÉS
  // ==========================================================================

  const SongsController = {
    currentSong: null,
    activeIndex: 0,
    isPlaying: false,
    playTimer: null,
    tempo: 76,
    interactiveMode: false,

    init() {
      this.currentSong = SONGS[0];
      this.renderSongsCarousel();

      const songSaxContainer = document.getElementById('song-sax-wrapper');
      SaxophoneComponent.initInteractive(songSaxContainer, (keys) => this.onSongKeysChanged(keys));

      // Écouteurs de contrôles de lecture
      document.getElementById('btn-song-prev').addEventListener('click', () => this.step(-1));
      document.getElementById('btn-song-next').addEventListener('click', () => this.step(1));
      document.getElementById('btn-song-first').addEventListener('click', () => this.goToNote(0));
      document.getElementById('btn-song-restart').addEventListener('click', () => this.goToNote(0));
      document.getElementById('btn-song-play').addEventListener('click', () => this.togglePlay());

      const tempoInput = document.getElementById('song-tempo');
      tempoInput.addEventListener('input', (e) => {
        this.tempo = parseInt(e.target.value, 10);
        document.getElementById('tempo-display').textContent = `${this.tempo} BPM`;
        if (this.isPlaying) {
          this.pause();
          this.play();
        }
      });

      document.getElementById('song-practice-mode').addEventListener('change', (e) => {
        this.interactiveMode = e.target.checked;
        if (this.interactiveMode && this.isPlaying) {
          this.pause();
        }
      });

      this.loadSong(this.currentSong);
    },

    renderSongsCarousel() {
      const container = document.getElementById('songs-list-container');
      if (!container) return;

      container.innerHTML = SONGS.map((song, idx) => {
        // Collecte des notes uniques utilisées
        const uniqueNotes = Array.from(new Set(song.notes.map(n => n.noteId)))
          .map(id => SAX_NOTES.find(sn => sn.id === id)?.solfege)
          .filter(Boolean);

        return `
          <div class="song-card ${idx === 0 ? 'active' : ''}" data-song-id="${song.id}">
            <h4 class="song-card-title">${song.title}</h4>
            <span class="song-card-meta">${song.genre} • ${song.notes.length} notes</span>
            <div class="song-card-notes-pills">
              ${uniqueNotes.map(p => `<span class="note-pill">${p}</span>`).join('')}
            </div>
          </div>
        `;
      }).join('');

      container.querySelectorAll('.song-card').forEach(card => {
        card.addEventListener('click', () => {
          container.querySelectorAll('.song-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          const songId = card.getAttribute('data-song-id');
          const song = SONGS.find(s => s.id === songId);
          if (song) this.loadSong(song);
        });
      });
    },

    loadSong(song) {
      this.pause();
      this.currentSong = song;
      this.activeIndex = 0;

      document.getElementById('current-song-title').textContent = song.title;
      document.getElementById('current-song-tag').textContent = song.genre;
      document.getElementById('current-song-meta').textContent = song.meta;
      document.getElementById('current-song-advice').textContent = song.advice;

      this.updateSongView();
    },

    updateSongView() {
      if (!this.currentSong) return;

      const currentNoteItem = this.currentSong.notes[this.activeIndex];
      const note = SAX_NOTES.find(n => n.id === currentNoteItem.noteId);
      if (!note) return;

      // Met à jour la portée complète du morceau
      const staffContainer = document.getElementById('song-staff-container');
      StaffRenderer.drawSongStaff(staffContainer, this.currentSong.notes, this.activeIndex);

      // Met à jour le spotlight de note
      document.getElementById('current-song-note-name').textContent = `${note.solfege}${note.octave}`;
      document.getElementById('current-song-note-pos').textContent = `Note ${this.activeIndex + 1} sur ${this.currentSong.notes.length}`;

      // Met à jour le saxophone et son explication
      document.getElementById('song-sax-note-label').textContent = `${note.name} (${note.summary})`;
      document.getElementById('song-sax-explanation').innerHTML = `<p><strong>Doigté pour ${note.name} :</strong> ${note.desc}</p>`;

      const saxContainer = document.getElementById('song-sax-wrapper');
      SaxophoneComponent.setActiveKeys(saxContainer, note.keys);
    },

    goToNote(index) {
      if (!this.currentSong) return;
      this.activeIndex = Math.max(0, Math.min(index, this.currentSong.notes.length - 1));
      this.updateSongView();

      const noteItem = this.currentSong.notes[this.activeIndex];
      const note = SAX_NOTES.find(n => n.id === noteItem.noteId);
      if (note) {
        AudioEngine.playSaxTone(note.freq, 0.6);
      }
    },

    step(direction) {
      if (!this.currentSong) return;
      let nextIdx = this.activeIndex + direction;
      if (nextIdx < 0) nextIdx = 0;
      if (nextIdx >= this.currentSong.notes.length) nextIdx = this.currentSong.notes.length - 1;
      this.goToNote(nextIdx);
    },

    togglePlay() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },

    play() {
      if (!this.currentSong) return;
      this.isPlaying = true;
      document.getElementById('btn-song-play-icon').textContent = '⏸';
      document.getElementById('btn-song-play-text').textContent = 'Pause';

      const intervalMs = (60 / this.tempo) * 1000;

      const tick = () => {
        if (!this.isPlaying) return;

        // Si on est à la fin du morceau, on recommence au début
        if (this.activeIndex >= this.currentSong.notes.length - 1) {
          this.activeIndex = 0;
        } else {
          this.activeIndex++;
        }

        this.updateSongView();
        const noteItem = this.currentSong.notes[this.activeIndex];
        const note = SAX_NOTES.find(n => n.id === noteItem.noteId);
        if (note) {
          AudioEngine.playSaxTone(note.freq, Math.min(0.8, (60 / this.tempo) * 0.9));
        }

        this.playTimer = setTimeout(tick, intervalMs);
      };

      // Joue immédiatement la note en cours
      const currentItem = this.currentSong.notes[this.activeIndex];
      const note = SAX_NOTES.find(n => n.id === currentItem.noteId);
      if (note) {
        AudioEngine.playSaxTone(note.freq, Math.min(0.8, (60 / this.tempo) * 0.9));
      }

      this.playTimer = setTimeout(tick, intervalMs);
    },

    pause() {
      this.isPlaying = false;
      if (this.playTimer) clearTimeout(this.playTimer);
      const playIcon = document.getElementById('btn-song-play-icon');
      const playText = document.getElementById('btn-song-play-text');
      if (playIcon) playIcon.textContent = '▶';
      if (playText) playText.textContent = 'Lecture automatique';
    },

    onSongKeysChanged(keys) {
      if (!this.interactiveMode || !this.currentSong) return;
      const targetNoteItem = this.currentSong.notes[this.activeIndex];
      const targetNote = SAX_NOTES.find(n => n.id === targetNoteItem.noteId);
      if (!targetNote) return;

      if (TrainingController.checkFingeringMatch(keys, targetNote)) {
        AudioEngine.playSuccessChime();
        AudioEngine.playSaxTone(targetNote.freq, 0.7);
        setTimeout(() => {
          this.step(1);
        }, 500);
      }
    }
  };

  // ==========================================================================
  // 8. CONTRÔLEUR : TABLE DES DOIGTÉS (DICTIONNAIRE & RÉVISION)
  // ==========================================================================

  const FingeringController = {
    currentFilter: 'all',
    searchTerm: '',

    init() {
      this.renderCards();

      // Écouteur de recherche
      const searchInput = document.getElementById('fingering-search');
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.trim().toLowerCase();
        this.renderCards();
      });

      // Écouteurs de filtres
      const filterPills = document.querySelectorAll('#fingering-filter-pills .filter-pill');
      filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
          filterPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.currentFilter = pill.getAttribute('data-filter');
          this.renderCards();
        });
      });

      // Modal
      document.getElementById('btn-close-modal').addEventListener('click', () => this.closeModal());
      const modal = document.getElementById('fingering-modal');
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal();
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          this.closeModal();
        }
      });
    },

    getFilteredNotes() {
      return SAX_NOTES.filter(note => {
        // Filtre de recherche texte
        if (this.searchTerm) {
          const matchName = note.name.toLowerCase().includes(this.searchTerm);
          const matchSolfege = note.solfege.toLowerCase().includes(this.searchTerm);
          const matchDesc = note.desc.toLowerCase().includes(this.searchTerm);
          if (!matchName && !matchSolfege && !matchDesc) return false;
        }

        // Filtre de registre
        switch (this.currentFilter) {
          case 'beginner':
            return note.level <= 2 && note.category !== 'accidental';
          case 'grave':
            return note.category === 'grave';
          case 'medium':
            return note.category === 'medium';
          case 'aigu':
            return note.category === 'aigu';
          case 'accidental':
            return note.accidental === '#' || note.accidental === 'b';
          case 'all':
          default:
            return true;
        }
      });
    },

    renderCards() {
      const grid = document.getElementById('fingering-cards-grid');
      if (!grid) return;

      const notes = this.getFilteredNotes();

      if (notes.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
            <p style="font-size: 1.2rem; font-weight: 700;">Aucune note trouvée</p>
            <p>Essayez avec d'autres termes de recherche ou sélectionnez un autre registre.</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = notes.map(note => `
        <div class="fingering-card" data-note-id="${note.id}">
          <div class="fingering-card-header">
            <span class="fingering-card-title">${note.name}</span>
            <span class="fingering-card-sub">${note.solfege}${note.octave}</span>
          </div>
          <div class="fingering-card-staff" id="staff-card-${note.id}"></div>
          <p class="fingering-card-summary">${note.summary}</p>
          <div class="fingering-card-footer">
            <button class="btn-card-audio" data-note-id="${note.id}" title="Écouter">
              🔊 Écouter
            </button>
            <span style="font-size: 0.78rem; color: var(--brass-700); font-weight: 600;">Détail 🔍</span>
          </div>
        </div>
      `).join('');

      // Dessine la portée miniature pour chaque carte
      notes.forEach(note => {
        const staffEl = document.getElementById(`staff-card-${note.id}`);
        if (staffEl) {
          StaffRenderer.drawSingleNote(staffEl, note, { width: 180, height: 85, noteX: 115 });
        }
      });

      // Écouteurs de clic sur cartes et boutons audio
      grid.querySelectorAll('.fingering-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.btn-card-audio')) return;
          const noteId = card.getAttribute('data-note-id');
          const note = SAX_NOTES.find(n => n.id === noteId);
          if (note) this.openModal(note);
        });
      });

      grid.querySelectorAll('.btn-card-audio').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const noteId = btn.getAttribute('data-note-id');
          const note = SAX_NOTES.find(n => n.id === noteId);
          if (note) AudioEngine.playSaxTone(note.freq, 0.8);
        });
      });
    },

    openModal(note) {
      const modal = document.getElementById('fingering-modal');
      modal.classList.remove('hidden');

      document.getElementById('modal-note-title').textContent = `${note.name} (${note.solfege}${note.octave})`;
      document.getElementById('modal-note-badge').textContent = `Registre ${note.category.toUpperCase()}`;
      document.getElementById('modal-note-desc').textContent = note.desc;

      const altBox = document.getElementById('modal-alt-fingerings');
      if (note.altKeys && note.altKeys.length > 0) {
        altBox.classList.remove('hidden');
        document.getElementById('modal-alt-desc').textContent = 'Doigté alternatif disponible sur ce schéma.';
      } else {
        altBox.classList.add('hidden');
      }

      // Portée dans le modal
      const modalStaff = document.getElementById('modal-staff-container');
      StaffRenderer.drawSingleNote(modalStaff, note, { width: 320, height: 130, noteX: 180 });

      // Saxophone dans le modal
      const modalSax = document.getElementById('modal-sax-wrapper');
      modalSax.innerHTML = SaxophoneComponent.generateSVG('modal-sax');
      SaxophoneComponent.setActiveKeys(modalSax, note.keys);

      // Bouton play
      const btnPlay = document.getElementById('btn-modal-play');
      btnPlay.onclick = () => AudioEngine.playSaxTone(note.freq, 0.9);

      // Joue le son à l'ouverture
      AudioEngine.playSaxTone(note.freq, 0.8);
    },

    closeModal() {
      document.getElementById('fingering-modal').classList.add('hidden');
    }
  };

  // ==========================================================================
  // 9. GESTION DES ONGLETS & CONFIGURATION GLOBALE
  // ==========================================================================

  function initApp() {
    // Navigation par onglets
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        tabButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const targetSection = document.getElementById(targetId);
        if (targetSection) targetSection.classList.add('active');

        // Pause de la lecture automatique si on quitte l'onglet morceaux
        if (targetId !== 'tab-songs') {
          SongsController.pause();
        }
      });
    });

    // Contrôles Audio globaux
    const btnSound = document.getElementById('btn-toggle-sound');
    const soundIcon = document.getElementById('sound-icon');
    const volumeSlider = document.getElementById('sound-volume');
    const pitchSelect = document.getElementById('pitch-mode-select');

    btnSound.addEventListener('click', () => {
      const isEnabled = !AudioEngine.soundEnabled;
      AudioEngine.setSoundEnabled(isEnabled);
      soundIcon.textContent = isEnabled ? '🔊' : '🔇';
      btnSound.title = isEnabled ? 'Couper le son' : 'Activer le son';
    });

    volumeSlider.addEventListener('input', (e) => {
      AudioEngine.setVolume(parseFloat(e.target.value));
    });

    pitchSelect.addEventListener('change', (e) => {
      AudioEngine.setPitchMode(e.target.value);
    });

    // Démarrage des différents contrôleurs
    TrainingController.init();
    SongsController.init();
    FingeringController.init();

    // Déverrouillage automatique du Web Audio au premier clic sur la page
    const unlockAudio = () => {
      AudioEngine.init();
      AudioEngine.resume();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
  }

  // Initialisation dès que le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
