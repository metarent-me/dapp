<template>
  <div class="rent-wrapper">
    <ContractFilter />
    <div class="rent-nfts">
      <div
        class="rent-nfts-item"
        v-for="nft of filteredNFTs"
        :key="nft.id"
        @click="gotoDetailOrReturn(nft)"
      >
        <NFT :nft="nft" />
        <div v-show="nft.isReturned == false">
          <el-button type="primary">Return</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContractFilter from "../layouts/ContractFilter.vue";
import NFT from "../../components/NFT.vue";
import { OPENSEA_MULTI_ASSET, Metarent } from "../../contracts/Metarent";

export default {
  name: "Rent",
  components: { ContractFilter, NFT },
  data() {
    return {
      nfts: [],
      fetched: false,
      filter: null,
    };
  },
  computed: {
    filteredNFTs() {
      let nfts = [];
      if (!this.filter) {
        return this.nfts;
      }
      console.log(this.filter);
      for (let i = 0; i < this.nfts.length; i++) {
        console.log(this.nfts[i].nftToken, this.filter.address);
        if (this.nfts[i].nftToken == this.filter.address) {
          nfts.push(this.nfts[i]);
        }
      }
      this.$forceUpdate();
      return nfts;
    },
  },
  methods: {
    async getRenting() {
      let account = this.$store.state.account;
      if (!account) {
        return;
      }
      return Metarent.methods
        .getRenting(account)
        .call({
          from: account,
        })
        .then((result) => {
          for (let i = 0; i < result.length; i++) {
            let nftToken = result[i]["nftToken"].toLowerCase();
            if (!result[i]["isReturned"]) {
              this.nfts.push({
                lender: result[i]["lender"],
                renter: result[i]["renter"],
                nftToken: nftToken,
                nftTokenId: result[i]["nftTokenId"],
                dailyRentPrice: result[i]["dailyRentPrice"],
                rentDuration: result[i]["rentDuration"],
                rentedAt: result[i]["rentedAt"],
                nftPrice: result[i]["nftPrice"],
                isReturned: result[i]["isReturned"],
              });
            }
          }
        });
    },
    async getLending() {
      let account = this.$store.state.account;
      if (!account) {
        return;
      }
      return Metarent.methods
        .getLending()
        .call({
          from: account,
        })
        .then((result) => {
          for (let i = 0; i < result.length; i++) {
            let nftToken = result[i]["nftToken"].toLowerCase();
            if (result[i]["rentable"]) {
              this.nfts.push({
                lender: result[i]["lender"],
                nftToken: nftToken,
                nftTokenId: result[i]["nftTokenId"],
                maxRentDuration: result[i]["maxRentDuration"],
                dailyRentPrice: result[i]["dailyRentPrice"],
                nftPrice: result[i]["nftPrice"],
                rentable: result[i]["rentable"],
              });
            }
          }
        });
    },
    fetchOpenseaAsset() {
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
          let _nfts = [];
          for (let i = 0; i < data.assets.length; i++) {
            let asset = data.assets[i];
            asset.nftToken = this.nfts[i].nftToken;
            asset.nftTokenId = this.nfts[i].nftTokenId;
            asset.lender = this.nfts[i].lender;
            asset.renter = this.nfts[i].renter;
            asset.maxRentDuration = this.nfts[i].maxRentDuration;
            asset.dailyRentPrice = this.nfts[i].dailyRentPrice;
            asset.nftToken = this.nfts[i].nftToken;
            asset.nftPrice = this.nfts[i].nftPrice;
            asset.rentable = this.nfts[i].rentable;
            asset.isReturned = this.nfts[i].isReturned;

            _nfts.push(asset);

            let contract = {};
            contract[asset.collection.name] = asset.asset_contract.address;
            this.$store.commit("addContracts", contract);
          }
          this.nfts = _nfts;
        });
    },
    gotoDetailOrReturn(nft) {
      if (nft.isReturned === false) {
        this.$router.push({
          name: "returnnft",
          params: { token: nft.asset_contract.address, tokenId: nft.token_id },
        });
      } else {
        this.$router.push({
          name: "rentdetail",
          params: { token: nft.asset_contract.address, tokenId: nft.token_id },
        });
      }
    },
    async fetchAllNFTs() {
      await this.getLending();
      await this.getRenting();
      this.fetchOpenseaAsset();
      this.$forceUpdate();
    },
  },

  watch: {
    "$store.state.account": function (newVal) {
      if (newVal) {
        if (!this.fetched) {
          this.fetchAllNFTs();
          this.fetched = true;
        }
      }
    },
    "$store.state.filter.name": {
      deep: true,
      handler() {
        console.log("filter", this.$store.state.filter.address);
        this.filter = this.$store.state.filter;
      },
    },
  },
  mounted() {
    // Clear the filter
    // this.$store.commit("setFilter", null);

    // Fetch NFTs
    if (!this.fetched) {
      if (this.$store.state.account) {
        this.fetchAllNFTs();
        this.fetched = true;
      }
    }
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
  gap: 5px;
  justify-content: start;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  align-content: flex-start;
}
.rent-nfts-item {
  width: 200px;
  height: 250px;
  border: 1px solid @body-background-color;
  padding-bottom: 60px;
  background-color: @card-gray-color;
  border-radius: 10px;

  &:hover {
    border: 1px solid tomato;
  }
  .el-button--primary {
    display: block;
    width: 100%;
    margin: 0 auto;
    font-weight: bold;
    margin-top: 7px;
    background-color: @button-background-color;
    border-color: @button-background-color;
    &:hover {
      background-color: @button-hover-color;
    }
  }
}
</style>
