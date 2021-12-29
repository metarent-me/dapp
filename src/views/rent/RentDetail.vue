<template>
  <div class="rent-detail-wrapper">
    <Categoryfilter />
    <div class="retial-detail-info">NFT Details</div>
  </div>
</template>

<script>
import Categoryfilter from "../layouts/Categoryfilter.vue";

export default {
  name: "RentDetail",
  components: { Categoryfilter },
  props: {
    nft: Object,
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style lang="less">
@import "../../assets/global.less";
</style>
