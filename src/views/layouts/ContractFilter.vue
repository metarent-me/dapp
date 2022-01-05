<template>
  <div class="contract-filter">
    <div class="contract-filter-title">Filters</div>
    <div class="contract-filter-results">
      <el-select
        v-model="selected"
        filterable
        clearable
        placeholder="Filters"
        no-data-text="Data loading ..."
        no-match-text="None matched"
      >
        <el-option
          v-for="filter in filters"
          :key="filter.value"
          :label="filter.label"
          :value="filter"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContractFilter",
  data() {
    return {
      input: "",
      filters: [],
      selected: null,
    };
  },
  methods: {
    changeFilter(filter) {
      this.$store.commit("setFilter", {
        name: filter.label,
        address: filter.value,
      });
    },
  },
  watch: {
    "$store.state.contracts.count": {
      deep: true,
      handler() {
        let contracts = this.$store.state.contracts.data;
        let filters = [];
        if (contracts) {
          for (const [name, address] of Object.entries(contracts)) {
            filters.push({ value: address, label: name });
          }
          this.filters = filters;
        }
      },
    },
    selected: function (newVal) {
      this.changeFilter(newVal);
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
  font-weight: bold;
}
.contract-filter-results {
  margin-top: 5px;
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
