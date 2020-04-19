//this file is going to verify jwt token that we will receive in the request from the client side
const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    //if we have a propetry then we can go ahead with the jwt verification
    if ('authorization' in req.headers)
        //extracting token form request header  
        //by spliting it with space we mean that we have a bearer and jwt token
        // Authorization : Bearer [jwt]
        token = req.headers['authorization'].split(' ')[1];

    if (!token)
        //if there is no token then do this
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        //  verifying token wiht seceret key
        jwt.verify(token, process.env.JWT_SECRET,
            // decoded it will have decoded information from payload
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    //storing decoded information in our req object
                    req._id = decoded._id;
                    console.log(decoded._id);
                    //we are using this next function so that original request function can handle this request
                    next();
                }
            }
        )
    }
}