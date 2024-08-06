// src/components/FormStep3.js
import React, { useEffect, useState } from 'react';
import { getAllClasses, getClassInfo } from '../HelperFunctions';
import ClassCard from './ClassCard';

const FormStep3 = ({ characterClass, handleChange, prevStep }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [classInfoData, setClassInfoData] = useState(characterClass);

    const [currentClass, setCurrentClass] = useState(characterClass);
    const [currentSubclass, setCurrentSubclass] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllClasses();
                setData(result); // Set the fetched data
            } catch (error) {
                setError(error); // Set the error
            }
        };

        fetchData();
    }, []);

    const fetchClassInfoData = async (className) => {
        try {
            const result = await getClassInfo(className);
            setClassInfoData(result); // Set the fetched data
        } catch (error) {
            console.log(error); // Set the error
        }
    };

    let classDisplays = [];
    let subclassDisplays = [];

    if (!data) {
        console.log("ERROR GETTING DATA");
    }
    else {
        let classes = Object.keys(data);
        // console.log(classes);
        for (var index in classes) {
            classDisplays.push(classes[index].substring(0, 1).toUpperCase() + classes[index].substring(1));
        }
        for (var index in classInfoData.subclass) {
            subclassDisplays.push(classInfoData.subclass[index].name);
        }
    }


    const onChange = (e) => {
        const { name, value } = e.target;

        setCurrentClass(value);

        // console.log("calling from change")
        // fetchClassInfoData(value);

        handleChange(e);
    }

    const changeSubclass = (e) => {
        const { name, value } = e.target;

        setCurrentSubclass(value);

        // console.log("calling from change")
        // fetchClassInfoData(value);
    }

    useEffect(() => {
        if (characterClass) {
            fetchClassInfoData(characterClass);
        }
    }, [characterClass]);




    return (
        <div>
            <h2>Step 2: Choose Your Class</h2>
            <label htmlFor="class">Class:</label>
            <select
                id="class"
                name="characterClass"
                value={characterClass}
                onChange={onChange}
            >
                <option value="">Select a Class</option>
                {classDisplays.map((classOption) => (
                    <option value={classOption}>
                        {classOption}
                    </option>
                ))}
            </select>
            {characterClass != "" &&
                <div>
                    <br></br>
                    <label htmlFor="subclass">Subclass:</label>
                    <select
                        id="subclass"
                        name="characterSubclass"
                        value={currentSubclass}
                        onChange={changeSubclass}
                    >
                        <option value="">Select a Subclass</option>
                        {subclassDisplays.map((subclassOption) => (
                            <option value={subclassOption}>
                                {subclassOption}
                            </option>
                        ))}
                    </select>
                </div>
            }
            <button onClick={prevStep}>Back</button>
            {characterClass != "" &&
                <ClassCard className={currentClass} subclassName={currentSubclass} classData={classInfoData} />
            }
        </div>
    );
};

export default FormStep3;
