<template>
  <div class="nft-wrapper">
    <div class="nft-img-container">
      <img
        class="nft-img"
        :src="imgs[Math.floor(Math.random() * imgs.length)]"
        alt=""
      />
    </div>
    <div class="nft-collection">The Sandbox</div>
    <div class="nft-name">NFT #1234</div>
  </div>
</template>

<script>
import data from "../assets/testdata.json";

export default {
  name: "NFT",
  props: {
    nft: Object,
  },
  data() {
    return {
      imgs: data["imgs"],
    };
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
