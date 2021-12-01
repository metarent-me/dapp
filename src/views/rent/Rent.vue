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
}

.rent-nfts-item {
  background: tomato;
  padding: 5px;
  width: 200px;
  height: 150px;
  margin-top: 10px;
  line-height: 150px;
  color: white;
  font-weight: bold;
  font-size: 3em;
  text-align: center;
}
</style>
