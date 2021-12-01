<template>
  <div class="header-warpper">
    <div class="header-left">
      <div class="header-title">Meta Rent</div>
    </div>
    <div class="header-right">
      <div class="header-page-name">Rent</div>
      <div class="header-connect">Connect to your wallet</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-warpper {
  display: flex;
  flex-flow: row wrap;
  height: 40px;
  margin-top: 5px;
}

@media (min-width: 601px) {
  .header-warpper {
    justify-content: space-between;
    background-color: green;
  }
}

@media (max-width: 600px) {
  .header-warpper {
    flex-direction: column;
    background-color: orange;
  }
}

.header-title {
  font-size: 30px;
  font-weight: 500;
  align-self: center;
  margin-left: 10px;
}

.header-right {
  margin-right: 10px;
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
