<template>
  <div class="rent-detail-wrapper">
    <div class="rent-detail-title">
      <div class="rent-detail-img-container">
        <img
          class="rent-detail-img"
          :src="nft.image_url || defaultImg"
          alt="NFT"
        />
        <div class="rent-detail-contract">
          <a>Contract: {{ contractAddress }}</a>
        </div>
      </div>
    </div>

    <div class="rent-detail-info">
      <div class="rent-dialog-form">
        <div class="rent-info">
          <div class="rent-detail-collection">
            {{ (nft.collection || {}).name || "Loading..." }}
          </div>
          <div class="rent-detail-name">{{ nft.name || "..." }}</div>

          <el-form label-position="right" label-width="150px">
            <el-form-item label="Lender" size="medium">{{
              nft.lender
            }}</el-form-item>
            <el-form-item label="Collateral(ETH)" size="medium">
              {{ toEther(nft.nftPrice) }}
            </el-form-item>
            <el-form-item label="Daily Price(ETH)"
              >{{ toEther(nft.dailyRentPrice) }}
            </el-form-item>
            <el-form-item label="Max Duration(Days)">
              {{ nft.maxRentDuration }}</el-form-item
            >
            <el-form-item label="">
              <el-button type="primary" @click="dialogVisible = true"
                >Rent</el-button
              ></el-form-item
            >
          </el-form>
        </div>

        <div class="lender-info-rent-button"></div>
      </div>
    </div>

    <el-dialog
      class="rent-dialog"
      title="Complete Checkout"
      :visible.sync="dialogVisible"
      width="60%"
      center
    >
      <div class="rent-dialog-desc">
        <div class="rent-dialog-collection">
          {{ ((nft || {}).collection || {}).name || "NFT" }}
        </div>
        <div class="rent-dialog-name">
          {{ (nft || {}).name || "No Name" }}
        </div>
      </div>

      <div class="rent-dialog-form">
        <el-form label-position="right" label-width="200px" :model="nft">
          <el-form-item label="Max Duration">
            {{ nft.maxDuration || "-" }} Days
            <el-input
              v-model="nft.duration"
              type="number"
              placeholder="Input duration"
            ></el-input>
          </el-form-item>
          <el-form-item label="Lender">
            {{ nft.lender || "-" }}
          </el-form-item>
          <el-form-item label="Renter">
            {{ nft.renter || "-" }}
          </el-form-item>
          <el-form-item label="Collatera">
            {{ toEther(nft.nftPrice) }} ETH
          </el-form-item>
          <el-form-item label="Rent Interest">
            {{ toEther(nft.dailyRentPrice) }} ETH
          </el-form-item>
          <el-form-item label="Total">
            {{
              `${toEther(nft.nftPrice) || 0} + ${nft.duration || 0} * ${
                toEther(nft.dailyRentPrice) || 0
              } = ${
                (toEther(nft.nftPrice) || 0) +
                (nft.duration || 0) * (toEther(nft.dailyRentPrice) || 0)
              }`
            }}
            ETH
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="rent" :loading="buttonLoading"
          >Approve &#38; Pay</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Web3 from "web3";
import {
  OPENSEA_SINGLE_ASSET,
  METARENT_CONTRACT,
  METARENT_ABI,
} from "../../contracts/Metarent";

export default {
  name: "RentDetail",
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
      nft: {},
      buttonLoading: false,
      defaultImg: "https://testnets.opensea.io/static/images/placeholder.png",
      dialogVisible: false,
    };
  },
  methods: {
    toEther(wei) {
      if (wei) {
        return wei / 1e18;
      } else {
        return null;
      }
    },
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
        .then((results) => {
          for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (
              result.nftToken.toLowerCase() ==
                this.nft.asset_contract.address.toLowerCase() &&
              result.nftTokenId.toLowerCase() == this.nft.token_id.toLowerCase()
            ) {
              this.nft.lender = result["lender"];
              this.nft.renter = this.$store.state.account;
              this.nft.nftToken = result["nftToken"];
              this.nft.nftTokenId = result["nftTokenId"];
              this.nft.maxRentDuration = result["maxRentDuration"];
              this.nft.dailyRentPrice = result["dailyRentPrice"];
              this.nft.nftPrice = result["nftPrice"];
              this.nft.rentable = result["rentable"];

              this.$forceUpdate();
            }
          }
        });
    },
    async rent() {
      // Check input
      if (!this.nft.duration) {
        alert("Duration mubst integer");
        return;
      }
      this.buttonLoading = true;

      // Init contract
      const Metarent = new this.web3.eth.Contract(
        METARENT_ABI.abi,
        METARENT_CONTRACT
      );

      // Call contract method of `rent`
      let duration = Number(this.nft.duration);
      let nftPrice = Number(this.nft.nftPrice);
      let dailyRentPrice = Number(this.nft.dailyRentPrice);
      let value = Number(nftPrice + dailyRentPrice * (duration + 1)).toFixed();

      await Metarent.methods
        .rent(this.nft.nftToken, this.nft.nftTokenId, this.nft.duration)
        .send({
          from: this.$store.state.account,
          value: value,
        })
        .then((result) => {
          console.log("Rent result", result);

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
      this.buttonLoading = false;
    },
  },
  mounted() {
    const token = this.$route.params.token;
    const tokenId = this.$route.params.tokenId;

    fetch(OPENSEA_SINGLE_ASSET + `${token}/${tokenId}`)
      .then((res) => res.json())
      .then((data) => {
        this.nft = data;
        this.getLending();
      });
  },
};
</script>

<style lang="less">
@import "../../assets/global.less";
.rent-detail-wrapper {
  height: 1200px;
  display: flex;
}
.rent-detail-img-container {
  margin-top: 20px;
  margin-left: 100px;
  height: 400px;
  width: 300px;
  border: 1px solid @body-background-color;
}
.rent-detail-img {
  display: inlin-block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.rent-detail-contract {
  margin-top: 10px;
}
.rent-detail-info {
  margin-left: 50px;
  width: 800px;
}
.rent-detail-collection {
  font-size: 30px;
  font-weight: bold;

  .el-form-item__label {
    font-size: 10px;
    color: white !important;
  }
}
.rent-detail-name {
  font-size: 20px;
}
.rent-info {
  margin-top: 20px;
  font-size: 20px;
  .el-form-item__label {
    color: white;
  }
}
.lender-info-rent-button {
  margin-top: 30px;
}

.rent-dialog {
  .el-dialog__title {
    font-size: 30px;
    font-weight: bold;
  }
}
.rent-dialog-desc {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}

.rent-dialog-collection {
  font-size: 20px;
  font-weight: bold;
}
.rent-dialog-name {
  font-size: 20px;
  font-weight: bold;
}
</style>
