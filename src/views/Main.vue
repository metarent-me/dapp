<template>
  <div class="main-wrapper">
    <div class="header-container">
      <Header />
    </div>
    <div class="main-container">
      <Rent class="main-rent" />
    </div>
    <div class="footer-container">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./layouts/Header.vue";
import Footer from "./layouts/Footer.vue";
import Rent from "./rent/Rent.vue";

export default {
  name: "Main",
  components: { Footer, Header, Rent },
};
</script>

<style lang="less">
@import "../assets/global.less";

.main-wrapper {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}

.main-wrapper > * {
  flex: 1 100%;
}

.main-container {
  background-color: @body-background-color;
}
.main-rent {
  max-width: 800px;
  margin: auto;
}
</style>
