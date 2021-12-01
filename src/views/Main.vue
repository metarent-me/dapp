<template>
  <div class="main-wrapper">
    <div class="header">
      <Header />
    </div>
    <div class="main">
      <Rent />
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import Header from "./layouts/Header.vue";
import Footer from "./layouts/Footer.vue";
import Rent from "./rent/Rent.vue";

export default {
  name: "Home",
  components: { Footer, Header, Rent },
};
</script>

<style lang="less">
.main-wrapper {
  display: flex;
  flex-flow: column wrap;
}
.main-wrapper > * {
  flex: 1 100%;
}

.header {
  height: 60px;
}

.main {
  height: 100%;
}
</style>
