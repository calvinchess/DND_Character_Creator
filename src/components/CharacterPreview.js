// src/components/CharacterPreview.js
import React from 'react';
import './CharacterPreview.css'; // Import CSS for styling

const CharacterPreview = ({
	name,
	race,
	characterClass,
	level,
	abilities,
	skills,
	savingThrows,
	hitPoints,
	armorClass,
	equipment,
	features,
}) => {
	return (
		<div className="character-preview">
			<header className="header">
				<h1>{name}</h1>
				<p><strong>Race:</strong> {race}</p>
				<p><strong>Class:</strong> {characterClass}</p>
				<p><strong>Level:</strong> {level}</p>
			</header>

			<section className="stats">
				<div className="abilities">
					<h2>Abilities</h2>
					<ul>
						{Object.entries(abilities).map(([key, value]) => (
							<li key={key}><strong>{key}:</strong> {value}</li>
						))}
					</ul>
				</div>
				<div className="saving-throws">
					<h2>Saving Throws</h2>
					<ul>
						{Object.entries(savingThrows).map(([key, value]) => (
							<li key={key}><strong>{key}:</strong> {value}</li>
						))}
					</ul>
				</div>
				<div className="combat">
					<h2>Combat</h2>
					<p><strong>Hit Points:</strong> {hitPoints}</p>
					<p><strong>Armor Class:</strong> {armorClass}</p>
				</div>
			</section>

			<section className="skills-equipment">
				<div className="skills">
					<h2>Skills</h2>
					<ul>
						{Object.entries(skills).map(([key, value]) => (
							<li key={key}><strong>{key}:</strong> {value}</li>
						))}
					</ul>
				</div>
				<div className="equipment">
					<h2>Equipment</h2>
					<ul>
						{equipment.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</div>
			</section>

			<section className="features">
				<h2>Features and Traits</h2>
				<ul>
					{features.map((feature, index) => (
						<li key={index}>{feature}</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default CharacterPreview;
