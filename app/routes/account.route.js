module.exports = (app) => {
    const account = require('../controllers/account.controller.js');
    app.post('/register', account.register);
    app.post('/login' , account.login)
    app.get('/user-info', verifyToken, account.userInfo);

    function verifyToken(req, res, next) {
    	const bearerHeader = req.headers['authorization'];
    	if(typeof bearerHeader !== 'undefined') {
    		req.token = bearerHeader;
    		next();
    	} else {
    		res.status(403).send({
    			message : "Cần truyền json web token"
    		});
    	}
    }
}