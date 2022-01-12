<template>
  <div
    class="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-96 rounded-2xl p-4 border bg-white"
  >
    <div class="font-bold mr-6 pb-1 cursor-pointer">Swap</div>
    <div class="w-full p-4 rounded-2xl bg-blueGray-100">
      <span class="flex">From</span>
      <div class="flex justify-between">
        <span>ETH</span>
        <span
          ><input
            class="bg-blueGray-100 border-0 text-right outline-none"
            type="number"
            :value="totalCoins"
        /></span>
      </div>
      <div class="flex justify-between">
        <span>Ethereum</span>
        <span>~${{ roundedEstimatedValue }}</span>
      </div>
    </div>
    <div class="border rounded-2xl p-4 mt-4">
      <div class="flex justify-between">
        <span>To (estimated)</span>
        <span>Balance: {{ balance }}</span>
      </div>
      <div>DAI</div>
      <div class="text-right">{{ estimatedValue }}</div>
    </div>
    <div class="text-center mt-4">
      <button
        class="w-full bg-gradient-to-r from-blue-500 via-blue-700 to-cyan-500 p-4 rounded-xl font-bold text-white"
      >
        Connect Wallet
      </button>
    </div>
  </div>
</template>

<script>
import "./assets/tailwind.css";

export default {
  name: "App",
  components: {},
  data() {
    return {
      totalCoins: 1,
      estimatedValue: 16916.36403,
      balance: 0.0,
    };
  },
  computed: {
    roundedEstimatedValue: function () {
      return this.estimatedValue.toFixed(0);
    },
  },
};
</script>

<style></style>
