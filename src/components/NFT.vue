<template>
  <div class="nft-wrapper">
    <div class="nft-img-container">
      <el-image
        style="width: 200px; height: 200px"
        :src="nft.image_url || defaultImg"
        fit="cover"
      ></el-image>
      <!-- <img class="nft-img" :src="nft.image_url || defaultImg" alt="" /> -->
    </div>
    <div class="nft-collection">{{ collectionName }}</div>
    <div class="nft-name">{{ NFTName }}</div>
  </div>
</template>

<script>
export default {
  name: "NFT",
  props: {
    nft: Object,
  },
  data() {
    return {
      defaultImg: "https://testnets.opensea.io/static/images/placeholder.png",
    };
  },
  computed: {
    collectionName: function () {
      let name = (this.nft.collection || {}).name || "NFT";
      if (name.length > 20) {
        name = name.slice(0, 20) + "...";
      }
      return name;
    },
    NFTName: function () {
      return this.nft.name || "No Name";
    },
  },
  mounted() {
    setInterval(() => {
      this.$forceUpdate();
    }, 2000);
  },
};
</script>

<style lang="less">
@import "../assets/global.less";
.nft-wrapper {
  box-shadow: 0 12px 20px -8px @body-background-color;
}
.nft-img-container {
  height: @nft-img-height;
}
.nft-img {
  display: inlin-block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.nft-collection {
  font-weight: bold;
  font-size: 18px;
  padding: 0 10px;
}
.nft-name {
  font-size: 14px;
  padding: 0 10px;
}
</style>
