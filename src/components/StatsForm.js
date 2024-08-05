import React, { useState } from 'react';

const StatsForm = ({ abilities, handleChange, nextStep, prevStep }) => {
    const [rolledStats, setRolledStats] = useState([abilities.Strength, abilities.Dexterity, abilities.Constitution, abilities.Intelligence, abilities.Wisdom, abilities.Charisma]);
    const [selectedStats, setSelectedStats] = useState(["-", "-", "-", "-", "-", "-"]);
    const [usableStats, setUsableStats] = useState([abilities.Strength, abilities.Dexterity, abilities.Constitution, abilities.Intelligence, abilities.Wisdom, abilities.Charisma]);
    const [statMethod, setStatMethod] = useState("roll");
    const [statString, setStatString] = useState(`[${abilities.Strength},${abilities.Dexterity},${abilities.Constitution},${abilities.Intelligence},${abilities.Wisdom},${abilities.Charisma}]`);

    const statToIndex = {
        Strength: 0,
        Dexterity: 1,
        Constitution: 2,
        Intelligence: 3,
        Wisdom: 4,
        Charisma: 5
    };

    const rollStat = () => {
        const rolls = [];
        for (let i = 0; i < 4; i++) {
            rolls.push(Math.floor(Math.random() * 6) + 1);
        }
        rolls.sort((a, b) => b - a); // Sort rolls in descending order
        return rolls[0] + rolls[1] + rolls[2]; // Sum the highest three rolls
    };

    const rollStats = () => {
        let newStats = [rollStat(), rollStat(), rollStat(), rollStat(), rollStat(), rollStat()];
        newStats.sort((a, b) => b - a);

        setRolledStats(newStats);
        setUsableStats(newStats);

        let newStatString = newStats.join(',');
        setStatString(`[${newStatString}]`);

        setSelectedStats(["-", "-", "-", "-", "-", "-"]);
    };

    const updateUsableStats = (selectedStats) => {
        let newUsableStats = [...rolledStats];
        selectedStats.forEach(stat => {
            const index = newUsableStats.indexOf(stat);
            if (index !== -1) {
                newUsableStats.splice(index, 1);
            }
        });
        setUsableStats(newUsableStats);
    };

    const changeSelectedStats = (stat, value) => {
        let newSelectedStatsArray = [...selectedStats];
        newSelectedStatsArray[statToIndex[stat]] = value;
        setSelectedStats(newSelectedStatsArray);
        updateUsableStats(newSelectedStatsArray);
    };

    const onChange = (e) => {
        const { name, value } = e.target;

        const newValue = value !== "-" ? parseInt(value) : value;
        changeSelectedStats(name, newValue);

        abilities[name] = newValue;
        const updatedAbilities = { ...abilities, [name]: newValue };

        handleChange({ target: { name: "abilities", value: updatedAbilities } });
    };

    const changeGenerationType = (e) => {
        const { value } = e.target;
        setStatMethod(value);
    };

    return (
        <div>
            {console.log("Rolled Stats:", rolledStats)}
            {console.log("Selected Stats:", selectedStats)}
            {console.log("Usable Stats:", usableStats)}
            <select
                id="generationType"
                name="generationType"
                label="Generation Method"
                onChange={changeGenerationType}
                value={statMethod}
            >
                <option value="roll">4d6 Drop Lowest</option>
                <option value="point buy">Point Buy</option>
                <option value="custom">Custom</option>
            </select>

            {statMethod === "roll" && (
                <div>
                    <h2>Step 2: Roll Your Stats</h2>
                    <button onClick={rollStats}>Roll Stats</button>
                    {Object.keys(abilities).map((stat) => (
                        <div key={stat}>
                            <label>
                                {stat}:
                                <select
                                    name={stat}
                                    value={selectedStats[statToIndex[stat]]}
                                    onChange={onChange}
                                >
                                    <option value="-">-</option>
                                    {selectedStats[statToIndex[stat]] != "-" &&
                                        <option value={selectedStats[statToIndex[stat]]}>{selectedStats[statToIndex[stat]]}</option>
                                    }
                                    {usableStats.map((score, index) => (
                                        <option key={index} value={score}>{score}</option>
                                    ))}
                                </select>
                                {selectedStats[statToIndex[stat]] != "-" && selectedStats[statToIndex[stat]] >= 10 &&
                                    <span>(+{Math.floor((selectedStats[statToIndex[stat]] - 10) / 2)})</span>
                                }
                                {selectedStats[statToIndex[stat]] != "-" && selectedStats[statToIndex[stat]] < 10 &&
                                    <span>({Math.floor((selectedStats[statToIndex[stat]] - 10) / 2)})</span>
                                }
                            </label>
                        </div>
                    ))}
                    <div>
                        <h2>Rolled Stats</h2>
                        <h4>{statString}</h4>
                    </div>
                </div>
            )}
            {statMethod === "point buy" && (
                <h2>Point Buy Method Coming Soon!</h2>
            )}
            {statMethod === "custom" && (
                <div>
                    <h1>Step 2: Customize Your Stats</h1>
                    <form>
                        {Object.keys(abilities).map((stat) => (
                            <div key={stat}>
                                <label>
                                    {stat}:
                                    <input
                                        type="number"
                                        name={stat}
                                        value={abilities[stat]}
                                        onChange={onChange}
                                    />
                                    {abilities[stat] != "-" && abilities[stat] >= 10 &&
                                        <span>(+{Math.floor((abilities[stat] - 10) / 2)})</span>
                                    }
                                    {abilities[stat] != "-" && abilities[stat] < 10 &&
                                        <span>({Math.floor((abilities[stat] - 10) / 2)})</span>
                                    }
                                </label>
                            </div>
                        ))}
                    </form>
                </div>
            )}

            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Next</button>
        </div>
    );
};

export default StatsForm;
