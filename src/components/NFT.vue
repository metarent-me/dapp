<template>
  <div class="nft-wrapper">
    <div class="nft-img-container">
      <img
        class="nft-img"
        src="https://storage.opensea.io/static/promocards/unfold-promocard.jpeg"
        alt=""
      />
    </div>
    <div class="nft-name">NFT</div>
  </div>
</template>

<script>
export default {
  name: "NFT",
  props: {
    nft: Object,
  },
};
</script>

<style lang="less">
.nft-wrapper {
}

.nft-img-container {
}

.nft-img {
  width: 100%;
}
</style>
