<template>
  <div class="header-warpper">
    <div class="header-left">
      <div class="header-title-slogan" @click="goHome">
        <div class="header-title">MetaRent</div>
        <div class="header-slogan">RENT the metaverse (Rinkeby)</div>
      </div>
    </div>
    <div class="header-right">
      <div :class="pageButtonClass('explorer')" @click="gotoRent">Explore</div>
      <div :class="pageButtonClass('me')" @click="gotoLend">Me</div>
      <div :class="pageButtonClass('dao')">
        <a
          href="https://www.notion.so/invite/f415165ee2456e82014edd463ba3e40ed0542195"
          target="_blank"
          >DAO</a
        >
      </div>
      <div :class="pageButtonClass('faq')" @click="gotoFAQ">FAQ</div>
      <div class="header-connect">
        <el-button type="primary" @click="connectWallet" round
          >{{ currentAccount(account) || "Connect wallet" }}<br />
          {{ netName }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";

export default {
  props: {
    userMessage: {
      type: String,
      default: "null",
    },
  },
  data() {
    return {
      searchText: null,
      account: null,
      web3: null,
      MetaMaskId: "1", // main net netID
      netID: "1", // user metamask id
      netName: null,
      MetaMaskAddress: "", // user Address
      Web3Interval: null,
      AccountInterval: null,
      NetworkInterval: null,
      stateLog: null,
      isComplete: false,
      type: "INIT",
      MetamaskMsg: {
        LOAD_MATAMASK_WALLET_ERROR: "Loading metamask error, please try later",
        EMPTY_METAMASK_ACCOUNT:
          "Please log in to your metamask to continue with this app.",
        NETWORK_ERROR: "The connection is abnormal, please try again",
        METAMASK_NOT_INSTALL: "Please install metamask for this application",
        METAMASK_TEST_NET: "Currently not in the main network.",
        METAMASK_MAIN_NET: "Currently Main network",
        USER_DENIED_ACCOUNT_AUTHORIZATION: "User denied account authorization",
      },
    };
  },
  computed: {},
  methods: {
    pageButtonClass(page) {
      let name = this.$route.name;
      if (page === name) {
        return "header-page-name selected";
      } else {
        return "header-page-name";
      }
    },
    gotoRent() {
      if (this.$route.name !== "explorer") {
        this.$router.push("/explorer");
      }
    },
    gotoLend() {
      if (this.$route.name !== "me") {
        this.$router.push("/me");
      }
    },
    gotoFAQ() {
      if (this.$route.name !== "faq") {
        this.$router.push("/faq");
      }
    },

    goHome() {
      if (this.$route.name !== "explorer") {
        this.$router.push("/");
      }
    },
    search() {},
    connectWallet() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          window.ethereum.enable();
          this.web3TimerCheck(window.web3);
        } catch (error) {
          this.Log(
            this.MetamaskMsg.USER_DENIED_ACCOUNT_AUTHORIZATION,
            "USER_DENIED_ACCOUNT_AUTHORIZATION"
          );
        }
      } else if (window.web3) {
        window.web3 = new Web3(this.web3.currentProvider);
        this.web3TimerCheck(window.web3);
      } else {
        this.web3 = null;
        this.Log(this.MetamaskMsg.METAMASK_NOT_INSTALL, "NO_INSTALL_METAMASK");
        console.error(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    },
    onComplete(data) {
      this.account = data.metaMaskAddress;
      this.$store.commit("setAccount", this.account);
      this.netName = `Ethereum ${data.type}`;
    },
    currentAccount(str) {
      if (str) {
        return str.slice(0, 6) + "..." + str.slice(-4);
      }
      return null;
    },
    checkWeb3() {
      let web3 = window.web3;
      if (typeof web3 === "undefined") {
        this.web3 = null;
        this.Log(this.MetamaskMsg.METAMASK_NOT_INSTALL, "NO_INSTALL_METAMASK");
      }
    },
    checkAccounts() {
      if (this.web3 === null) return;
      this.web3.eth.getAccounts((err, accounts) => {
        if (err != null)
          return this.Log(this.MetamaskMsg.NETWORK_ERROR, "NETWORK_ERROR");
        if (accounts.length === 0) {
          this.MetaMaskAddress = "";
          this.Log(this.MetamaskMsg.EMPTY_METAMASK_ACCOUNT, "NO_LOGIN");
          return;
        }
        this.MetaMaskAddress = accounts[0]; // user Address
      });
    },
    checkNetWork() {
      try {
        // Main Network: 1
        // Ropsten Test Network: 3
        // Kovan Test Network: 42
        // Rinkeby Test Network: 4
        // Goerli Test Network: 5
        this.web3.eth.net.getId().then((netId) => {
          this.netID = netId;
          if (this.MetaMaskAddress !== "" && netId === 1)
            return this.Log(this.MetamaskMsg.METAMASK_TEST_NET, "Mainnet");
          if (this.MetaMaskAddress !== "" && netId === 3)
            return this.Log(this.MetamaskMsg.METAMASK_TEST_NET, "Ropsten");
          if (this.MetaMaskAddress !== "" && netId === 42)
            return this.Log(this.MetamaskMsg.METAMASK_TEST_NET, "Kovan");
          if (this.MetaMaskAddress !== "" && netId === 4)
            return this.Log(this.MetamaskMsg.METAMASK_TEST_NET, "Rinkeby");
          if (this.MetaMaskAddress !== "" && netId === 5)
            return this.Log(this.MetamaskMsg.METAMASK_TEST_NET, "Goerli");
          if (this.MetaMaskAddress !== "")
            this.Log(this.MetamaskMsg.METAMASK_MAIN_NET, "Mainnet");
        });
      } catch (err) {
        this.Log(this.MetamaskMsg.NETWORK_ERROR, "NETWORK_ERROR");
      }
    },
    Log(msg, type = "") {
      const letType = type;
      if (letType === this.type) return;
      const message = this.userMessage === "null" ? msg : this.userMessage;
      this.type = type;
      let data = {
        web3: this.web3,
        type,
        metaMaskAddress: this.MetaMaskAddress,
        message,
        netID: this.netID,
      };
      this.onComplete(data);
    },
    web3TimerCheck(web3) {
      this.web3 = web3;
      this.checkAccounts();
      this.checkNetWork();
    },
  },
  mounted() {
    this.connectWallet();
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
  user-select: none;
}

.header-title-slogan {
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  :hover {
    cursor: pointer;
  }
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
  font-weight: bold;
  align-self: center;
  // margin-right: 30px;
  width: 100%;
  padding: 5px 10px;
  user-select: none;

  &.selected {
    background: @button-gray-color;
    border-radius: 6px;
  }

  &:hover {
    cursor: pointer;
  }

  a {
    color: white;
    text-decoration: none;
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

.header-enable-ethereum {
  font-weight: bold;
}
</style>
