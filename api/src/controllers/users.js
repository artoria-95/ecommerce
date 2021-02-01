const { User, Review, Product } = require('../db');

const createOne = (avatar, firstName, lastName, birthdate, password, googleId) => {
  return new Promise((resolve, reject) => {
    // Verifica si hay password y el password tiene un espacio, envia un mensaje que la contraseña no puede tener espacios en blanco
    if (password && password.includes(" ")) {
      return reject({
        error: {
          message: "La contraseña no puede tener espacios en blanco"
        },
      });
    }

    User.create({ avatar, firstName, lastName, birthdate, password, googleId })
      .then((user) => {
        return user;
      })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};

const getOneByGoogleId = async (googleId) => {
  try {
    const user = User.findOne({
      where: { 
        googleId 
      },
      include: [{
        model: Review,
        include: Product
      }],      
    });
    return user;
  } catch (error) {
    return error;
  }
}

const getOneByFacebookId = async (facebookId) => {
  try {
    const user = User.findOne({
      where: {
        facebookId
      },
      include: [{
        model: Review,
        include: Product
      }],
    });
    return user;
  } catch (error) {
    return error;
  }
};

const getOneByInstagramId = async (facebookId) => {
  try {
    const user = User.findOne({
      where: {
        instagramId
      },
      include: [{
        model: Review,
        include: Product
      }],
    });
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getOneByGoogleId,
  getOneByFacebookId,
  getOneByInstagramId,
  createOne
}