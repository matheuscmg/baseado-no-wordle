const PORT = 8000;
const express = require('express');
const axios = require('axios').default;
const cors = require('cors');

const app = express();
app.use(cors());

let palavraPt = ["parvo", "valia", "ameno", "genio", "prumo", "parco", "laico", "vivaz", "vivaz", "bravo", "favor", "vital", "visao", "parvo", "adiar", "nocao", "facam", "rogar", "citar", "ranço", "legal", "anelo", "selar", "tecer", "casta", "prime", "olhar", "horda", "fonte", "marco", "doido", "leito", "ajuda", "probo", "cauda", "bravo", "morte", "rogar", "fator", "legal", "anelo","rogar"]
let palavraEn = ["cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", "evade", "naval", "serve", "heath", "dwarf", "model", "karma", "stink", "grade", "quiet", "bench", "abate", "feign", "major", "death", "fresh", "crust", "stool", "colon", "abase", "marry", "react", "batty", "pride", "floss", "helix", "croak", "staff", "paper", "unfed", "whelp"]
let results = {winners: 0,losseers: 0};

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


app.get('/palavrapt', (req, res) => {

  res.json(palavraPt[Math.floor(Math.random() * palavraPt.length)])
    
});

app.get('/palavraen', (req, res) => {

  res.json(palavraEn[Math.floor(Math.random() * palavraEn.length)])
});

 

app.get('/result', (req, res) => {
  return res.json(results);
});