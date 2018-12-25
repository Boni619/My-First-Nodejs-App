const express=require('express');
const path=require('path');
const bodyParser=require("body-parser");
const nodemailer=require('nodemailer');

let app=express();


app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){

       res.render('index',{title:'Hi, There'});
});
app.get('/about',function(req,res){

    res.render('about');
});
app.get('/contact',function(req,res){

    res.render('contact');
});
app.post('/contact/send',function(req,res){

    let transporter =  nodemailer.createTransport({
          
        service:'Gmail',
        auth:{

            user:'youremail@gmail.com',
            pass:'yourpass'
        }
    });

    let mailOptions = {

        from: 'test(youremail@gmail.com)',
        to:'anyemail@gmail.com',
        subjet:'Contact user',
        text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>' 
    };

    transporter.sendMail(mailOptions,function(error,info){

        if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
    })


});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



