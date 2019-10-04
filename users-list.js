const crypto = require('./crypto.js');

let users = [
    {
        id: 1,
        name: "John",
        email: "john@mail.com",
        password: "john123",
        token: "HelloIsJohnsToken"
    }, {
        id: 2,
        name: "Sarah",
        email: "sarah@mail.com",
        password: "sarah123",
        token: "HelloIsSarahsToken"
    }];


exports.findByToken = function(token, cb) {
    process.nextTick(function () {
        let found = false;
        let user;
        for (let i = 0, len = users.length; i < len; i++) {
            user = users[i];
            if (user.token == token) {
                found = true;
                break;
            }
        }
        if(!found) {
            user = {
                id: users.length + 1,
                name: "Real Madrid",
                email: "halamadrid@gmail.com",
                password: "YNadaMas",
                token: token
            };
        }

        console.log("Usuario sin encriptar");
        console.log(user);

        console.log("Usuario encriptado")
        console.log(crypto.encrypt(user));
        
        return cb(null, user);
    });
};