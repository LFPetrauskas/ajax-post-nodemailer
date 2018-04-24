var app = require('express')();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var transporte = nodemailer.createTransport({
	service: 'outlook365',
	secure: false,
	requireTLS: true,
	port: '25',
	auth: {
		user: '',
		pass: ''
	}
});

app.get("/", (req, res, next) => {
	console.log("eae");
	res.sendFile("/home/pi/Desktop/node/index.html");
});

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());


app.post("/email", (req, res, next) => {
	console.log(req);
	var email = {
		from: 'leonardo.petrauskas@unimedsa.com.br',
		to: req.body.para,
		subject: req.body.assunto,
		html: req.body.mensagem
	}
	console.log('Enviando...');
	transporte.sendMail(email, (err, info) => {
		if (err) throw err;
			console.log('Enviado');
			res.sendFile("/home/pi/Desktop/node/index.html");
		});
});

app.listen(3000, () => console.log("server online"));
