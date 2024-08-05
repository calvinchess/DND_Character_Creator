// src/components/FormStep2.js
import React, { useEffect, useState } from 'react';
import { getAllRaces } from '../HelperFunctions';
import RaceCard from './RaceCard';

const FormStep2 = ({ race, handleChange, nextStep, prevStep }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedRace, setSelectedRace] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllRaces();
                setData(result.race); // Set the fetched data
            } catch (error) {
                setError(error); // Set the error
            }
        };

        fetchData();
    }, []);

    const findRace = (dropdownSelection) => {
        //console.log("finding race...")
        if (typeof dropdownSelection !== "string" || dropdownSelection.split(' ').length < 2) {
            return;
        }

        let selectedName = dropdownSelection.split(' ')[0]
        let selectedSource = dropdownSelection.split(' ')[1].substring(1, dropdownSelection.split(' ')[1].length - 1);

        data.forEach((race) => {
            if (race.name === selectedName && race.source === selectedSource) {
                //console.log(race);
                if (selectedRace !== race) setSelectedRace(race);
                console.log("Found Race:")
                console.log(race)
            }
        })


    };

    let raceDisplays = [];

    if (!data) {
        console.log("ERROR GETTING DATA");
    }
    else {
        data.forEach((race) => raceDisplays.push(race.name + " (" + race.source + ")"));
        if (selectedRace === null) findRace(race);
    }





    //console.log("Race Array: " + data);

    const onChange = (e) => {
        const { name, value } = e.target;

        console.log(name + " " + value);

        findRace(value);

        handleChange(e);
    };





    return (
        <div>
            <div>
                <h2>Step 2: Choose Your Race</h2>
                <label htmlFor="race">Race:</label>
                <select
                    id="race"
                    name="race"
                    value={race}
                    onChange={onChange}
                >
                    <option value="">Select a race</option>
                    {raceDisplays.map((raceOption) => (
                        <option key={raceOption} value={raceOption}>
                            {raceOption}
                        </option>
                    ))}
                </select>
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
            </div>
            <div>
                {selectedRace !== null &&
                    <RaceCard race={selectedRace} />
                }
            </div>
        </div>
    );
};

export default FormStep2;
