const express = require("express"); // Importando o express
const app = express(); // Iniciando o express
const bodyParser = require("body-parser");//importando o bodyParser
const connection = require('./database/database'); //
const Pergunta = require("./database/Pergunta");

// promise javascript
connection
    .authenticate()
    .then(()=> {
        console.log("conexão realizada com sucesso")
    })

    .catch((msgErro) => {
        console.log(msgErro);
    })

// Configurando ejs como redenrizador da pagina
app.set('view engine', 'ejs');
// Configurando o express para fazer uso de arquivos staticos
app.use(express.static('public'));
// Configurando o body-parser o que traduz html para o javascript
app.use(bodyParser.urlencoded({extended: false}))
//Configurando o body-parser  o que nos permite trabalhar com json
app.use(bodyParser.json())



app.get("/",function(req,res){
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index",{
            perguntas:perguntas
        });
    });
});

app.get("/perguntar",function(req,res){
    res.render("perguntar");
});

app.post("/salvarPergunta",function(req,res){
   var titulo = req.body.titulo;
   var descricao = req.body.descricao;
   //salvar os dados na tabela
   Pergunta.create({
        titulo: titulo,
        descricao: descricao
   }).then(() => {
       res.redirect("/");
   });

    //res.send("Formulario recebido titulo:"+titulo+"  descricao: "+descricao+"");
});

app.get("/pergunta/:id",(req,res) =>{
    var id = req.params.id;
    Pergunta.findOne({
        where:{id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            res.render("pergunta");
        } else {
            res.redirect("/");
        }
    })
})

app.listen(80,function(erro){
    if(erro){
        console.log("Ocorreu um erro!");
    }else{
        console.log("Servidor iniciado com sucesso!");
    }
})
