export interface Week {
  name: string;
  words: string[];
}

export interface Period {
  name: string;
  weeks: Week[];
}

export const WORD_LISTS: Period[] = [
  {
    name: "Période 1",
    weeks: [
      { name: "Semaine 1", words: ["école", "trousse", "livre", "colle", "cartable", "chez", "quand", "déjà", "tard"] },
      { name: "Semaine 2", words: ["crayon", "règle", "cahier", "gomme", "stylo", "feutre", "classeur", "dans", "il y a", "sur"] },
      { name: "Semaine 3", words: ["élève", "maîtresse", "écrire", "lecture", "calcul", "bulle", "chercher", "puis", "beaucoup", "trop", "tard", "quand"] },
      { name: "Semaine 4", words: ["enfant", "sport", "classe", "dictée", "ils vont", "maître", "petit", "faire", "après", "avec", "en", "pour"] },
      { name: "Semaine 5", words: ["chambre", "lit", "bureau", "chaise", "armoire", "lampe", "dormir", "ensuite", "mais"] },
      { name: "Semaine 6", words: ["grotte", "peinture", "main", "homme", "femme", "il faut", "toucher", "dessiner", "déjà", "beaucoup", "trop", "tard", "quand"] },
    ],
  },
  {
    name: "Période 2",
    weeks: [
      { name: "Semaine 1", words: ["Un Romain", "Jules César", "la guerre", "un Gaulois", "une bataille", "un chef", "gagner", "contre", "leur"] },
      { name: "Semaine 2", words: ["un prince", "un château", "un cheval", "un roi", "grand", "habiter", "monter", "avec", "pour"] },
      { name: "Semaine 3", words: ["une recette", "un dragon", "une princesse", "une fée", "se marier", "combattre", "charmant", "dans", "avec"] },
      { name: "Semaine 4", words: ["Noël", "le sapin", "une boule", "une guirlande", "un chocolat", "le calendrier", "décorer", "joli", "vert", "quand", "beaucoup", "et"] },
      { name: "Semaine 5", words: ["un cadeau", "un jouet", "la dinde", "buche", "déballer", "manger", "content", "beau", "puis", "sous"] },
      { name: "Semaine 6", words: [
          "Un Romain", "Jules César", "la guerre", "un Gaulois", "une bataille", "un chef", "gagner", "contre", "leur",
          "un prince", "un château", "un cheval", "un roi", "grand", "habiter", "monter", "avec", "pour",
          "une recette", "un dragon", "une princesse", "une fée", "se marier", "combattre", "charmant", "dans",
          "Noël", "le sapin", "une boule", "une guirlande", "un chocolat", "le calendrier", "décorer", "joli", "vert", "quand", "beaucoup", "et",
          "un cadeau", "un jouet", "la dinde", "buche", "déballer", "manger", "content", "beau", "puis", "sous"
        ] 
      },
    ],
  },
];


export interface Key {
  display: string;
  key: string;
  shiftDisplay?: string;
  shiftKey?: string;
  altGrDisplay?: string;
  altGrKey?: string;
  width?: string;
  special?: 'shift' | 'caps' | 'backspace' | 'space' | 'ctrl' | 'alt' | 'altgr' | 'enter' | 'tab';
}

export const KEYBOARD_LAYOUT: Key[][] = [
    [
      { display: '²', key: '²' },
      { display: '&', shiftDisplay: '1', key: '&', shiftKey: '1' },
      { display: 'é', shiftDisplay: '2', key: 'é', shiftKey: '2', altGrDisplay: '~', altGrKey: '~' },
      { display: '"', shiftDisplay: '3', key: '"', shiftKey: '3', altGrDisplay: '#', altGrKey: '#' },
      { display: "'", shiftDisplay: '4', key: "'", shiftKey: '4', altGrDisplay: '{', altGrKey: '{' },
      { display: '(', shiftDisplay: '5', key: '(', shiftKey: '5', altGrDisplay: '[', altGrKey: '[' },
      { display: '-', shiftDisplay: '6', key: '-', shiftKey: '6', altGrDisplay: '|', altGrKey: '|' },
      { display: 'è', shiftDisplay: '7', key: 'è', shiftKey: '7', altGrDisplay: '`', altGrKey: '`' },
      { display: '_', shiftDisplay: '8', key: '_', shiftKey: '8', altGrDisplay: '\\', altGrKey: '\\' },
      { display: 'ç', shiftDisplay: '9', key: 'ç', shiftKey: '9', altGrDisplay: '^', altGrKey: '^' },
      { display: 'à', shiftDisplay: '0', key: 'à', shiftKey: '0', altGrDisplay: '@', altGrKey: '@' },
      { display: ')', shiftDisplay: '°', key: ')', shiftKey: '°', altGrDisplay: ']', altGrKey: ']' },
      { display: '=', shiftDisplay: '+', key: '=', shiftKey: '+', altGrDisplay: '}', altGrKey: '}' },
      { display: '⌫', key: 'Backspace', special: 'backspace', width: 'w-24' },
    ],
    [
      { display: 'Tab', key: 'Tab', special: 'tab', width: 'w-20' },
      { display: 'a', key: 'a', shiftKey: 'A' },
      { display: 'z', key: 'z', shiftKey: 'Z' },
      { display: 'e', key: 'e', shiftKey: 'E', altGrDisplay: '€', altGrKey: '€' },
      { display: 'r', key: 'r', shiftKey: 'R' },
      { display: 't', key: 't', shiftKey: 'T' },
      { display: 'y', key: 'y', shiftKey: 'Y' },
      { display: 'u', key: 'u', shiftKey: 'U' },
      { display: 'i', key: 'i', shiftKey: 'I' },
      { display: 'o', key: 'o', shiftKey: 'O' },
      { display: 'p', key: 'p', shiftKey: 'P' },
      { display: '^', key: '^', shiftDisplay: '¨', shiftKey: '¨' },
      { display: '$', key: '$', shiftDisplay: '£', altGrDisplay: '¤', altGrKey: '¤', shiftKey: '£' },
      { display: 'Entrée', key: 'Enter', special: 'enter', width: 'w-24' },
    ],
    [
      { display: 'Verr. Maj', key: 'CapsLock', special: 'caps', width: 'w-28' },
      { display: 'q', key: 'q', shiftKey: 'Q' },
      { display: 's', key: 's', shiftKey: 'S' },
      { display: 'd', key: 'd', shiftKey: 'D' },
      { display: 'f', key: 'f', shiftKey: 'F' },
      { display: 'g', key: 'g', shiftKey: 'G' },
      { display: 'h', key: 'h', shiftKey: 'H' },
      { display: 'j', key: 'j', shiftKey: 'J' },
      { display: 'k', key: 'k', shiftKey: 'K' },
      { display: 'l', key: 'l', shiftKey: 'L' },
      { display: 'm', key: 'm', shiftKey: 'M' },
      { display: 'ù', key: 'ù', shiftKey: '%' },
      { display: '*', key: '*', shiftDisplay: 'µ', shiftKey: 'µ' },
    ],
    [
      { display: 'Maj', key: 'Shift', special: 'shift', width: 'w-20' },
      { display: '<', key: '<', shiftKey: '>' },
      { display: 'w', key: 'w', shiftKey: 'W' },
      { display: 'x', key: 'x', shiftKey: 'X' },
      { display: 'c', key: 'c', shiftKey: 'C' },
      { display: 'v', key: 'v', shiftKey: 'V' },
      { display: 'b', key: 'b', shiftKey: 'B' },
      { display: 'n', key: 'n', shiftKey: 'N' },
      { display: ',', key: ',', shiftKey: '?' },
      { display: ';', key: ';', shiftKey: '.' },
      { display: ':', key: ':', shiftKey: '/' },
      { display: '!', key: '!', shiftKey: '§' },
      { display: 'Maj', key: 'Shift', special: 'shift', width: 'w-28' },
    ],
    [
      { display: 'Ctrl', key: 'Control', special: 'ctrl', width: 'w-24' },
      { display: 'Alt', key: 'Alt', special: 'alt', width: 'w-20' },
      { display: '', key: ' ', special: 'space', width: 'w-96 flex-grow' },
      { display: 'Alt Gr', key: 'AltGraph', special: 'altgr', width: 'w-20' },
      { display: 'Ctrl', key: 'Control', special: 'ctrl', width: 'w-24' },
    ],
  ];