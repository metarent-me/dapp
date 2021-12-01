<template>
  <div class="header-warpper">
    <div class="header-left">
      <div class="header-title-slogan">
        <div class="header-title">MetaRent</div>
        <div class="header-slogan">Rent the metaverse</div>
      </div>
    </div>
    <div class="header-right">
      <div class="header-page-name" @click="gotoPage">{{ rentOrLend }}</div>

      <el-input
        placeholder="Collections, item, contract"
        v-model="searchText"
        class="header-search"
      >
        <i class="el-icon-search el-input__icon" slot="suffix" @click="search">
        </i>
      </el-input>

      <div class="header-connect">
        <el-button type="primary" round>Connect wallet</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: null,
    };
  },
  computed: {
    rentOrLend() {
      return this.$route.name === "rent" ? "Lend" : "Rent";
    },
  },
  methods: {
    gotoPage() {
      const current = this.$route.name;
      if (current == "rent") {
        this.$router.push("lend");
        this.rentOrLend = "Lend";
      } else {
        this.$router.push("rent");
        this.rentOrLend = "Rent";
      }
    },
    search() {
      console.log("search");
    },
  },
};
</script>
<style lang="less">
@import "../../assets/global.less";

.header-warpper {
  display: flex;
  flex-flow: row wrap;
  margin-top: 20px;
  margin-bottom: 20px;
}

@media (min-width: 601px) {
  .header-warpper {
    justify-content: space-between;
  }
}

@media (max-width: 600px) {
  .header-warpper {
    flex-direction: column;
  }
}

.header-left {
  margin-left: 20px;
  display: flex;
  flex-flow: row wrap;
  align-self: center;
  align-items: center;
  gap: 20px;
}

.header-title-slogan {
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
}

.header-title {
  font-size: 30px;
  font-weight: 500;
}

.header-slogan {
  font-size: 18px;
}

.header-right {
  margin-right: 20px;
  align-self: center;
  display: flex;
  align-content: flex-end;
  gap: 20px;
}

.header-page-name {
  font-size: 20px;
  font-weight: 400;
  align-self: center;

  &:hover {
    cursor: pointer;
  }
}
.header-connect {
  align-self: center;
}

.header-search {
  width: 600px;

  .el-input__inner {
    color: white;
    border-radius: 25px;
    background-color: @body-background-color;
    border: 1px solid @body-background-color;
  }
}
</style>
