module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("student", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file: {
        type:DataTypes.STRING,
        allowNull:true,
      },
      otp:{
        type:DataTypes.INTEGER,
        allowNull:true,
      }
    });
    return Student;
  };