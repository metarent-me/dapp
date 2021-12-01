<template>
  <div class="nft-wrapper">
    <div class="nft-img-container">
      <img
        class="nft-img"
        src="https://storage.opensea.io/static/promocards/unfold-promocard.jpeg"
        alt=""
      />
    </div>
    <div class="nft-collection">The Sandbox</div>
    <div class="nft-name">NFT #1234</div>
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

.nft-collection {
  font-weight: bold;
  font-size: 18px;
}

.nft-name {
  font-size: 14px;
}
</style>
