<template>
  <div class="lend-wrapper">
    <Categoryfilter />
    <div class="lend-nfts">
      <div class="lend-nfts-item" v-for="nft of nfts" :key="nft.id">
        <NFT :nft="nft" />
        <el-button type="primary" @click="dialogVisible = true">Lend</el-button>
      </div>
    </div>

    <el-dialog
      class="lend-dialog"
      title="Complete checkout"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
      center
    >
      <div class="lend-dialog-desc">
        <div class="lend-desc-collection">The Sandbox</div>
        <div class="lend-desc-name">The Sandbox #321</div>
      </div>

      <div class="lend-dialog-form">
        <el-form label-position="right" label-width="200px" :model="lendInfo">
          <el-form-item label="Collateral">
            <el-input v-model="lendInfo.collateral"></el-input>
          </el-form-item>
          <el-form-item label="Daily price">
            <el-input v-model="lendInfo.dailyPrice"></el-input>
          </el-form-item>
          <el-form-item label="Max duration">
            <el-input v-model="lendInfo.maxDuration"></el-input>
          </el-form-item>
          <el-form-item label="Fee">2.5%</el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Approve</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Categoryfilter from "../layouts/Categoryfilter.vue";
import NFT from "../../components/NFT.vue";

export default {
  name: "Lend",
  components: { Categoryfilter, NFT },
  data() {
    return {
      dialogVisible: false,
      lendInfo: {
        collateral: null,
        dailyPrice: null,
        maxDuration: null,
      },
      nfts: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
      ],
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less">
@import "../../assets/global.less";

.lend-wrapper {
  background-color: @body-background-color;
  min-height: 800px;
  padding-top: 10px;
  padding: 10px 80px 0 80px;
  display: flex;
  flex-flow: row nowrap;
}

.lend-nfts {
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  justify-content: center;
  padding: 0;
  margin: 0;
  margin-top: 20px;
}

.lend-nfts-item {
  width: 200px;
  height: 300px;
  border: 1px solid @body-background-color;
  &:hover {
    border: 1px solid tomato;
  }

  .el-button--primary {
    display: block;
    width: 100%;
    margin: 0 auto;
    font-weight: bold;
    background-color: @button-background-color;
    border-color: @button-background-color;
    &:hover {
      background-color: @button-hover-color;
    }
  }
}

.lend-desc-collection {
  font-weight: bold;
  font-size: 20px;
}

.lend-dialog {
  .el-dialog__header {
  }

  .el-dialog__title {
    font-weight: bold;
    font-size: 25px;
  }
}

.lend-dialog-desc {
  text-align: center;
}

.lend-dialog-form {
  width: 80%;
  margin-top: 20px;
}
</style>
