<template>
  <div
    class="absolute transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-96 w-96 bg-green-50 border text-center flex align-middle flex-col p-5 justify-center gap-10 rounded-lg shadow-md max-w-9/10"
  >
    <img
      src="https://icons.iconarchive.com/icons/graphicloads/100-flat/32/close-icon.png"
      alt="cross-icon"
      class="absolute -top-1 -right-1"
      @click="closeModal"
    />
    <p class="text-green-600 text-xl font-bold">Add Wallet Address</p>
    <input
      type="text"
      name=""
      v-model="walletAddress"
      @keydown.enter="onAddressChange($event)"
      class="border-2 outline-none rounded-2xl p-2"
    />
    <button
      class="bg-green-600 text-white font-bold rounded-2xl p-2"
      @click="onAddressChange($event)"
    >
      Connect Wallet
    </button>
  </div>
</template>
<script>
export default {
  name: "connect-wallet-modal",
  data() {
    return {
      walletAddress: "",
    };
  },
  methods: {
    onAddressChange(event) {
      event.stopPropagation();
      this.$emit("update-wallet-address", this.walletAddress);
    },
    closeModal(event) {
      event.stopPropagation();
      this.$emit("close-connect-wallet-modal");
    },
  },
};
</script>
