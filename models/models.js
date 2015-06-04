
var path = require('path');
//Carga modelo ORM
var Sequelize = require('sequelize');
//Usa BBDD SQLite:
var sequelize = new Sequelize(null,null,null,{dialect:'sqlite', storage:'quiz.sqlite'});
//IMPORTA la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
//Exporta definicion de la tabla Quiz
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa la tabla de preguntas en la basde de datos
sequelize.sync().then(function(){
  Quiz.count().then(function(count){
    if(count===0){
      Quiz.create({pregunta:'Capital de Italia',
                   respuesta:'Roma'
                   })
      .then(function(){ console.log('Base de datos inicializada')});
    };
  });
});
