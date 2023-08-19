//This is a popular web application framework for Node.js, simplifying the process of creating APIs and handling HTTP requests.
const express = require('express');
//This middleware allows Cross-Origin Resource Sharing (CORS) to enable requests from the React app to the server. It ensures that requests from different domains (like localhost:3000 for React and localhost:5000 for the server) are allowed which are using for frontend and backend
const cors = require('cors');
//This module provides an API for interacting with the file system, which we will use to read the files in the specified directory.
const fs = require('fs');
//This module provides utilities for working with file and directory paths, helping us construct the correct path to the directory we want to list files from.
//For future use
//const path = require('path');
const app = express();
//api call port
const port = 5001;
//Read config.json
const file = 'config.json';

//Read files synchronously
function sync_readJSONFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const config_json = JSON.parse(data);
        return config_json;
    } catch (error) {
        console.error('Error reading/parsing the JSON file:', error);
        throw error;
    }
}
//Read files asynchronously
function async_readJSONFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the JSON file:', err);
                reject(err);
            } else {
                try {
                    const config_json = JSON.parse(data);
                    resolve(config_json);
                } catch (parseError) {
                    console.error('Error parsing JSON data:', parseError);
                    reject(parseError);
                }
            }
        });
    });
}

// this will filter as per our nomenclature
function filter_json_files(files){
    let filtered_files =  [];
    const filenameRegex = /^(\w*)-(live|history)\.json$/;

    if(files.length > 0){
        files.forEach(filename => {
            const match = filename.match(filenameRegex);
            if(match){
                //console.log(`Match files: ${match}`);
                filtered_files.push(filename);
            }
        });
    }else{
        console.log("Error, parameter missing for this function")
    }

    return filtered_files;
}

//read the structure json inside and convert them in jsonify
function readJSONFileSync(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        let jsonData = JSON.parse(data);
        jsonData = JSON.stringify(jsonData);
        return jsonData;
    } catch (error) {
        console.error('Error reading/parsing the JSON file:', error);
        throw error;
    }
}

//enable cross origin to connect
app.use(cors());

// Define the API endpoint to list files from the directory
app.get('/api/files', (req, res) => {
    final_json = {}
    json_data = sync_readJSONFile('config.json');
    // Replace' with the path to your desired directory
    const directoryPath = json_data.location;
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).json({ error: 'Server error' });
        } else {
            //get the json files we need
            files = filter_json_files(files);
            files.forEach(file=>{
                //console.log(directoryPath+"/"+file)
                final_json[file] = readJSONFileSync(directoryPath+"/"+file);
            });
            res.json(final_json);
        }
    });
});


//open port and get stugg
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});