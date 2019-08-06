const jwt = require('jsonwebtoken');

exports.newJwt = (user, type) => {
    const token = jwt.sign({
            name: user.name,
            id: user.id,
            number: user.number,
            type: type,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '60m',
        });
    return token;
};

exports.jwtVerify = async (req) => {
    let header = req.headers['token'];
    let token = await jwt.verify(header, process.env.JWT_SECRET);
    return token;
};
