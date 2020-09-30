const express = require("express"); // Importando o express
const app = express(); // Iniciando o express


// Configurando ejs como redenrizador da pagina
app.set('view engine', 'ejs');
// Configurando o express para fazer uso de arquivos staticos
app.use(express.static('public'));


app.get("/",function(req,res){
    res.render("index");
});

app.get("/pergunta",function(req,res){
    res.render("pergunta");
});

app.listen(80,function(erro){
    if(erro){
        console.log("Ocorreu um erro!");
    }else{
        console.log("Servidor iniciado com sucesso!");
    }
})
