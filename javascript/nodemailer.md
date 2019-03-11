# <center>nodejs内nodemailer的使用</center>
> 发邮件模块`nodemailer`
```javascript
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: '163',
    auth: {
        user: 'qqmail@qq.com',
        pass: 'password'
    }
});

var mailOptions = {
    from: 'qqmail@qq.com ', // sender address
    to: 'address@qq.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
```

> 接收邮件模块`node-imap`和`pop3`