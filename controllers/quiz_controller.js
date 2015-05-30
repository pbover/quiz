var models = require('../models/models.js');

exports.author = function(req,res)
{
res.render('/author/index',{ title: 'Créditos' });
};

exports.index = function(req,res)
{
	models.Quiz.findAll().then(function(quizes)
	{
		res.render('quizes/index.ejs',{quizes:quizes});
	})
};

exports.show = function(req,res)
{
	models.Quiz.findById(req.params.quizId).then(function(quiz)
	{
		res.render('quizes/show',{quiz:quiz});
	})
	//res.render('quizes/question',{pregunta:'Capital de España?',pregunta2:'Capital de Francia?'});
};

//exports.question = function(req,res)
//{
//	models.Quiz.findAll().then(function(quiz)
//	{
//		res.render('quizes/question',{pregunta:quiz[0].pregunta});
//	})
	//res.render('quizes/question',{pregunta:'Capital de España?',pregunta2:'Capital de Francia?'});
//};

exports.answer = function(req,res)
{
	models.Quiz.findById(req.params.quizId).then(function(quiz)
	{
		if(req.query.respuesta ===quiz.respuesta)
		{
			res.render('quizes/answer',{quiz:quiz,respuesta:'Correcto!'});
		}
		else
		{
			res.render('quizes/answer',{quiz:quiz,respuesta:'Incorrecto! Respuesta correcta:'+quiz.respuesta});
		}
	})
};
