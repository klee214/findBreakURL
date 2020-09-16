const axios = require('axios');
const fs = require('fs');
const validator = require('validator');

const fileData = fs.readFileSync(`${__dirname}\\index.html`,{encoding:"utf-8"});

const regex = /(https|http):\/\/.*["]/g;
const findURL = fileData.match(regex);

const fetchFunction = async (url)=>{

    try {
        const response = await axios.get(url);
        console.log(response.status)
        
    } catch (error) {
        if(error.response){
            console.log(error.response.status)   
        }

        console.log("ENOTFOUND");
    }
}

findURL.forEach((url, index) => {
    findURL[index] = url.slice(0, url.lastIndexOf('"'));
    fetchFunction(findURL[index]);
});








