<template>
  <div class="lend-wrapper">
    <Categoryfilter />
    <div class="lend-nfts">
      <template v-if="nfts">
        <div class="lend-nfts-item" v-for="nft of nfts" :key="nft.id">
          <NFT :nft="nft" />
          <el-button type="primary" @click="lendNFT(nft)">Lend</el-button>
        </div>
      </template>
      <template v-else>NO NFTs of this accounts</template>
    </div>

    <el-dialog
      class="lend-dialog"
      title="Lend your NFT"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      center
    >
      <div class="lend-dialog-desc">
        <div class="lend-desc-collection">
          {{ ((lendInfo.nft || {}).collection || {}).name || "NFT" }}
        </div>
        <div class="lend-desc-name">
          {{ (lendInfo.nft || {}).name || "No Name" }}
        </div>
      </div>

      <div class="lend-dialog-form">
        <el-form label-position="right" label-width="200px" :model="lendInfo">
          <el-form-item label="Collateral(ETH)">
            <el-input v-model="lendInfo.collateral" type="number"></el-input>
          </el-form-item>
          <el-form-item label="Daily Price(ETH)">
            <el-input v-model="lendInfo.dailyPrice" type="number"></el-input>
          </el-form-item>
          <el-form-item label="Max Duration(Dfays)">
            <el-input v-model="lendInfo.maxDuration" type="number"></el-input>
          </el-form-item>
          <el-form-item label="Fee">2.5%</el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="approveLend">Approve</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Categoryfilter from "../layouts/Categoryfilter.vue";
import NFT from "../../components/NFT.vue";

const OPENSEA_PREFIX =
  "https://api.opensea.io/api/v1/assets?limit=50&offset=0&owner=";
// "https://rinkeby-api.opensea.io/api/v1/assets?limit=50&offset=0&owner=";

export default {
  name: "Lend",
  components: { Categoryfilter, NFT },
  data() {
    return {
      dialogVisible: false,
      lendInfo: {
        nft: null,
        collateral: null,
        dailyPrice: null,
        maxDuration: null,
      },
      nfts: null,
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    fetchNFTs(account) {
      if (account) {
        fetch(OPENSEA_PREFIX + account)
          .then((res) => res.json())
          .then((data) => {
            this.nfts = data["assets"];
          });
      }
    },
    lendNFT(nft) {
      this.dialogVisible = true;
      this.lendInfo.nft = nft;
    },
    approveLend() {
      let nft = this.lendInfo.nft;
      let data = {
        tokenId: nft.token_id,
        token: nft.asset_contract.address,
        collateral: null,
        dailyPrice: null,
        maxDuration: null,
      };
      console.log("NFT", data);
      this.dialogVisible = false;
    },
    validateForm() {},
  },
  watch: {
    "$store.state.account": function (newVal) {
      if (newVal) {
        this.fetchNFTs(newVal);
      }
    },
  },
  mounted() {
    this.fetchNFTs(this.$store.state.account);
  },
};
</script>

<style lang="less">
@import "../../assets/global.less";

.lend-wrapper {
  background-color: @body-background-color;
  min-height: 800px;
  padding-top: 10px;
  padding: 10px 80px 0 80px;
  display: flex;
  flex-flow: row nowrap;
}

.lend-nfts {
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  justify-content: center;
  padding: 0;
  margin: 0;
  margin-top: 20px;
}

.lend-nfts-item {
  width: 200px;
  height: 300px;
  border: 1px solid @body-background-color;
  &:hover {
    border: 1px solid tomato;
  }

  .el-button--primary {
    display: block;
    width: 100%;
    margin: 0 auto;
    font-weight: bold;
    background-color: @button-background-color;
    border-color: @button-background-color;
    &:hover {
      background-color: @button-hover-color;
    }
  }
}

.lend-desc-collection {
  font-weight: bold;
  font-size: 20px;
}

.lend-dialog {
  .el-dialog__header {
  }

  .el-dialog__title {
    font-weight: bold;
    font-size: 25px;
  }
}

.lend-dialog-desc {
  text-align: center;
}

.lend-dialog-form {
  width: 80%;
  margin-top: 20px;
}
</style>
