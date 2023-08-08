import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import colors from "colors";

const hashPassword = async (password) => {
  try {
    //salt round
    const saltRound = 10;
    //hash password with salt round 10
    const hashedPassword = await bcrypt.hash(password, saltRound);
    //return hashed password
    return hashedPassword;
  } catch (error) {
    console.log(`error while password hashing ${error}`);
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log(`error while comparing password ${error}`);
  }
};

export { hashPassword, comparePassword };
