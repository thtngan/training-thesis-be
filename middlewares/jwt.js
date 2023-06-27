const jwt = require('jsonwebtoken');
const config = require('config');

const signJwt = (payload, options = {}) => {
  const privateKey = Buffer.from(
    config.get('accessTokenPrivateKey'),
    'base64'
  ).toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

const verifyJwt = (token) => {
  try {
    const publicKey = Buffer.from(
      config.get('accessTokenPublicKey'),
      'base64'
    ).toString('ascii');
    return jwt.verify(token, publicKey);
  } catch (error) {
    return null;
  }
};

module.exports = {
  signJwt,
  verifyJwt,
};
