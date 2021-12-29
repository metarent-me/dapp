<template>
  <div class="rent-wrapper">
    <Categoryfilter />
    <div class="rent-nfts">
      <div
        class="rent-nfts-item"
        v-for="nft of nfts"
        :key="nft.id"
        @click="gotoDetail(nft)"
      >
        <NFT :nft="nft" />
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import Categoryfilter from "../layouts/Categoryfilter.vue";
import NFT from "../../components/NFT.vue";
import {
  OPENSEA_MULTI_ASSET,
  METARENT_CONTRACT,
  METARENT_ABI,
} from "../../contracts/Metarent";

export default {
  name: "Rent",
  components: { Categoryfilter, NFT },
  data() {
    return {
      nfts: null,
    };
  },
  methods: {
    getLending() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        this.web3 = window.web3;
      }
      const Metarent = new this.web3.eth.Contract(
        METARENT_ABI.abi,
        METARENT_CONTRACT
      );
      Metarent.methods
        .getLending()
        .call({
          from: this.$store.state.account,
        })
        .then((result) => {
          let nfts = [];
          for (let i = 0; i < result.length; i++) {
            nfts.push({
              lender: result[i]["lender"],
              nftToken: result[i]["nftToken"],
              nftTokenId: result[i]["nftTokenId"],
              maxRentDuration: result[i]["maxRentDuration"],
              dailyRentPrice: result[i]["dailyRentPrice"],
              nftPrice: result[i]["nftPrice"],
              rentable: result[i]["rentable"],
            });
          }
          this.nfts = nfts;
          this.fetchOpenseaAsset();
        });
    },
    fetchOpenseaAsset() {
      let nfts = [];
      let url = OPENSEA_MULTI_ASSET + "?";
      for (let i = 0; i < this.nfts.length; i++) {
        let nft = this.nfts[i];
        let token = nft.nftToken;
        let tokenId = nft.nftTokenId;
        url = url + `asset_contract_addresses=${token}&token_ids=${tokenId}&`;
      }
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          for (let i = 0; i < data.assets.length; i++) {
            nfts.push(data.assets[i]);
          }
        });
      this.nfts = nfts;
    },
    gotoDetail(nft) {
      this.$store.commit("setNFTDetail", nft);
      this.$router.push({
        name: "rentdetail",
        params: { token: nft.asset_contract.address, tokenId: nft.token_id },
      });
    },
  },
  watch: {
    "$store.state.account": function (newVal) {
      if (newVal) {
        console.log("account", newVal);
        this.getLending();
      }
    },
  },
  mounted() {
    this.getLending();
  },
};
</script>

<style lang="less">
@import "../../assets/global.less";

.rent-wrapper {
  background-color: @body-background-color;
  min-height: 800px;
  padding-top: 10px;
  padding: 10px 80px 0 80px;
  display: flex;
  flex-flow: row nowrap;
}

.rent-nfts {
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  // justify-content: flex-start;
  justify-content: center;
  padding: 0;
  margin: 0;
  margin-top: 20px;
}

.rent-nfts-item {
  width: 200px;
  height: 250px;
  border: 1px solid @body-background-color;
  // margin-bottom: 30px;
  &:hover {
    border: 1px solid tomato;
  }
}
</style>
