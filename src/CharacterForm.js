// src/components/CharacterForm.js
import React, { useState } from 'react';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';

const CharacterForm = ({ onCharacterChange }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [race, setRace] = useState('');
  const [characterClass, setCharacterClass] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCharacterChange({ name, race, characterClass });
  };

  return (
    <div>
      {step === 1 && (
        <FormStep1
          name={name}
          setName={setName}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <FormStep2
          race={race}
          setRace={setRace}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <FormStep3
          characterClass={characterClass}
          setCharacterClass={setCharacterClass}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CharacterForm;
