import Web3 from "web3";

const METARENT_CONTRACT = "0xa37Ccbd7173e2E8E09f8D9752766687A1AC03974";
const METARENT_ABI = require("./abi/Metarent.json");
const ERC721_ABI = require("./abi/ERC721ABI.json");
const OPENSEA_PREFIX =
  // "https://api.opensea.io/api/v1/assets?limit=50&offset=0&owner=";
  "https://rinkeby-api.opensea.io/api/v1/assets?limit=50&offset=0&owner=";
const OPENSEA_SINGLE_ASSET = "https://rinkeby-api.opensea.io/api/v1/asset/";
const OPENSEA_MULTI_ASSET = "https://rinkeby-api.opensea.io/api/v1/assets/";

if (window.ethereum) {
  // TODO: Refactor
  // https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable();
}
const Metarent = new window.web3.eth.Contract(
  METARENT_ABI.abi,
  METARENT_CONTRACT
);

const toWei = Web3.utils.toWei;

export {
  METARENT_CONTRACT,
  OPENSEA_PREFIX,
  OPENSEA_SINGLE_ASSET,
  OPENSEA_MULTI_ASSET,
  METARENT_ABI,
  ERC721_ABI,
  Metarent,
  toWei,
};
