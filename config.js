const mysql = require("mysql");

function getValue(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;

  if (!value) {
    throw new Error("There is no value in Process variable");
  } else {
    return value;
  }
}

export const config = {
  db: {
    database: this.getValue("DB_DATABASE", "SE7EN_11"),
    host: this.getValue(
      "DB_HOST",
      "express-database.czxle6g1zlfk.ap-northeast-2.rds.amazonaws.com"
    ),
    username: this.getValue("DB_USERNAME", "chocoj1123"),
    password: this.getValue("DB_PASSWORD", "wkdtlgns940225!!"),
  },
  jwt: {
    secretKey: this.getValue(
      "JWT_SECRET_KEY",
      "gMhHLk&9dzpv$4#rP!3NdAr00gTq3$SS"
    ),
    expiresIn: this.getValue("JWT_EXPIRES_IN", "1h"),
  },
  server: {
    port: Number(getValue("PORT", 8080)),
  },
};
