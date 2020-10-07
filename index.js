const express = require("express"); // Importando o express
const app = express(); // Iniciando o express
const bodyParser = require("body-parser");//importando o bodyParser
const connection = require('./database/database'); //
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
   var titulo    = req.body.titulo;
   var descricao = req.body.descricao;

   //salvar os dados na tabela
   Pergunta.create({
        titulo: titulo,
        descricao: descricao
   }).then(() => {
       res.redirect("/");
   });
});

app.get("/pergunta/:id",(req,res) =>{

    var id = req.params.id;

    Pergunta.findOne({
        where:{id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[
                     ['id','DESC']
                ]

            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else {
            res.redirect("/");
        }
    });
});

app.post("/salvarResposta",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    //salvar os dados na tabela
    Resposta.create({
         corpo: corpo,
         perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId)
    }).catch((e) => {
        console.log(e);
    });
   // res.send("Formulario recebido titulo:"+corpo+"  descricao: "+perguntaID+"");
 });

app.listen(80,()=>{console.log("App rodando")});
  
