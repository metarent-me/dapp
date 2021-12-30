const METARENT_CONTRACT = "0xa37Ccbd7173e2E8E09f8D9752766687A1AC03974";
const METARENT_ABI = require("./Metarent.json");
const OPENSEA_PREFIX =
  // "https://api.opensea.io/api/v1/assets?limit=50&offset=0&owner=";
  "https://rinkeby-api.opensea.io/api/v1/assets?limit=50&offset=0&owner=";
const OPENSEA_SINGLE_ASSET = "https://rinkeby-api.opensea.io/api/v1/asset/";
const OPENSEA_MULTI_ASSET = "https://rinkeby-api.opensea.io/api/v1/assets/";
export {
  METARENT_CONTRACT,
  OPENSEA_PREFIX,
  OPENSEA_SINGLE_ASSET,
  OPENSEA_MULTI_ASSET,
  METARENT_ABI,
};
