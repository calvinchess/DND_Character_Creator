let races = null;
let classes = null;
let classInfos = {};

export async function fetchAndParseJSON(file) {
    let data = null;
    try {
        // Fetch the JSON file
        const response = await fetch(file);

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // Parse the JSON
        data = await response.json();

        // Log the parsed JSON data
        console.log(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }

    return data
}

export async function getAllRaces() {
    //console.log("Races: " + races)
    if (races == null) {
        races = await fetchAndParseJSON('./data/races.json');
        return races;
    }
    else {
        return races;
    }
}

export async function getAllClasses() {
    //console.log("Classes: " + races)
    if (classes == null) {
        classes = await fetchAndParseJSON('./data/class/index.json');
        return classes;
    }
    else {
        return classes;
    }
}

export async function getClassInfo(className) {
    if (classes == null) await getAllClasses();

    console.log("Class Name:");
    console.log(className);

    if (classInfos[className] == null) {
        classInfos[className] = await fetchAndParseJSON('./data/class/' + classes[className.toLowerCase()]);
    }

    return classInfos[className];
}

export function parseReferences(text) {
    let openBrackets = [];
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) == '{') {
            openBrackets.push(i);
        }
        else if (text.charAt(i) == '}' && openBrackets.length > 0) {
            let replacedText = text.substring(openBrackets[openBrackets.length - 1] + 1, i);
            if (replacedText.length > 0 && replacedText.charAt(0) == '@') {
                replacedText = replacedText.split('|')[0].substring(replacedText.indexOf(' ') + 1);
            }
            console.log("Replacement text: " + replacedText);


            text = text.substring(0, openBrackets[openBrackets.length - 1]) + replacedText + text.substring(i + 1);
            i = openBrackets.pop();
        }
    }

    return text;
}