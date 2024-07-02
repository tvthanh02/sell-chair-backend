const { Op } = require("sequelize");
const db = require("../models");

const { createAccessToken, createRefreshToken } = require("../utils/jwt");

const getCurrentUser = async (userId) => {
  return await db.User.findOne({
    where: { id: userId },
    attributes: { exclude: ["accountId", "roleId"] },
  });
};

const register = async (fields) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    address,
    account,
    password,
    roleId = "405161e6-0a55-4248-91b9-1096516c3dc2",
  } = fields;

  const transaction = await db.sequelize.transaction();
  try {
    const newAccount = await db.Account.create(
      {
        account: account,
        password: password,
      },
      { transaction: transaction }
    );

    await db.User.create(
      {
        firstName: firstName,
        middleName,
        lastName,
        email,
        phone,
        address,
        accountId: newAccount.id,
        roleId,
      },
      { transaction: transaction }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
  }
};

const login = async (fields) => {
  const { account, password } = fields;
  let result = [];

  // find account with where??

  const loginAccount = await db.Account.findOne({
    where: {
      [Op.and]: [{ account: account }, { password: password }],
    },
  });

  if (loginAccount && loginAccount?.id) {
    // get payload
    const user = await db.User.findOne({
      where: {
        accountId: {
          [Op.eq]: loginAccount.id,
        },
      },
      attributes: ["id"],
    });

    if (user) {
      // create accessToken
      const accessToken = createAccessToken({ uid: user.id });

      //create RefreshToken
      const refreshToken = createRefreshToken({ uid: user.id });

      if (accessToken && refreshToken) {
        result = [accessToken, refreshToken];
      }
    }
  }

  return result;
};

const logout = async (fields) => {
  const { accessToken, refreshToken } = fields;
  try {
    await Promise.all([
      db.AccessTokenBlacklist.create({ token: accessToken }),
      db.RefreshTokenBlacklist.create({ token: refreshToken }),
    ]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCurrentUser,
  register,
  login,
  logout,
};
