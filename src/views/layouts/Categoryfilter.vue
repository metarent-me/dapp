<template>
  <div class="category-filter">
    <div class="category-filter-title">Filters</div>
    <el-input
      class="category-filter-input"
      name="category-filter-input"
      v-model="input"
      placeholder="Search"
    ></el-input>
    <div class="category-filter-results">
      <ul class="category-filter-items">
        <li>The Sandbox</li>
        <li>Bored Ape yancht Club</li>
        <li>CryptoPunks</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categoryfilter",
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style lang="less">
@import "../../assets/global.less";

.category-filter {
  width: @main-filter-width;
  max-width: @main-filter-width;
  display: inline-block;
  margin-top: 30px;
}

.category-filter-title {
  font-size: 18px;
}

.category-filter-input {
  margin-top: 10px;

  .el-input__inner {
    background-color: rgb(48, 51, 57);
    border-color: rgb(32, 34, 37);
    color: rgb(229, 232, 235);
    border-radius: 10px;
  }

  .el-input__inner:focus {
    border-color: rgb(32, 34, 37);
    outline: 0;
  }

  .el-input__inner:hover {
    border-color: rgb(32, 34, 37);
    outline: 0;
  }
}

.category-filter-items {
  list-style-type: none;
  padding: 2px;
}
</style>
