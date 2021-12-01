<template>
  <div class="main-wrapper">
    <Header />
    <Rent />
    <Footer />
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
.main-wrapper {
  display: flex;
  flex-flow: column wrap;
}
.main-wrapper > * {
  flex: 1 100%;
}
</style>
