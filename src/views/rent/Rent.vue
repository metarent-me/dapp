<template>
  <div class="rent-wrapper">
    <Categoryfilter />
    <div class="rent-nfts">
      <div class="rent-nfts-item" v-for="nft of nfts" :key="nft.id">
        <NFT nft="nft" />
      </div>
    </div>
  </div>
</template>

<script>
import Categoryfilter from "../layouts/Categoryfilter.vue";
import NFT from "../../components/NFT.vue";

export default {
  name: "Rent",
  components: { Categoryfilter, NFT },
  data() {
    return {
      nfts: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
      ],
    };
  },
};
</script>

<style lang="less">
@import "../../assets/global.less";

.rent-wrapper {
  background-color: @body-background-color;
  min-height: 800px;
  padding-top: 10px;
  padding: 10px 80px 0 80px;
  display: flex;
  flex-flow: row nowrap;
}

.rent-nfts {
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  justify-content: space-around;
  padding: 0;
  margin: 0;
  margin-top: 20px;
}

.rent-nfts-item {
  background: tomato;
  width: 200px;
  height: 200px;
  border: 1px solid @body-background-color;
  &:hover {
    border: 1px solid tomato;
  }
}
</style>
