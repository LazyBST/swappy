<template>
  <Header />
  <div
    class="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-96 rounded-2xl p-4 border bg-white max-w-9/10"
  >
    <div class="font-bold mr-6 pb-2 cursor-pointer">Swap</div>
    <div class="w-full p-4 rounded-2xl bg-blueGray-100 shadow">
      <div class="mb-2 text-xs text-blueGray-500">From</div>
      <div class="flex justify-between">
        <span
          ><SelectToken
            :tokens="tokens"
            type="from"
            @token-updated="updateFromToken"
        /></span>
        <span
          ><input
            class="bg-blueGray-100 border-0 text-right outline-none w-28 text-xl"
            type="number"
            v-model="totalCoins"
            @input="fetchEstimate"
        /></span>
      </div>
      <div class="flex justify-between text-xs text-blueGray-500 mt-2">
        <span>{{ fromTokenAddress && tokens[fromTokenAddress].name }}</span>
        <span>~${{ fromTokenUsdPrice }}</span>
      </div>
    </div>
    <div class="border rounded-2xl p-4 mt-4">
      <div class="flex justify-between mb-2 text-xs text-blueGray-500">
        <div>To (estimated)</div>
      </div>
      <div class="flex flex-wrap">
        <SelectToken
          :tokens="tokens"
          type="to"
          @token-updated="updateToToken"
        />
        <div class="text-right text-xl ml-auto">{{ estimatedValue }}</div>
      </div>
      <div class="flex justify-between text-xs text-blueGray-500 mt-2">
        <span>{{ toTokenAddress && tokens[toTokenAddress].name }}</span>
        <span>~${{ toTokenUsdPrice }}</span>
      </div>
    </div>
    <div class="m-2 text-sm text-blueGray-500">Balance: {{ balance }}</div>
    <div class="text-center mt-4">
      <button
        :class="[
          walletAddress
            ? 'from-green-400 via-green-600 to-green-400'
            : 'from-cyan-500 via-blue-700 to-blue-500',
          'w-full bg-gradient-to-r p-4 rounded-xl font-bold text-white',
        ]"
        @click="connectWalletAndSwap"
      >
        {{ walletAddress ? "Swap Token" : "Connect Wallet" }}
      </button>
    </div>
  </div>
  <span v-if="error"><Alert :error="error" /></span>
  <span v-if="showConnectWalletModal"
    ><ConnectWalletModal
      @update-wallet-address="updateWalletAddress"
      @close-connect-wallet-modal="closeConnectWalletModal"
  /></span>
  <span v-if="showSwapModal">
    <SwapModal :swapData="swapData" @close-modal="toggleSwapModal" />
  </span>
  <a href="https://www.linkedin.com/in/ayush-arora-463185148" class="inline-flex">
    <div class="fixed bottom-5 right-2 w-20 text-center">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEUKZsL///8AZME7eMgAWb7i6fUAXL/Az+oAYsFjj9B1m9QAYMBGgswAVr0AXb8AWr5ZjdBWh80ZbMTO3PCzx+drl9T2+f2Ssd7G1u0dbsXF1e3w9fs2dsfl7ffV4fIocsaApNmowOSMrNyrw+Wbt+AAUryFqNr2AL+0AAADz0lEQVR4nO3ca1+qMACAcZiA5ATMW+a98vT9P+LROkXiNruMLXae/2v1xyOy6QCjCAAAAAAAAAAAAAAAAAAAALBGnPjeiPbkZSJ36/W4qmSQlbIYTTfxyXx72CXBNYpkv4o/mAwDayx7m7hhWoWUWM2afUebcTiJ5UAReDweo1AS5VAZeNyLgXxQhZxrCo/Hou+NsyJ70AXGcS+EnSgifWC8SHxvngXyzlAYhzCeJqmp8FH63r4fE8IUGC+6P9YI3VTxatP9AzFXz/bvCt8b+GNyT2HX5aov3UEVip4xMO3+SBNlxsJp6Xv7fq5amApn3Z/xzQfivAzgW1tUrPSFDwF8SM1zfiDLisUk5KPwREjN5/QpgKnilbhXrmP0uz/bvxPR9jLwEFDgacm7+Ut/c5v53ijLSvHw4WhMB0Xue4usE2U1vOtv03Qy3e+S8PpeCJlVSZKVgcyCAIDfT+SyrI6Ok0+As4+QVbGbHabLxWTRf7qb7YrMa6XIdZpbpX3k2QPzSuyXjV8rk8dd4i1SjG90bs+3SQx1D7yvH5gnt0vlr830ufK06mNYMW2cl8nUm370/laIYmQ4W3covSwaGAob68FZ/1phudOuiLyYDwoPu9FeoSiejX0nE+H+Z4u1QiHNO/DVfOh8hdJWYT42LLx+NHN9XtlSoVxrL8tpGjheILFTqFmvU7txO6RaKZT5Jz+ir9xeiWSl8M9nBpnayunVqzYKh9eniXNTl8vpVvbhFwOP74nDadFG4RdGmbeXdriibqPwG2budqKnQofXQHgqjIfOhlNfhX1nX958FcaZq53ordDZOXRvhVNXX8DtF87TNP3EDLlyNZpaLlwOxkWSJIWYXX20q4vIrRY+jat/S4tCVmPjBWXuDkSLhave2V02ojDeBxAfHK1n2CvcZs1vYhcXQJxZOhpqrBWqvofpr7fSPOE3F84vTgKcXvze9AxHvy9sFY6U40Zleo6jMxmWChfqHWK8n8PRdGGpULe4lBiWqHZdKtzqRg3TkxwtudkpfNbN3tKwSNWpQu0hJQyrVF0q3GgHftPNcV0qXOp/sBdhFBou6jcMpl0qNNxrmlz8XUMnC/fBFw7067uGG40ptITCGoVqFLaPwhqFahS2j8IahWoUto/CGoVqFLaPwhqFahS2j8IahWoUto/CGoVqFLaPwhqFahS2j8IahWoUto/CGoVqFLaPwlqAhc1/4NHfx2Qq9H7lXhT1dNaNf1HqDc/djt4YrroXa+3rtx1Wb4PWlQfq/zPrWy8PAAAAAAAAAAAAAAAAAAAA4D/0F5lQSZ+5G/qbAAAAAElFTkSuQmCC"
        alt="linkedin"
        class="rounded-full h-10 w-10 m-auto"
      />
      <p class="text-blueGray-400 text-xs">Meet Dev</p>
    </div>
  </a>
</template>

<script>
import "./assets/tailwind.css";
import Web3 from "web3";
import SelectToken from "./components/SelectToken.vue";
import Alert from "./components/Alert.vue";
import ConnectWalletModal from "./components/ConnectWalletModal.vue";
import SwapModal from "./components/SwapModal.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: { SelectToken, Alert, ConnectWalletModal, SwapModal, Header },
  data() {
    return {
      totalCoins: 1,
      estimatedValue: "0.0",
      balance: 0.0,
      web3Instance: undefined,
      tokens: [],
      apiBaseUrl: "https://api.1inch.io/v4.0/1",
      web3RpcUrl: "https://bsc-dataseed.binance.org",
      fromTokenAddress: "",
      toTokenAddress: "",
      error: "",
      errorDuration: 4000,
      walletAddress: "",
      showConnectWalletModal: false,
      slippage: 1,
      fromTokenUsdPrice: "0.0",
      toTokenUsdPrice: "0.0",
      swapData: {},
      showSwapModal: false,
    };
  },
  mounted() {
    this.web3Instance = new Web3(this.web3RpcUrl);
    console.log(this.web3Instance);
    this.populateTokens();
  },
  computed: {
    roundedEstimatedValue: function () {
      if (!this.estimatedValue) return "0.0";
      return this.estimatedValue;
    },
  },
  methods: {
    async populateTokens() {
      const response = await fetch(`${this.apiBaseUrl}/tokens`);
      const { tokens } = await response.json();
      this.tokens = tokens;
      console.log(this.tokens);
    },
    async updateFromToken(address) {
      this.fromTokenAddress = address;
      this.fetchEstimate();
      this.fromTokenUsdPrice = await this.getRelativeTokenPrice(
        this.fromTokenAddress
      );
      console.log("this.fromTokenAddress", this.fromTokenUsdPrice);
    },
    async updateToToken(address) {
      this.toTokenAddress = address;
      this.fetchEstimate();
      this.toTokenUsdPrice = await this.getRelativeTokenPrice(
        this.toTokenAddress
      );
      console.log("this.fromTokenAddress", this.toTokenUsdPrice);
    },
    async fetchEstimate() {
      if (this.fromTokenAddress && this.toTokenAddress && this.totalCoins) {
        const response = await fetch(
          `${this.apiBaseUrl}/quote?fromTokenAddress=${this.fromTokenAddress}&toTokenAddress=${this.toTokenAddress}&amount=${this.totalCoins}`
        );
        const { toTokenAmount, error, description } = await response.json();
        console.log(toTokenAmount, error, description);
        if (error) {
          const error = `${description.replace(
            "fromTokenAddress cannot be equals to toTokenAddress",
            "Token can't be same"
          )}, please change the tokens selected or increase amount`;
          this.showError(error);
          return;
        }
        this.estimatedValue = toTokenAmount;
      }
    },
    async connectWalletAndSwap() {
      if (!this.walletAddress) {
        this.showConnectWalletModal = true;
      } else if (
        this.fromTokenAddress &&
        this.toTokenAddress &&
        this.totalCoins
      )
        this.swapToken();
      else {
        const error = "Please input and output tokens and appropriate amount";
        this.showError(error);
      }
    },
    updateWalletAddress(address) {
      this.closeConnectWalletModal();
      this.walletAddress = address;
      this.updateWalletBalance();
      this.connectWalletAndSwap();
    },
    updateWalletBalance() {
      this.web3Instance.eth.getBalance(this.walletAddress, (err, bal) => {
        console.log(err, bal);
        if (err) {
          this.error = err;
          this.walletAddress = "";
          return;
        }
        this.balance = bal;
      });
    },
    async swapToken() {
      const response = await fetch(
        `https://api.1inch.io/v4.1/1/swap?fromAddress=${this.walletAddress}&fromTokenAddress=${this.fromTokenAddress}&toTokenAddress=${this.toTokenAddress}&amount=${this.totalCoins}&slippage=${this.slippage}`
      );
      const data = await response.json();
      if (data.error) {
        this.showError(data.description);
        return;
      }
      this.swapData = data;
      this.toggleSwapModal();
    },
    toggleSwapModal() {
      this.showSwapModal = !this.showSwapModal;
    },
    showError(error) {
      this.estimatedValue = "0.0";
      this.error = error.replace("fromAddress", "Wallet Address");
      setTimeout(() => (this.error = ""), this.errorDuration);
    },
    closeConnectWalletModal() {
      this.showConnectWalletModal = false;
    },
    async getRelativeTokenPrice(tokenAddress, tryAgainTokenName = "") {
      console.log(
        tokenAddress,
        this.tokens[this.fromTokenAddress],
        this.tokens[this.toTokenAddress]
      );
      const from =
        tryAgainTokenName.toLowerCase() ||
        this.tokens[tokenAddress].name.toLowerCase();
      const to = "usd";
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`
      );
      const data = await response.json();
      console.log(data);
      if (data && data[from] && data[from][to]) return data[from][to];
      else if (!tryAgainTokenName) {
        console.log("Try Again", this.tokens[tokenAddress].symbol);
        return await this.getRelativeTokenPrice(
          tokenAddress,
          this.tokens[tokenAddress].symbol
        );
      }
      return "NA";
    },
  },
};
</script>
