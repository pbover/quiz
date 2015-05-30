//Se define modelo quiz
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Quiz',
      { pregunta:
        {
        type: DataTypes.STRING,
        validate:{notEmpy:{msg: "-> falta Pregunta"}}
        }
      ,
        respuesta:
        {
        type: DataTypes.STRING
        ,
        validate:{notEmpy:{msg: "-> falta Respuesta"}
        }
      });
};
