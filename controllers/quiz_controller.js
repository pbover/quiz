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
	}).catch(function(error) {next(error);})
};

exports.load = function(req,res,next,quizId)
{
	models.Quiz.findById(quizId).then(function(quiz)
	{
		if(quiz)
		{
			req.quiz = quiz;
			next();

		}else{next(new Error("No existe quizId" + quizId))}
	}).catch(function(error){next(error);});
	//res.render('quizes/question',{pregunta:'Capital de España?',pregunta2:'Capital de Francia?'});
};

exports.show = function(req,res)
{
	//models.Quiz.findById(req.params.quizId).then(function(quiz)
	//{
	//	res.render('quizes/show',{quiz:quiz});
	//})
	res.render('quizes/show',{quiz:req.quiz});
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
	 var resultado="Incorrecto";
		if(req.query.respuesta ===req.quiz.respuesta)
		{
			resultado="Correcto";
		}
		res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado});
};
