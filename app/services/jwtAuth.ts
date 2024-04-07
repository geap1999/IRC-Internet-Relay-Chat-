const jwt = require('jsonwebtoken');

export async function generateAccessToken(email: string) {
  try {
    const token = await jwt.sign({email}, process.env.ACCES_TOKEN_SECRET);
    return token;

  } catch(error){
    console.log("Error :", error);
    return {status: 500, message: "Internal Server Error"};
  }
};