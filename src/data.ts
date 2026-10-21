import type { Category } from "./types/types";

export const categories: Category[] = [
  {
    name: "Hair Type",
    items: [
      { name: "Straight" },
      { name: "Wavy" },
      { name: "Curly" },
      { name: "Short" },
      { name: "Long" },
      { name: "Bald" },
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
      { name: "Bat" },
      { name: "Bird" },
      { name: "Fairy" },
      { name: "Bug" },
      { name: "None", winChance: 0.3 },
    ],
  },
  {
    name: "Tail",
    items: [
      { name: "Long" },
      { name: "Short" },
      { name: "None", winChance: 0.3 },
    ],
  },
  {
    name: "Accessory",
    items: [
      { name: "Bag" },
      { name: "Hat" },
      { name: "Armor" },
      { name: "Gloves" },
      { name: "Belt" },
      { name: "None", winChance: 0.3 },
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
    ],
  },
  //   {
  //     name: "Archetype",
  //     items: [],
  //   },
];
