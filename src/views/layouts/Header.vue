<template>
  <div class="header-warpper">
    <div class="header-left">
      <div class="header-title-slogan">
        <div class="header-title">MetaRent</div>
        <div class="header-slogan">Rent the metaverse</div>
      </div>
    </div>
    <div class="header-right">
      <div class="header-page-name">Rent</div>
      <div class="header-connect">
        <el-button type="primary" round>Connect wallet</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
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
}
.header-connect {
  align-self: center;
}
</style>
