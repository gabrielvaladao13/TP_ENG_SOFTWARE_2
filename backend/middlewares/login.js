const jwt = require('jsonwebtoken');
const passport = require('passport');
const {verify} = require('jsonwebtoken');

function loginMiddleware(req, res, next) {
  passport.authenticate(
    'login',
    (err, user, info) => {
      try {
        if (err) {
          return next(err);
        }

        req.login(
          user,
          {session: false},
          (error) => {
            if (error) next(error);

            const body = {
              id: user.id,
              role: user.role,
            };

            const token = jwt.sign({user: body}, 'mysecretkey',
              {expiresIn: '15d'});

            res.cookie('jwt', token, {
              httpOnly: true
              //secure: 'development' = 'production',
            });

            res.status(204).end();
          },

        );
      } catch (error) {
        next(error);
      }
    },
  )(req, res, next);
};
function cookieExtractor(req) {
    let token = null;
  
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
  
    return token;
  }
function jwtMiddleware(req, res, next) {
    try {
      const token = cookieExtractor(req);
      if (token) {
        const decoded = verify(token,'mysecretkey');
        req.user = decoded.user;
      }
  
      if (!req.user) {
        throw new Error(
          'Você precisa estar logado para realizar essa ação!');
      }
      next();
    } catch (error) {
      next(error);
    }
  }
function notLoggedIn(req, res, next) {
    const token = req.cookies['jwt'];
    if (token) {
      jwt.verify(token, 'mysecretkey', (err, decoded) => {
        if (!(err instanceof jwt.TokenExpiredError)) {
          res.status(400).send('Voce ja esta logado no sistema');
        }
      });
    }
  
  next();
  };

module.exports = {
    loginMiddleware,
    jwtMiddleware,
    notLoggedIn
  };