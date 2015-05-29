exports.question = function(req,res)
{
res.render('quizes/question',{pregunta:'Capital de España?',pregunta2:'Capital de Francia?'});
};

exports.answer = function(req,res)
{
	//if(req.query.respuesta ==='Madrid' && req.query.respuesta2 ==='Paris')
	if(req.query.respuesta ==='Madrid')
	{
		res.render('quizes/answer',{respuesta:'Correcto!'});
	}
	else
	{
		res.render('quizes/answer',{respuesta:'Incorrecto!, la respuesta correcta es Madrid'});
	}
};
