<template>
  <div class="rent-detail-wrapper">
    <div class="rent-detail-title">
      <div class="rent-detail-img-container">
        <img
          class="rent-detail-img"
          :src="nft.image_url || defaultImg"
          alt=""
        />
      </div>
      <div class="rent-detail-contract">Contract: {{ contractAddress }}</div>
    </div>
    <div class="rent-detail-info">
      <div class="rent-detail-collection">
        {{ (nft.collection || {}).name }}
      </div>
      <div class="rent-detail-name">{{ nft.name }}</div>
      <div class="lender-info">
        <div class="lender-info-address">Address: {{}}</div>
        <div class="lender-info-collateral">Collateral: {{}}</div>
        <div class="lender-info-max-duration">Max Duration: {{}}</div>
        <div class="lender-info-daily-price">Daily Price: {{}}</div>
        <div class="lender-info-rent-button">
          <el-button type="primary">Rent</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OPENSEA_SINGLE_ASSET } from "../../contracts/Metarent";
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
      defaultImg: "https://testnets.opensea.io/static/images/placeholder.png",
    };
  },
  mounted() {
    const token = this.$route.params.token;
    const tokenId = this.$route.params.tokenId;

    fetch(OPENSEA_SINGLE_ASSET + `${token}/${tokenId}`)
      .then((res) => res.json())
      .then((data) => {
        this.nft = data;
      });
  },
};
</script>

<style lang="less">
@import "../../assets/global.less";
.rent-detail-wrapper {
  height: 800px;
  display: flex;
}
.rent-detail-img-container {
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
}
.rent-detail-collection {
  font-size: 30px;
  font-weight: bold;
}
.rent-detail-name {
  font-size: 20px;
}
.lender-info {
  margin-top: 100px;
  font-size: 20px;
}
.lender-info-rent-button {
  margin-top: 30px;
}
</style>
