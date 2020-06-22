const Account = require('../models/account.model.js');
const jwt = require('jsonwebtoken');
const privateKey = 'hhdgsfhjdsfhj';

exports.register = async (req, res) => {
	if(!req.body) {
        return res.status(400).send({
            message: "Trang yêu cầu nội dung!"
        });
    }

    checkUserExist = await Account.exists({email : req.body.email})
	if(checkUserExist) return res.status(500).send({
		message : "Email đã tồn tại"
	});

    const account = new Account({
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname || "",
        address: req.body.address || ""
    });

	account.save()
    .then(data => {
        token = jwt.sign({user : account} , privateKey)
        res.send({
            token : token
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message +  "\nĐã có lỗi xảy ra trong quá trình tạo tài khỏan, vui lòng thử lại"
        });
    });
	
};

exports.login = async (req, res) => {
	if(!req.body) {
        return res.status(400).send({
            message: "Trang yêu cầu nội dung!"
        });
    }
	user = await Account.findOne({email : req.body.email, password: req.body.password});
	// login faild 
	if(!user) return res.status(400).send({
		message : "Tài khoản hoặc mật khẩu không hợp lệ"
	});
	token = jwt.sign({user : user} , privateKey)
	return res.status(200).send({
		token : token,
		message : "Đăng nhập thành công!",
	    email : user.email,
        fullName : user.fullname,
        address : user.address,
    });
};

exports.update = (req, res) => {
};

exports.userInfo = (req, res) => {
	try {
		jwtVr = jwt.verify(req.token, privateKey.toString('base64'));
		return res.status(200).send({
            message : "Đăng nhập thành công!",
            email : jwtVr.user.email,
            fullname : jwtVr.user.fullname,
            address : jwtVr.user.address,
        });
	} catch {
		return res.status(403).send({
			message : "Token không hợp lệ"
		});
	};
};

// https://mongoosejs.com/docs/validation.html#validation # validation model
// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/ #create api with node