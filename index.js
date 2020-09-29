const express = require("express"); // Importando o express
const app = express(); // Iniciando o express


// Configurando ejs como redenrizador da pagina
app.set('view engine', 'ejs');


app.get("/:nome/:langue",function(req,res){
    var nome = req.params.nome;
    var langue = req.params.langue;
    var exibirmsg = false;
    res.render("index",{
        nome: nome,
        langue: langue,
        empresa: "BlackBoard",
        inscritos: 8000,
        msg:exibirmsg
    });
});

app.get("/blog/:artigo?",function(req, res){

    var artigo = req.params.artigo;

    if(artigo){
        res.send("<h2>Artigo: " + artigo + " </h2>");
    }else{
        res.send("<h3>Bem vindo ao meu blog!: www.guiadoprogramador.com</h3>");
    }
})

app.get("/canal/youtube", function(req, res){
    var canal = req.query["canal"];

    if(canal){
        res.send(canal); 
    }else{
        res.send("Nenhum canal fornecido!");
    }
})

app.get("/ola/:nome/:empresa", function(req, res){
    // REQ => DADOS ENVIADOS PELO USUÁRIO
    // RES => RESPOSTA QUE VAI SER ENVIADA PARA O USUÁRIO
    var nome = req.params.nome;
    var empresa = req.params.empresa;
    res.send("<h1>Oi " + nome +  " do " + empresa + " </h1>");
});


app.listen(80,function(erro){
    if(erro){
        console.log("Ocorreu um erro!");
    }else{
        console.log("Servidor iniciado com sucesso!");
    }
})
