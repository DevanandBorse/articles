require("dotenv").config();

module.exports = {
  name: "bitcodeprojectapis",
  hostname: "https://bitcode.in",
  encryptionKey: "#@EDOCTIB@#",
  version: "0.0.1",
  env: process.env.NODE_ENV || "production",
  port: process.env.PORT || 3000,

  errCodeError: -1,
  errCodeNoRecordFound: 1,
  errCodeSuccess: 0,

  tokenExpiryTime: process.env.tokenExpiryTime,
};
