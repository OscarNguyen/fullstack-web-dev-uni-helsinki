const jwt = require('jsonwebtoken');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  let token = null;
  console.log(req.method);
  if (authorization && authorization.startsWith('bearer')) {
    token = authorization.substring(7);
  }
  if (!token) {
    return res.status(401).json({ msg: 'invalid or missing token' });
  }
  req.token = token;
  next();
};

const userExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  let token = null;

  if (authorization && authorization.startsWith('bearer')) {
    token = authorization.substring(7);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    req.user = { username: decodedToken.username, name: decodedToken.name, id: decodedToken.id };
  } else{

    req.user = null;
  }

  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
