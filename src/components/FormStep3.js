// src/components/FormStep3.js
import React, { useEffect, useState } from 'react';
import { getAllClasses, getClassInfo } from '../HelperFunctions';
import ClassCard from './ClassCard';

const FormStep3 = ({ characterClass, handleChange, prevStep }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [classInfoData, setClassInfoData] = useState(characterClass);

    const [currentClass, setCurrentClass] = useState(characterClass);

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
            setClassInfoData(result.class[0]); // Set the fetched data
        } catch (error) {
            console.log(error); // Set the error
        }
    };

    let classDisplays = [];

    if (!data) {
        console.log("ERROR GETTING DATA");
    }
    else {
        let classes = Object.keys(data);
        // console.log(classes);
        for (var index in classes) {
            classDisplays.push(classes[index].substring(0, 1).toUpperCase() + classes[index].substring(1));
        }
    }


    const onChange = (e) => {
        const { name, value } = e.target;

        setCurrentClass(value);

        // console.log("calling from change")
        // fetchClassInfoData(value);

        handleChange(e);
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
                    <option key={classOption} value={classOption}>
                        {classOption}
                    </option>
                ))}
            </select>
            <button onClick={prevStep}>Back</button>
            {characterClass != "" &&
                <ClassCard className={currentClass} classData={classInfoData} />
            }
        </div>
    );
};

export default FormStep3;
