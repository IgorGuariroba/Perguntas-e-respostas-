const express = require("express"); // Importando o express
const app = express(); // Iniciando o express
const bodyParser = require("body-parser");//importando o bodyParser


// Configurando ejs como redenrizador da pagina
app.set('view engine', 'ejs');
// Configurando o express para fazer uso de arquivos staticos
app.use(express.static('public'));
// Configurando o body-parser o que traduz html para o javascript
app.use(bodyParser.urlencoded({extended: false}))
//Configurando o body-parser  o que nos permite trabalhar com json
app.use(bodyParser.json())

app.get("/",function(req,res){
    res.render("index");
});

app.get("/pergunta",function(req,res){
    res.render("pergunta");
});

app.post("/salvarPergunta",function(req,res){
   var titulo = req.body.titulo;
   var descricao = req.body.descricao;

    res.send("Formulario recebido titulo:"+titulo+"  descricao: "+descricao+"");
});

app.listen(80,function(erro){
    if(erro){
        console.log("Ocorreu um erro!");
    }else{
        console.log("Servidor iniciado com sucesso!");
    }
})
