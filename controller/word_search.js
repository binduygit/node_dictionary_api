const express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
var mergeJSON = require("merge-json") ;

const url_text = 'http://norvig.com/big.txt';
const API_key = 'dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9';

const lookup_lang = 'en-en';
var lookup_text = new Array('text','time','position','strong','most','interest','emotion','lose','important','stay');
//var text_details = {};
var textCount = {};
var wordDetails = {};
var wordJSON = {};

function countOccurences(string, word) {
    return string.split(word).length - 1;
 }
 //adding router for getting values
router.get('/', (req, res)=>{
    getBigText();
    res.render('words/display', {
        count: JSON.stringify(textCount),
        list: JSON.stringify(wordDetails)
    });
 })

 //getting text from http://norvig.com/big.txt
 async function getBigText(req, res) {
    await fetch(url_text)
     .then(res => res.text())
     .then(text => {
            useTextForSearching(text)
            return wordDetails,textCount;
     });
     
 }
//getting synonyms and pos using lookup method
async function useTextForSearching(req,res) {
    for(let i = 0; i <lookup_text.length;i++){
        
        const word_count = await countOccurences(req,lookup_text[i]);
        const text_details = {
            'text':lookup_text[i],
            'count':word_count
        };
        textCount += JSON.stringify(text_details);
        var url_lookup = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key='+API_key+'&lang='+lookup_lang+'&text='+lookup_text[i];
        const lookup_response = await fetch(url_lookup) 
        const lookup_data = await lookup_response.json(); 
        wordDetails = mergeJSON.merge(wordDetails,lookup_data);
    }
    wordDetails = JSON.stringify(wordDetails);
    return wordDetails,textCount;
    
}

module.exports = router;