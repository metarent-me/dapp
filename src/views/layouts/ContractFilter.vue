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
      <ul
        class="contract-filter-items"
        v-for="(value, name) in contracts"
        :key="value"
      >
        <li>{{ name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
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
    "$store.state.contracts.count": {
      deep: true,
      handler(newValue) {
        console.log("xx", newValue);
        this.contracts = this.$store.state.contracts.data;
      },
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
  cursor: pointer;
  user-select: none;
}
</style>
