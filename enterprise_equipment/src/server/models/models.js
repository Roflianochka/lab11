const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "First name cannot be empty",
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Last name cannot be empty",
      },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Phone cannot be empty",
      },
    },
  },
  hourlyRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Hourly rate cannot be empty",
      },
    },
  },
});

const CommissionMember = sequelize.define("CommissionMembers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Image URL cannot be empty",
      },
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Name cannot be empty",
      },
    },
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Surname cannot be empty",
      },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Phone cannot be empty",
      },
    },
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Experience cannot be empty",
      },
    },
  },
});

const Commission = sequelize.define("Commissions", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Commission name cannot be empty",
      },
    },
  },
});
const User = sequelize.define("User", {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  bio: {
    type: DataTypes.TEXT,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 255],
    },
  },
});
Commission.hasMany(CommissionMember, { as: "members" });
CommissionMember.belongsTo(Commission);

module.exports = {
  Employee,
  CommissionMember,
  Commission,
  User,
};
