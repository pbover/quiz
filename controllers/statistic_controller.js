var sequelize = require('sequelize');
var models = require('../models/models.js');
						exports.index = function(req,res)
						{
							 //El número de preguntas
							  var na1="";
								//El número de comentarios totales
								var na2="";
								//El número medio de comentarios por pregunta
								var na3="";
								//El número de preguntas sin comentarios
								var na4="";
								//El número de preguntas con comentarios
								var na5="";
								models.Quiz.count().then(function(count) {
									console.log("Número de preguntas = " + count);
									na1 = count.toString();
									models.Comment.count().then(function(count) {
										na2 = count.toString();

										na3 = parseInt(na2)/parseInt(na1);
										na3 = na3.toString();
										models.Quiz.findAll({
											attributes: ["id"],
											include: [
											    {model: models.Comment}
											  ]
										})
										.then(function(resultados) {
											na4 = 0;
											for (var x = 0 ; x < resultados.length ; x++) {

													if(resultados[x].Comments.length==0){
														na4 +=1;
													}
											}
											na4 = na4.toString();
											models.Quiz.count({include: {model:models.Comment,include:{model:models.Quiz,required:true},required:false},distinct:true})
											.then(function(result) {
												na5 = JSON.stringify(result);
												res.render('statistics/index.ejs',{ n1:na1,n2:na2,n3:na3,n4:na4,n5:na5, errors:[]});
											}).catch(function(error) {console.log("Error producido = " + error);});
										}).catch(function(error) {console.log("Error producido = " + error);});
									}).catch(function(error) {
										//return next(error);
									  console.log("Error producido = " + error);
										});
								}).catch(function(error) {console.log("Error producido = " + error);});
						};
