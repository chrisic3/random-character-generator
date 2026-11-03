import type { Category } from "./types/types";

// Every category the user spins through. Wheels are shown in this order, and each
// category's items become the slices on its wheel.
// To add a new category or option, just add it here: nothing else needs to change.
// Items without a winChance split whatever chance is left evenly. A winChance of 0.3
// means that item wins 30% of the time, which is how "None" is kept to a fair share
// on the optional features (Horns, Wings, Tail, Familiar).
export const categories: Category[] = [
  {
    name: "Hair Type",
    items: [
      { name: "Straight", winChance: 0.3 },
      { name: "Wavy", winChance: 0.3 },
      { name: "Curly", winChance: 0.3 },
      { name: "Short", winChance: 0.3 },
      { name: "Long", winChance: 0.3 },
      { name: "Bald" },
      { name: "Braided", winChance: 0.3 },
    ],
  },
  {
    name: "Hair Color",
    items: [
      { name: "Black" },
      { name: "Brown" },
      { name: "Blonde" },
      { name: "Red" },
      { name: "Grey" },
      { name: "Purple" },
      { name: "Green" },
      { name: "White" },
      { name: "Pink" },
      { name: "Multi/You Choose" },
    ],
  },
  {
    name: "Eye Color",
    items: [
      { name: "Black" },
      { name: "Blue" },
      { name: "Brown" },
      { name: "Red" },
      { name: "Green" },
      { name: "Grey" },
      { name: "White" },
      { name: "Hazel" },
      { name: "Yellow" },
      { name: "Purple" },
    ],
  },
  {
    name: "Horns",
    items: [
      { name: "Long" },
      { name: "Short" },
      { name: "Curved" },
      { name: "None", winChance: 0.3 },
    ],
  },
  {
    name: "Wings",
    items: [
      { name: "Dragon" },
      { name: "Feathered" },
      { name: "Fairy" },
      { name: "Insect" },
      { name: "None", winChance: 0.3 },
    ],
  },
  {
    name: "Tail",
    items: [
      { name: "Long" },
      { name: "Short" },
      { name: "Bushy" },
      { name: "Broken" },
      { name: "Cut Short" },
      { name: "None", winChance: 0.3 },
    ],
  },
  {
    name: "Number of Accessories",
    items: [
      { name: "1" },
      { name: "2" },
      { name: "3" },
      { name: "4" },
      { name: "5" },
      { name: "6" },
      { name: "7" },
      { name: "8" },
      { name: "9" },
      { name: "10" },
    ],
  },
  {
    name: "Familiar",
    items: [
      { name: "Dog" },
      { name: "Cat" },
      { name: "Fox" },
      { name: "Dragon" },
      { name: "Bat" },
      { name: "Bird" },
      { name: "You Choose" },
      { name: "None", winChance: 0.3 },
    ],
  },
  {
    name: "Class",
    items: [
      { name: "Paladin" },
      { name: "Rogue" },
      { name: "Cleric" },
      { name: "Bard" },
      { name: "Fighter" },
      { name: "Ranger" },
      { name: "Artificer" },
      { name: "Barbarian" },
      { name: "Druid" },
      { name: "Monk" },
      { name: "Sorcerer" },
      { name: "Warlock" },
      { name: "Wizard" },
    ],
  },
  {
    name: "Alignment",
    items: [
      { name: "Lawful Good" },
      { name: "Neutral Good" },
      { name: "Chaotic Good" },
      { name: "Lawful Evil" },
      { name: "Neutral Evil" },
      { name: "Chaotic Evil" },
    ],
  },
];

// Pastel fill colors for the wheel slices. Slice i uses colors[i % colors.length], so the
// colors repeat from the start if a wheel has more items than there are colors here.
export const colors: string[] = [
  "#FFB7C5",
  "#E6E6FA",
  "#FFD6BA",
  "#FFFACD",
  "#D8B4F8",
  "#CCCCFF",
  "#FADADD",
  "#E8C1C5",
  "#CDEAFB",
  "#F5E6CC",
  "#B7C4A3",
  "#D9B38C",
  "#BDE0FE",
];
