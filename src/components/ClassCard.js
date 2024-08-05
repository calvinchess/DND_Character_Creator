import React, { useEffect, useState } from 'react';
import './ClassCard.css'; // Import CSS file for styling
import { getClassInfo } from '../HelperFunctions'

const ClassCard = ({ className, classData }) => {

    const proficiencyBonus = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];

    console.log(classData);

    const isNumeric = (str) => {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    var classTable = [["Level", "Proficiency Bonus", "Class Features"]];

    if (classData != null) {


        for (let i = 0; i < 20; i++) {
            classTable.push([]);
            classTable[i + 1].push(i + 1);
            classTable[i + 1].push(proficiencyBonus[i]);
            classTable[i + 1].push("");
        }

        for (let i in classData.classFeatures) {
            if (typeof classData.classFeatures[i] === "string") {
                let components = classData.classFeatures[i].split('|');
                let feature = components[0];
                let level = 0;

                for (let x in components) {
                    if (isNumeric(components[x])) {
                        level = parseInt(components[x]);
                        break;
                    }
                }

                if (level != 0) {
                    if (classTable[level][2] == "") classTable[level][2] = feature;
                    else classTable[level][2] += ", " + feature;
                }
            }
        }

        if (classData.classTableGroups != null) {
            for (let classGroup in classData.classTableGroups) {
                for (let i in classData.classTableGroups[classGroup].colLabels) {
                    let colLabel = classData.classTableGroups[classGroup].colLabels[i];
                    if (colLabel.includes('|')) {
                        classTable[0].push(colLabel.split('|')[0].substring(9))
                    }
                    else {
                        classTable[0].push(colLabel);
                    }
                }

                if (classData.classTableGroups[classGroup].title == null) {
                    for (let i in classData.classTableGroups[classGroup].rows) {
                        let row = classData.classTableGroups[classGroup].rows[i];

                        for (let index in row) {
                            if (typeof row[index] === "string" || typeof row[index] === "number") {
                                //console.log("Value: " + classTable[parseInt(i + 1)][parseInt(3 + parseInt(index))]);
                                if (typeof row[index] === "string" && row[index].includes('|')) {
                                    row[index] = row[index].split('|')[0].substring(9);
                                }
                                classTable[parseInt(i) + 1].push(row[index]);
                            }
                            else if (row[index].type != null && row[index].type == "dice") {
                                classTable[parseInt(i) + 1].push(row[index].toRoll[0].number + "d" + row[index].toRoll[0].faces);
                            }
                            else if (row[index].type != null && row[index].type == "bonusSpeed") {
                                classTable[parseInt(i) + 1].push(row[index].value);
                            }
                            else if (row[index].type != null && row[index].type == "bonus") {
                                classTable[parseInt(i) + 1].push("+" + row[index].value);
                            }
                        }
                    }
                }
                else {
                    for (let i in classData.classTableGroups[classGroup].rowsSpellProgression) {
                        let row = classData.classTableGroups[classGroup].rowsSpellProgression[i];
                        for (let index in row) {
                            if (typeof row[index] === "string" || typeof row[index] === "number") {
                                //console.log("Value: " + classTable[parseInt(i + 1)][parseInt(3 + parseInt(index))]);
                                if (typeof row[index] === "string" && row[index].includes('|')) {
                                    row[index] = row[index].split('|')[0].substring(9);
                                }
                                if (row[index] == 0) {
                                    row[index] = '-';
                                }
                                classTable[parseInt(i) + 1].push(row[index]);
                            }
                        }
                    }
                }

            }
        }

        console.log(classTable);
    }


    return (
        <div className="class-card">
            <h2 className="class-title">{className}</h2>
            <ul className="class-attributes">
                <div>
                    <table class="table-element">
                        <span class="table-row">
                            {classTable[0].map((label) => {
                                return <span class="table-header table-cell">{label}</span>
                            })}
                        </span>
                        {classTable.map((row, index) => {
                            if (index == 0) {
                                return
                            }
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
            </ul>
        </div>
    );
};

export default ClassCard;