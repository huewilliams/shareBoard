const jwt = require('jsonwebtoken');

exports.newJwt = (user, type) => {
    const token = jwt.sign({
            name: user.name,
            number: user.number,
            type: type,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '60m',
        });
    return token;
};
