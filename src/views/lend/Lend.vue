<template>
  <div class="lend-wrapper">
    <Categoryfilter />
    <div class="lend-nfts">
      <template v-if="nfts">
        <div class="lend-nfts-item" v-for="nft of nfts" :key="nft.id">
          <NFT :nft="nft" />
          <el-button type="primary" @click="lendNFT(nft)">{{
            lendStatus(nft)
          }}</el-button>
        </div>
      </template>
      <template v-else-if="nfts !== null">Loading NFTs</template>
      <template v-else>No NFTs</template>
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
import Web3 from "web3";
import Categoryfilter from "../layouts/Categoryfilter.vue";
import NFT from "../../components/NFT.vue";
import {
  METARENT_CONTRACT,
  OPENSEA_PREFIX,
  METARENT_ABI,
} from "../../contracts/Metarent";

export default {
  name: "Lend",
  components: { Categoryfilter, NFT },
  data() {
    return {
      contract: null,
      web3: null,
      dialogVisible: false,
      lendInfo: {
        nft: null,
        collateral: null,
        dailyPrice: null,
        maxDuration: null,
      },
      nfts: null,
      contractLendings: null,
    };
  },
  methods: {
    lendStatus(nft) {
      if (nft.rentable == false) {
        return "Alread Lended";
      }
      return "Lend";
    },
    handleClose() {
      this.dialogVisible = false;
    },
    fetchNFTs(account) {
      if (account) {
        fetch(OPENSEA_PREFIX + account)
          .then((res) => res.json())
          .then((data) => {
            this.nfts = data["assets"];
            this.fetchContractLendings();
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
      this.invokeContract();
      this.dialogVisible = false;
    },
    invokeContract() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        this.web3 = window.web3;
      }
      const nft = this.lendInfo.nft;
      const Metarent = new this.web3.eth.Contract(
        METARENT_ABI.abi,
        METARENT_CONTRACT
      );
      console.log("xxx", nft.asset_contract.address);
      Metarent.methods
        .setLending(
          nft.asset_contract.address,
          this.web3.eth.abi.encodeParameter("uint256", nft.token_id),
          this.web3.eth.abi.encodeParameter("uint256", "3"),
          this.web3.eth.abi.encodeParameter("uint256", "4"),
          this.web3.eth.abi.encodeParameter("uint256", "2")
        )
        .send({
          from: this.$store.state.account,
          to: METARENT_CONTRACT,
          value: 100000000000000000,
          gasPrice: "2000000000",
        })
        .then((result) => {
          console.log(result);
        });
    },
    initContract() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        this.web3 = window.web3;
      }
      this.contract = new this.web3.eth.Contract(
        METARENT_ABI.abi,
        METARENT_CONTRACT
      );
    },
    fetchContractLendings() {
      this.contract.methods
        .getLending()
        .call({
          from: this.$store.state.account,
          to: METARENT_CONTRACT,
        })
        .then((result) => {
          console.log("fetchContractLendings", result);
          let nfts = [];
          for (let i = 0; i < result.length; i++) {
            let lend = {
              lender: result[i]["lender"],
              nftToken: result[i]["nftToken"],
              nftTokenId: result[i]["nftTokenId"],
              maxRentDuration: result[i]["maxRentDuration"],
              dailyRentPrice: result[i]["dailyRentPrice"],
              nftPrice: result[i]["nftPrice"],
              rentable: result[i]["rentable"],
            };
            nfts.push(lend);
            console.log(lend.nftToken, lend.nftTokenId);

            for (let j = 0; j < this.nfts.length; j++) {
              let nft = this.nfts[j];
              console.log(
                nft.token_id.toLowerCase(),
                nft.asset_contract.address.toLowerCase()
              );
              if (
                nft.token_id.toLowerCase() == lend.nftTokenId.toLowerCase() &&
                nft.asset_contract.address.toLowerCase() ==
                  lend.nftToken.toLowerCase()
              ) {
                console.log("xxx,", nft);
                this.nfts[j].lender = lend.lender;
                this.nfts[j].nftToken = lend.nftToken;
                this.nfts[j].nftTokenId = lend.nftTokenId;
                this.nfts[j].maxRentDuration = lend.maxRentDuration;
                this.nfts[j].dailyRentPrice = lend.dailyRentPrice;
                this.nfts[j].nftPrice = lend.nftPrice;
                this.nfts[j].rentable = lend.rentable;
              }
            }
          }
          this.contractLendings = nfts;
        });
    },
  },
  watch: {
    "$store.state.account": function (newVal) {
      if (newVal) {
        this.fetchNFTs(newVal);
      }
    },
  },
  mounted() {
    this.initContract();
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
