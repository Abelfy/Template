let bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User=sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val){
        if (val !== null) this.setDataValue('pwd', bcrypt.hashSync(val, 10));
      }
    },
    genre: {
      type: DataTypes.STRING
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nomNaissance: {
      type: DataTypes.STRING
    },
    telPort: {
      type: DataTypes.STRING
    },
    type:{
      type: DataTypes.STRING,
    },
    forceChangePwd:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName:'coordination_user'
  });

  User.prototype.checkPwd = function(password){
    return bcrypt.compareSync(password, this.getDataValue('pwd'));
  }

  return User

}
