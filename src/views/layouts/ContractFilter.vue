<template>
  <div class="contract-filter">
    <div class="contract-filter-title">Filters</div>
    <el-input
      class="contract-filter-input"
      name="contract-filter-input"
      v-model="input"
      placeholder="Search"
    ></el-input>
    <div class="contract-filter-results">
      <ul class="contract-filter-items" v-for="c in contracts" :key="c.address">
        <li>The Sandbox</li>
        <li>Bored Ape yancht Club</li>
        <li>CryptoPunks</li>
      </ul>
    </div>
  </div>
</template>

<script>
// import {Metarent} from "../../contracts/Metarent";

export default {
  name: "ContractFilter",
  data() {
    return {
      input: "",
      contracts: [],
    };
  },
  methods: {},
  watch: {
    "$store.state.contracts": function (newVal) {
      if (newVal) {
        this.contracts = newVal;
      }
    },
  },
};
</script>

<style lang="less">
@import "../../assets/global.less";

.contract-filter {
  width: 500px;
  max-width: @main-filter-width;
  display: inline-block;
  margin-top: 30px;
}

.contract-filter-title {
  font-size: 18px;
}

.contract-filter-input {
  margin-top: 10px;
  width: 100px;

  &.el-input {
    width: 220px;
  }

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

.contract-filter-items {
  list-style-type: none;
  padding: 2px;
}
</style>
