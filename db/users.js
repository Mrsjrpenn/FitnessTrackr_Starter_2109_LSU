const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password)
    VALUES($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username;
    `,
      [username, hashedPassword]
    );
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username = $1
    `,
      [username]
    );
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
 SELECT id,username
 FROM users
 WHERE id=${userId}`);
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username=$1
    `,
      [userName]
    );
    delete user.password
    return user
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
