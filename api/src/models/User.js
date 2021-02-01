const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {


  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: true,
      unique: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    changePassword: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.TEXT,
      isUrl: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^([a-zA-ZñÑáéíóúÁÉÍÓÚ_-])+((\s*)+([a-zA-ZñÑáéíóúÁÉÍÓÚ_-]*)*)+$/,
        len: [2, 40]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^([a-zA-ZñÑáéíóúÁÉÍÓÚ_-])+((\s*)+([a-zA-ZñÑáéíóúÁÉÍÓÚ_-]*)*)+$/,
        len: [2, 40]
      }
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      isDate: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {//metodo de sequelize que recibe el valor del password ingresado por el usuario
        if (value) {//esto es por si el usuario no se loguea con password
          //hashea el password antes de guardarlo en la base de datos

          const salt = bcrypt.genSaltSync(10); //el salt se genera y se utiliza sin almacenarse
          const hash = bcrypt.hashSync(value, salt);//con esta funcion hasheamos el password(value)
          this.setDataValue('password', hash);//almacenamos el valor de pasword en la base de datos
        }
      },

      // get() {
      //   return () => this.getDataValue('password');
      // },
    },

    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    instagramId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    }
  });


  //bcrypt tiene un metodo para verificar el usuario
  //esta funcion de comparacion la agregamos al prototype del modelo User
  //no utilizamos arrow function
  User.prototype.compare = function (pass) {
    //recibe un pasword y lo compara con el almacenado en la base de datos
    return bcrypt.compareSync(pass, this.password);//retorna un valor Boleano
  };
  return User;
};