let express = require('express');
let router = express.Router();

// curl -v -H "Authorization: Bearer HelloIsJohnsToken" http://localhost:8080/api/v1/users

/* GET users listing. */
router.get('/', function (req, res) {
    res.json({name: req.user.name, email: req.user.email});
});

/* GET users listing w/ API Key */
/*
router.get('/', function (req, res) {
    let apikey = req.query.apikey;
    console.log(apikey);
    if (apikey === "123456789") {
        res.send({name: "Test", email: "Test"});
    } else {
        res.sendStatus(401);
    }
});
*/

module.exports = router;
