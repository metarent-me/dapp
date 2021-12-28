const METARENT_CONTRACT = "0xF51B296B45A9cC000987262b5496dc552d70C2dB";
const METARENT_ABI = require("./Metarent.json");
const OPENSEA_PREFIX =
  // "https://api.opensea.io/api/v1/assets?limit=50&offset=0&owner=";
  "https://rinkeby-api.opensea.io/api/v1/assets?limit=50&offset=0&owner=";
const OPENSEA_SINGLE_ASSET = "https://rinkeby-api.opensea.io/api/v1/asset/";
export {
  METARENT_CONTRACT,
  OPENSEA_PREFIX,
  OPENSEA_SINGLE_ASSET,
  METARENT_ABI,
};
