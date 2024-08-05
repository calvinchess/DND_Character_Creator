import React from 'react';
import './RaceCard.css'; // Import CSS file for styling

const RaceCard = ({ race }) => {

    let abilityScore = "";

    if (race.ability != null) {
        race.ability.map((keyValue) => {
            //console.log(keyValue)
            for (var ability in keyValue) {
                if (ability == "choose") {
                    abilityScore += "Choose any other " + keyValue[ability].count + " unique +1"
                }
                else {
                    if (keyValue[ability] >= 0) {
                        abilityScore += ability + " +" + keyValue[ability] + "; ";
                    }
                    else {
                        abilityScore += ability + " " + keyValue[ability] + "; ";
                    }
                }
            }
        });
    }
    else {
        abilityScore = "Choose one of: (a) Choose any +2; choose any other +1 (b) Choose three different +1"
    }




    return (
        <div className="race-card">
            <h2 className="race-title">{race.name}</h2>
            <ul className="race-attributes">
                {abilityScore != null &&
                    <li><strong>Ability Scores</strong> {abilityScore}</li>
                }
                <li><strong>Size</strong> {race.size}</li>
                {Number.isInteger(race.speed) &&
                    <li><strong>Speed</strong> {race.speed} ft.</li>
                }
                {!Number.isInteger(race.speed) && race.speed.fly != null && race.speed.swim != null &&
                    <li><strong>Speed</strong> {race.speed.walk} ft., swim {race.speed.swim} ft., fly {race.speed.fly} ft.</li>
                }
                {!Number.isInteger(race.speed) && race.speed.fly != null &&
                    <li><strong>Speed</strong> {race.speed.walk} ft., fly {race.speed.fly} ft.</li>
                }
                {!Number.isInteger(race.speed) && race.speed.swim != null &&
                    <li><strong>Speed</strong> {race.speed.walk} ft., swim {race.speed.swim} ft.</li>
                }

                {race.entries.map((entry) => {
                    if (entry.entries.length > 1 && entry.entries[1].type != "table") {
                        return (
                            <li><strong>{entry.name}</strong> {entry.entries[0]}
                                {typeof entry.entries[1] !== "string" &&
                                    <ul>{entry.entries[1].items.map((embeddedEntry, i) => {
                                        { console.log(embeddedEntry.name) }
                                        return <li><strong>{embeddedEntry.name}</strong> {embeddedEntry.entry}</li>
                                    })}
                                    </ul>
                                }
                                {typeof entry.entries[1] === "string" &&
                                    <ul>
                                        <li>{entry.entries[1]}</li>
                                    </ul>
                                }
                            </li>
                        );
                    }
                    else if (entry.entries.length > 1 && entry.entries[1].type == "table") {
                        return (
                            <div>
                                <li><strong>{entry.name}</strong> {entry.entries[0]}</li>
                                <table class="table-element">
                                    <span class="table-row">
                                        {entry.entries[1].colLabels.map((label) => {
                                            return <span class="table-header table-cell">{label}</span>
                                        })}
                                    </span>
                                    {entry.entries[1].rows.map((row) => {
                                        return (
                                            <span class="table-row">
                                                {row.map((value) => {
                                                    return (
                                                        <span class="table-cell">
                                                            {value}
                                                        </span>
                                                    )
                                                })}
                                            </span>
                                        )
                                    })}
                                </table>
                            </div>
                        )
                    }
                    else {
                        return <li><strong>{entry.name}</strong> {entry.entries[0]}</li>
                    }
                })}
            </ul>
        </div>
    );
};

export default RaceCard;