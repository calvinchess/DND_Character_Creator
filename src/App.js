// src/App.js
import React, { useState } from 'react';
import CharacterForm from './components/CharacterForm';
import CharacterPreview from './components/CharacterPreview';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
	const [character, setCharacter] = useState({
		name: "Aragorn",
		race: "Human",
		characterClass: "Ranger",
		level: 5,
		abilities: {
			Strength: 10,
			Dexterity: 10,
			Constitution: 10,
			Intelligence: 10,
			Wisdom: 10,
			Charisma: 10,
		},
		savingThrows: {
			Strength: '+3',
			Dexterity: '+2',
			Constitution: '+2',
			Intelligence: '+1',
			Wisdom: '+3',
			Charisma: '+1',
		},
		hitPoints: "40",
		armorClass: "15",
		skills: {
			Stealth: '+5',
			Survival: '+4',
			Perception: '+6',
		},
		equipment: [
			"Longsword",
			"Bow and Arrows",
			"Leather Armor",
			"Explorer's Pack",
		],
		features: [
			"Darkvision",
			"Favored Enemy: Beasts",
			"Natural Explorer",
		],
	});

	return (
		<div className="App">
			<Header />
			<CharacterForm character={character} setCharacter={setCharacter} />
			<CharacterPreview
				name={character.name}
				race={character.race}
				characterClass={character.characterClass}
				level={character.level}
				abilities={character.abilities}
				skills={character.skills}
				savingThrows={character.savingThrows}
				hitPoints={character.hitPoints}
				armorClass={character.armorClass}
				equipment={character.equipment}
				features={character.features}
			/>
			<Footer />
		</div>
	);
}

export default App;
