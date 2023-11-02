const jwt = require('jsonwebtoken');
const passport = require('passport');
const { verify } = require('jsonwebtoken');

// Middleware para autenticar o usuário
function loginMiddleware(req, res, next) {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      return next(err);
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        return next(error);
      }

      const body = {
        id: user.id,
        role: user.role,
      };

      const token = jwt.sign({ user: body }, 'mysecretkey', { expiresIn: '15d' });

      res.cookie('jwt', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
      });

      res.status(204).end();
    });
  })(req, res, next);
}

function cookieExtractor(req) { 
  let token = null; 
 
  if (req && req.cookies) { 
    token = req.cookies['jwt']; 
  } 
 
  return token; 
} 

// Middleware para verificar o token JWT
function jwtMiddleware(req, res, next) {
  try {
    const token = cookieExtractor(req);

    if (!token) {
      throw new Error('Você precisa estar logado para realizar essa ação!');
    }

    const decoded = verify(token, 'mysecretkey');
    req.user = decoded.user;

    next();
  } catch (error) {
    next(error);
  }
}

// Middleware para verificar se o usuário não está logado
function notLoggedIn(req, res, next) {
  const token = req.cookies['jwt'];

  if (token) {
    jwt.verify(token, 'mysecretkey', (err, decoded) => {
      if (!(err instanceof jwt.TokenExpiredError)) {
        return res.status(400).send('Você já está logado no sistema');
      }
    });
    
  }

  next();
}

// Middleware para verificar se o usuário é admin
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  res.status(401).send('Você não tem permissão para realizar essa ação!');
}

module.exports = {
  loginMiddleware,
  jwtMiddleware,
  notLoggedIn,
  isAdmin,
};
