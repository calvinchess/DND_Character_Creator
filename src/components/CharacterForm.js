// src/components/CharacterForm.js
import React, { useState } from 'react';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import StatsForm from './StatsForm';

const CharacterForm = ({ character, setCharacter }) => {
	const [step, setStep] = useState(1);

	const nextStep = () => setStep(step + 1);
	const prevStep = () => setStep(step - 1);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCharacter((prevCharacter) => ({
			...prevCharacter,
			[name]: value,
		}));
	};

	return (
		<div>
			{step === 1 && (
				<FormStep1
					name={character.name}
					nextStep={nextStep}
					handleChange={handleChange}
				/>
			)}
			{step == 2 && (
				<StatsForm
					abilities={character.abilities}
					nextStep={nextStep}
					prevStep={prevStep}
					handleChange={handleChange}
				/>
			)}
			{step === 3 && (
				<FormStep2
					race={character.race}
					nextStep={nextStep}
					prevStep={prevStep}
					handleChange={handleChange}
				/>
			)}
			{step === 4 && (
				<FormStep3
					characterClass={character.characterClass}
					prevStep={prevStep}
					handleChange={handleChange}
				/>
			)}
		</div>
	);
};

export default CharacterForm;
