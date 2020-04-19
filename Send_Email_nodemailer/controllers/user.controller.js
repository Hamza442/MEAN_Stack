const mongoose = require('mongoose');
const passport = require('passport');
const nodemailer = require('nodemailer');
//this package is used to use pick function
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

//using this function to get details of the user 
module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','role']) });
        }
    );
}
module.exports.resetusername= (req,res,next)=>{
    User.findOne({ email:req.body.email}).select('email fullName password').exec(async function(err,user){
        console.log(user);
        if(err){
            res.json({success:false,message:err});
            
        }
        else{
            
            if(!user){
                res.json({success:false,message:'E-mail not found'});
            }
            else{
                let testAccount = await nodemailer.createTestAccount();

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    // host: 'smtp.ethereal.email',
                    // port: 587,
                    // secure: false, // true for 465, false for other ports
                    auth: {
                        //the person who is sending mail
                        user: 'kazmihamza902@gmail.com', // generated ethereal user
                        pass: 'xxxxxxx' // generated ethereal password
                    }
                });
            
                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: 'localhost:3000', // sender address
                    to: user.email, // list of receivers
                    subject: 'Hello ✔', // Subject line
                    text: 'Hello<strong>'+user.fullName+'</strong>,<br><br>You recently requested you username. Please save it in your files:'+user.fullName, // plain text body
                    html:'Hello<strong>'+user.fullName+'</strong>,<br><br>You recently requested you username. Please save it in your files:'+user.fullName
                });
            
                console.log('Message sent: %s', info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    //             const testAccount = nodemailer.createTestAccount();
    //             var smtpTransport = nodemailer.createTransport({
    //                 host: "smtp.gmail.com",
    //                 port: 587,
    //                 secure: false,
    //                 auth: {
    //                     user: testAccount.user,
    //                     pass: testAccount.pass,
    //                 },
    //                 // tls:{
    //                 //     rejectUnauthorized:false
    //                 //   }
    //             });
    //             var mailOptions={
    //                 from:'kazmihamza902@gmail.com',
    //                 to: user.email,
    //                 subject:'Local host username request',
    //                 text:'Hello<strong>'+user.fullName+'</strong>,<br><br>You recently requested you username. Please save it in your files:'+user.fullName,
    //                 html:'Hello<strong>'+user.fullName+'</strong>,<br><br>You recently requested you username. Please save it in your files:'+user.fullName
    //              }
    //              //console.log(mailOptions);
    //              smtpTransport.sendMail(mailOptions, function(error, response){
    //              if(error){
    //                  console.log("ksjdlk");
    //              console.log(error);
    //             // res.end("error");
    //              }else{
    //              console.log("Message sent: " + response.message);
    //              console.log('Message sent: %s', response.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(response));
    //             // res.end("sent");
    //              }
                //  });
            }
        }
    });
}