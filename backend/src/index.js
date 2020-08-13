//|> Micro framework

//Terminal : choco install nodejs-lts
//Terminal : choco install yarn
//Terminal dentro do back : yarn init -y
//Terminal dentro do back : yarn add express
//Terminal dentro do back : yarn add nodemon -D
//Terminal || atualizando saida constantemente no Navegador: yarn nodemon /Nome.js
//Terminal || BB permite conexão com BD : yarn add mongoose
//Terminal || BB de chamada para outras APIs : yarn add axios
//Terminal || Extensão que tira bloqueio no Gateway da API : yarn add cors

//Métodos http => get | post | put | delete 

//Requisição : Frontend => Backend ===> RESPOSTA Frontend

//Protocolo WEBsocket : Comunicação sem requisição

//Tipos de parâmetros => Query params | Route params | Body
//Query params: request.query (Filtros, Ordenação, Paginação ...)
//Route params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para cria;'ao ou altera;'ao de um registro)

//MongoDB (Banco Não-relacional) bom para aplicações com pouco relacionamentos


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const {setupWebsocket} = require('./websocket');
//importando rotas do routes.js
const routes = require('./routes');

//criando variaveis contantes(const)
const app = express();
const server = http.Server(app);
setupWebsocket(server);

//Banco de Dados gerado pelo site : https://cloud.mongodb.com/
mongoose.connect('MONGO_DB_LINK_TO_DATABASE',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Liberando portas externas para APIs
app.use(cors());

//habilitando para que o express entenda json
app.use(express.json());

//Acessando as rotas
app.use(routes);

//definindo gateway(Porta)
server.listen(3333);

//<|