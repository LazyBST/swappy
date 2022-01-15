<template>
  <div class="flex">
    <span v-if="selectedTokenAddress" class="mr-2 flex flex-shrink-0">
      <img
        :src="tokens[selectedTokenAddress].logoURI"
        alt="selected-token logo"
        class="h-8 w-8"
      />
    </span>
    <select
      name="token"
      id="token"
      :class="[type === 'from' ? 'bg-blueGray-100' : 'bg-white', 'outline-none w-36 text-xl']"
      v-model="selectedTokenAddress"
      @change="onTokenChange($event)"
    >
      <option value="">Select Token</option>
      <option
        :value="token.address"
        v-for="token in tokens"
        :key="token.address"
      >
        <span>{{ token.symbol }}</span>
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "select-token",
  props: ["tokens", "type"],
  emits: ['token-updated'],
  data() {
    return {
      selectedTokenAddress: "",
    };
  },
  methods: {
    onTokenChange(event) {
      this.$emit('token-updated', event.target.value);
    },
  },
};
</script>
