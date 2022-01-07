<template>
  <div class="lend-wrapper">
    <ContractFilter />
    <div class="lend-nfts">
      <template v-if="nfts">
        <div class="lend-nfts-item" v-for="nft of nfts" :key="nft.id">
          <NFT :nft="nft" />
          <el-button type="primary" @click="lendNFT(nft)">{{
            nft.rentable === true ? "Already Lended" : "Lend"
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
            <el-input
              v-model="lendInfo.dailyRentPrice"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="Max Duration(Days)">
            <el-input v-model="lendInfo.maxDuration" type="number"></el-input>
          </el-form-item>
          <el-form-item label="Fee">2.5% from earnings</el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="approveLend"
          :loading="approveButtonLoading"
          >Approve</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Web3 from "web3";
import ContractFilter from "../layouts/ContractFilter.vue";
import NFT from "../../components/NFT.vue";
import {
  METARENT_CONTRACT,
  OPENSEA_PREFIX,
  METARENT_ABI,
  ERC721_ABI,
} from "../../contracts/Metarent";

export default {
  name: "Lend",
  components: { ContractFilter, NFT },
  data() {
    return {
      contract: null,
      web3: null,
      dialogVisible: false,
      approveButtonLoading: false,
      lendInfo: {
        nft: null,
        collateral: null,
        dailyRentPrice: null,
        maxDuration: null,
      },
      nfts: [],
      contractLendings: null,
      filter: null,
    };
  },
  computed: {
    filteredNFTs() {
      let nfts = [];
      if (!this.filter) {
        return this.nfts;
      }
      for (let i = 0; i < this.nfts.length; i++) {
        if (this.nfts[i].nftToken == this.filter.address) {
          nfts.push(this.nfts[i]);
        }
      }
      this.$forceUpdate();
      return nfts;
    },
  },
  methods: {
    lendStatus(nft) {
      if (nft.rentable == false) {
        return "Rented";
      } else if (nft.rentable == true) {
        return "Already Lented";
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

            // Update the category filters
            for (let i = 0; i < data.assets.length; i++) {
              let contract = {};
              let asset = data.assets[i];
              contract[asset.collection.name] = asset.asset_contract.address;
              this.$store.commit("addContracts", contract);
            }
          });
      }
    },
    lendNFT(nft) {
      if (nft.rentable) {
        alert("This NFT had been already lended");
      } else {
        this.dialogVisible = true;
        this.lendInfo.nft = nft;
      }
    },
    approveLend() {
      this.invokeContract();
    },
    checkNFTApprove(tokenId) {
      console.log(tokenId);
      // contract.functions.allowance(alice, bob).call()
    },
    async NFTApprove(token, tokenId) {
      this.lendInfo.approved = false;
      const NFT = new this.web3.eth.Contract(ERC721_ABI.abi, token);
      return await NFT.methods
        .approve(METARENT_CONTRACT, tokenId)
        .send({
          from: this.$store.state.account,
        })
        .then((result) => {
          console.log("result", result);
          this.lendInfo.approved = true;
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
    async invokeContract() {
      this.approveButtonLoading = true;

      // Check input value
      let dailyRentPrice = this.lendInfo.dailyRentPrice;
      let collateral = this.lendInfo.collateral;
      let maxDuration = this.lendInfo.maxDuration;
      if (!(dailyRentPrice && collateral && maxDuration)) {
        alert("Invalid Lending params");
        this.approveButtonLoading = false;
        return;
      }

      // Init web3
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

      // NFT Approve
      let approveSuccess = await this.NFTApprove(
        nft.asset_contract.address,
        nft.token_id
      );
      if (!approveSuccess) {
        this.approveButtonLoading = false;
        return;
      }

      // Do setLending
      await Metarent.methods
        .setLending(
          nft.asset_contract.address,
          nft.token_id,
          maxDuration,
          Web3.utils.toWei(dailyRentPrice),
          Web3.utils.toWei(collateral)
        )
        .send({
          from: this.$store.state.account,
          to: METARENT_CONTRACT,
          gasPrice: "2000000000",
        })
        .then((result) => {
          console.log("setLending result", result);

          this.dialogVisible = false;

          this.$message({
            message: "Lend NFT success!",
            type: "success",
          });
        })
        .catch(() => {
          this.$message({
            message: "Metamask invoke failed",
            type: "error",
          });
        });

      this.approveButtonLoading = false;
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

            for (let j = 0; j < this.nfts.length; j++) {
              let nft = this.nfts[j];
              if (
                nft.token_id.toLowerCase() == lend.nftTokenId.toLowerCase() &&
                nft.asset_contract.address.toLowerCase() ==
                  lend.nftToken.toLowerCase()
              ) {
                this.nfts[j].lender = lend.lender;
                this.nfts[j].nftToken = lend.nftToken;
                this.nfts[j].nftTokenId = lend.nftTokenId;
                this.nfts[j].maxRentDuration = lend.maxRentDuration;
                this.nfts[j].dailyRentPrice = lend.dailyRentPrice;
                this.nfts[j].nftPrice = lend.nftPrice;
                this.nfts[j].rentable = lend.rentable;
                this.$forceUpdate();
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
    "$store.state.filter.name": {
      deep: true,
      handler() {
        console.log("filter", this.$store.state.filter.address);
        this.filter = this.$store.state.filter;
      },
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
  gap: 5px;
  justify-content: center;
  padding: 0;
  margin: 0;
  margin-top: 10px;
}

.lend-nfts-item {
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
