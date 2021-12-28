<template>
  <div class="nft-wrapper">
    <div class="nft-img-container">
      <img class="nft-img" :src="nft.image_url" alt="" />
    </div>
    <div class="nft-collection">{{ (nft.collection || {}).name || "NFT" }}</div>
    <div class="nft-name">{{ nft.name }}</div>
  </div>
</template>

<script>
export default {
  name: "NFT",
  props: {
    nft: Object,
  },
  data() {
    return {};
  },
  mounted() {
    setInterval(() => {
      this.$forceUpdate();
      console.log("xx");
    }, 2000);
  },
};
</script>

<style lang="less">
@import "../assets/global.less";

.nft-wrapper {
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
}

.nft-name {
  font-size: 14px;
}
</style>
