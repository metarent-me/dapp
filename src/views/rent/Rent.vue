<template>
  <div class="rent-wrapper">
    <Categoryfilter />
    <div>This is an Rent page</div>
  </div>
</template>

<script>
import Categoryfilter from "../layouts/Categoryfilter.vue";

export default {
  name: "Rent",
  components: { Categoryfilter },
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
</style>
