<template>
  <div class="header-warpper">
    <el-row>
      <h1>Header</h1>
    </el-row>
  </div>
</template>

<style lang="less">
.header-warpper {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  height: 40px;
}
@media all and (max-width: 800px) {
  .header-warpper {
    justify-content: space-around;
  }
}

@media all and (max-width: 500px) {
  .header-warpper {
    flex-direction: column;
  }
}
</style>
