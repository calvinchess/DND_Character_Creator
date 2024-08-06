import React from 'react';
import './ClassFeature.css'; // Import CSS file for styling
import { parseReferences } from '../HelperFunctions';

const ClassFeature = ({ classFeature, classData }) => {
    if (!classFeature) {
        return <div>No feature data available</div>;
    }

    const renderEntry = (entry) => {
        //console.log("Rendering: ");
        //console.log(entry);
        try {

            if (typeof entry === "string") {
                return <p>{parseReferences(entry)}</p>;
            } else if (entry.type === "entries") {
                return (
                    <div>
                        <h4 className="feature-title">{entry.name}</h4>
                        <ul>
                            {entry.entries.map((embeddedEntry) => (
                                <li>{renderEntry(embeddedEntry)}</li>
                            ))}
                        </ul>
                    </div >
                );
            } else if (entry.type === "list") {
                return (
                    <ul>
                        {entry.items.map((item) => (
                            <li>{renderEntry(item)}</li>
                        ))}
                    </ul>
                );
            } else if (entry.type == "abilityDc") {
                return (
                    <p><strong>{entry.name} save DC: </strong> 8 + your proficiency bonus + {entry.attributes[0]}</p>
                )
            } else if (entry.type == "abilityAttackMod") {
                return (
                    <p><strong>{entry.name} attack modifier: </strong> your proficiency bonus + {entry.attributes[0]}</p>
                )
            } else if (entry.type == "refClassFeature") {
                return <p><strong>{entry.classFeature.split('|')[0]}</strong></p>
            } else if (entry.type == "refSubclassFeature") {
                let components = entry.subclassFeature.split('|');
                let subclassFeatureName = components[0];
                let shortName = components[3];
                let level = parseInt(isNaN(components[components.length - 1]) ? components[components.length - 2] : components[components.length - 1]);
                let featureObject = null;
                classData.subclassFeature.forEach((feature) => {
                    if (feature.name == subclassFeatureName && feature.level == level && feature.subclassShortName == shortName) {
                        featureObject = feature;
                    }
                });

                return (
                    <div>
                        <h4 className="feature-title">{subclassFeatureName}</h4>
                        {featureObject != null &&
                            <div>
                                {featureObject.entries.map((embeddedEntry) => {
                                    //console.log(embeddedEntry);
                                    return <div>{renderEntry(embeddedEntry)}</div>
                                })}
                            </div>
                        }
                    </div>
                );
            } else if (entry.type == "refOptionalfeature") {
                return <p><strong>{entry.optionalfeature.split('|')[0]}</strong></p>
            } else if (entry.type == "item") {
                return <p><strong>{entry.name}</strong> {entry.entry}</p>
            } else if (entry.type == "quote") {
                return null;
            } else if (entry.type == "inset") {
                return null;
            } else if (entry.type == "table") {
                return (
                    <div>
                        <h4 className="feature-title">{entry.caption}</h4>
                        <table className="table-element">
                            <span className="table-row">
                                {entry.colLabels.map((label) => {
                                    return <span className="table-cell">{parseReferences(label)}</span>
                                })}
                            </span>
                            {entry.rows.map((row) => {
                                return (
                                    <span className="table-row">
                                        {row.map((cellText) => {
                                            return <span className="table-cell">{parseReferences(cellText)}</span>
                                        })}
                                    </span>
                                )
                            })}
                        </table>
                    </div>
                );
            }
            else if (entry.type == "options") {
                return (
                    <ul>
                        {entry.entries.map((item) => (
                            <li>{renderEntry(item)}</li>
                        ))}
                    </ul>
                );
            } else {
                console.warn('Unhandled entry type:', entry);
                return null;
            }
        }
        catch (error) {
            console.log("Invalid Entry: ");
            console.log(entry);
        }
    };

    return (
        <div className="class-feature">
            <h3 className="feature-title">{classFeature.name}</h3>
            <hr className="feature-divider" />
            {classFeature.entries && (
                <div>
                    {classFeature.entries.map((entry, index) => renderEntry(entry, index))}
                </div>
            )}
        </div>
    );
};

export default ClassFeature;
