<template>
  <div class="return-nft-wrapper">
    <div class="return-nft-title">
      <div class="return-nft-img-container">
        <img
          class="return-nft-img"
          :src="nft.image_url || defaultImg"
          alt="NFT"
        />
        <div class="return-nft-contract">Contract: {{ contractAddress }}</div>
        <el-button type="primary" @click="returnNFT()" :loading="buttonLoading"
          >Return</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import {
  OPENSEA_SINGLE_ASSET,
  ERC721_ABI,
  METARENT_CONTRACT,
  Metarent,
} from "../../contracts/Metarent";

export default {
  name: "ReturnNFT",
  computed: {
    contractAddress: function () {
      let address = (this.nft.asset_contract || {}).address;
      if (address) {
        return address.slice(0, 8) + "..." + address.slice(-8);
      }
      return "...";
    },
  },
  data() {
    return {
      web3: null,
      token: null,
      tokenId: null,
      nft: {},
      buttonLoading: false,
      approved: false,
      defaultImg: "https://testnets.opensea.io/static/images/placeholder.png",
    };
  },
  methods: {
    async NFTApprove(token, tokenId) {
      this.buttonLoading = true;
      this.approved = false;

      const NFT = new window.web3.eth.Contract(ERC721_ABI.abi, token);
      return await NFT.methods
        .approve(METARENT_CONTRACT, tokenId)
        .send({
          from: this.$store.state.account,
        })
        .then((result) => {
          console.log("result", result);
          this.approved = true;
          this.$message({
            message: "Lend NFT success!",
            type: "success",
          });
          return true;
        })
        .catch(() => {
          this.$message({
            message: "Metamask invoke failed",
            type: "error",
          });
          return false;
        });
    },
    async returnNFT() {
      // NFT Approve
      this.buttonLoading = true;
      let approveSuccess = await this.NFTApprove(this.token, this.tokenId);
      if (!approveSuccess) {
        this.buttonLoading = false;
        return;
      }

      // Do returnNFT
      await Metarent.methods
        .returnRent(this.token, this.tokenId)
        .send({
          from: this.$store.state.account,
          to: METARENT_CONTRACT,
        })
        .then((result) => {
          console.log("REturn rent result", result);

          this.dialogVisible = false;

          this.$message({
            message: "Return rent success!",
            type: "success",
          });
        })
        .catch(() => {
          this.$message({
            message: "Metamask invoke failed",
            type: "error",
          });
        });

      this.buttonLoading = false;
    },
  },
  mounted() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      this.web3 = window.web3;
    }
    this.token = this.$route.params.token;
    this.tokenId = this.$route.params.tokenId;

    fetch(OPENSEA_SINGLE_ASSET + `${this.token}/${this.tokenId}`)
      .then((res) => res.json())
      .then((data) => {
        this.nft = data;
        // this.getLending();
      });
  },
};
</script>

<style lang="less">
@import "../../assets/global.less";
.return-nft-wrapper {
  height: 1200px;
  display: flex;
  justify-content: center;
}
.return-nft-img-container {
  margin-top: 20px;
  height: 400px;
  width: 300px;
  border: 1px solid @body-background-color;

  .el-button--primary {
    display: block;
    width: 100%;
    margin: 0 auto;
    margin-top: 30px;
    font-weight: bold;
    background-color: @button-background-color;
    border-color: @button-background-color;
    &:hover {
      background-color: @button-hover-color;
    }
  }
}
.return-nft-img {
  display: inlin-block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.return-nft-contract {
  margin-top: 10px;
}
</style>
