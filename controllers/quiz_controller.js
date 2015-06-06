var models = require('../models/models.js');

exports.author = function(req,res)
{
res.render('/author/index',{ title: 'Créditos' ,errors:[]});
};


exports.destroy = function(req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};

exports.edit = function(req,res)
{
	var quiz = req.quiz;
	res.render('quizes/edit',{quiz: quiz,errors:[]});
};

exports.update = function(req,res)
{
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;
	req.quiz
	.validate()
	.then(
		function(err)
		{
			if(err)
			{
				res.render('quizes/edit',{quiz: req.quiz,errors:err.errors});
			}
			else {
				req.quiz
				.save({fields:["pregunta","respuesta","tema"]})
				.then(function(){res.redirect('/quizes');})
			}
		}
	).catch(function(error){next(error)});
};

exports.new = function(req,res)
{
	var quiz = models.Quiz.build(
		{
			pregunta:"Pregunta", respuesta:"Respuesta",tema:"otro"
		}
	);
	res.render('quizes/new',{quiz:quiz,errors:[]});
};


exports.create = function(req, res)
{

	console.log("Entra en create");
	var quiz = models.Quiz.build( req.body.quiz );

	  quiz
	  .validate()
	  .then(
	    function(err){
	      if (err) {
	        res.render('quizes/new', {quiz: quiz, errors: err.errors});
	      } else {
	        quiz // save: guarda en DB campos pregunta y respuesta de quiz
	        .save({fields: ["pregunta", "respuesta","tema"]})
	        .then( function(){ res.redirect('/quizes')})
	      }      // res.redirect: Redirección HTTP a lista de preguntas
	    }
	  ).catch(function(error){next(error)});
};




exports.index = function(req,res)
{
	//console.log(req.query.search);
	var search = req.query.search;
	if(!search)
	{
		models.Quiz.findAll({order: 'LOWER(pregunta), pregunta ASC'}).then(function(quizes)
		{
			res.render('quizes/index.ejs',{quizes:quizes,search:'',errors:[]});
		}).catch(function(error) {next(error);});

	}
	else {
		search = search.trim().replace(" ", "%");
		search = "%" + search + "%";
		console.log("Buscando: " +  search);
		models.Quiz.findAll( {where: ["pregunta like ?", search],order: 'LOWER(pregunta), pregunta ASC'}).then(function(quizes)
		{
			res.render('quizes/index.ejs',{quizes:quizes,search:req.query.search,errors:[]});
		}).catch(function(error) {next(error)});
	}


};



exports.load = function(req,res,next,quizId)
{
	models.Quiz.findById(quizId).then(function(quiz)
	{
		if(quiz)
		{
			req.quiz = quiz;
			next();

		}else{next(new Error("No existe quizId: " + quizId))}
	}).catch(function(error){next(error)});
	//res.render('quizes/question',{pregunta:'Capital de España?',pregunta2:'Capital de Francia?'});
};

exports.show = function(req,res)
{
	//models.Quiz.findById(req.params.quizId).then(function(quiz)
	//{
	//	res.render('quizes/show',{quiz:quiz});
	//})
	res.render('quizes/show',{quiz:req.quiz,errors:[]});
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
		res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado,errors:[]});
};
