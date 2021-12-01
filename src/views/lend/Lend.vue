<template>
  <div class="lend-wrapper">
    <Categoryfilter />
    <div class="lend-nfts">
      <div class="lend-nfts-item" v-for="nft of nfts" :key="nft.id">
        <NFT nft="nft" />
        <el-button type="primary">Lend</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Categoryfilter from "../layouts/Categoryfilter.vue";
import NFT from "../../components/NFT.vue";

export default {
  name: "Lend",
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
  gap: 20px;
  justify-content: center;
  padding: 0;
  margin: 0;
  margin-top: 20px;
}

.lend-nfts-item {
  width: 200px;
  height: 300px;
  border: 1px solid @body-background-color;
  &:hover {
    border: 1px solid tomato;
  }

  .el-button--primary {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
