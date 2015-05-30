var models = require('../models/models.js');

exports.author = function(req,res)
{
res.render('/author/index',{ title: 'Créditos' });
};

exports.question = function(req,res)
{
	models.Quiz.findAll().then(function(quiz)
	{
		res.render('quizes/question',{pregunta:quiz[0].pregunta});
	})
	//res.render('quizes/question',{pregunta:'Capital de España?',pregunta2:'Capital de Francia?'});
};

exports.answer = function(req,res)
{
	models.Quiz.findAll().then(function(quiz)
	{
		if(req.query.respuesta ===quiz[0].respuesta)
		{
			res.render('quizes/answer',{respuesta:'Correcto!'});
		}
		else
		{
			res.render('quizes/answer',{respuesta:'Incorrecto! Respuesta correcta:'+quiz[0].respuesta});
		}
	})
};
