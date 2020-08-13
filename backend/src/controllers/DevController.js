const axios = require('axios');
const Dev = require('../models/Dev');
const { index } = require('../models/utils/PointSchema');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

//Funções do controller : index | show | store | update | destroy
//index : Mostrar lista
//show : Mostrar unico
//store : Criar
//update : Alterar
//destroy : Deletar

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const {github_username, techs, latitude, longitude} = request.body;

        //Verificando existencia (evita duplicidade)
        let dev = await Dev.findOne({github_username});

        if (!dev){

            //chamando dados a APIs externos
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const {name = login, avatar_url, bio} = apiResponse.data;
        
            //Split nas Techs
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates : [longitude, latitude]
            };
        
            dev = await Dev.create({
                github_username,
                name, 
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        
            //Filtrar as conexões (10km e pelo umenos umas das techs listadas)
            const sendSocketMessageTo = findConnections(
                {
                    latitude,
                    longitude
                },
                techsArray
            );
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
    
        return response.json(dev);
    }
};