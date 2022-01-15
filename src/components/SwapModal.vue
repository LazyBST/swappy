<template>
    <div class="fixed h-screen w-screen bg-black bg-opacity-50"></div>
    <div class="transform -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 w-full max-w-xs bg-green-500 shadow-md p-5 rounded-2xl border">
        <img
        src="https://icons.iconarchive.com/icons/graphicloads/100-flat/32/close-icon.png"
        alt="cross-icon"
        class="absolute -top-1 -right-1"
        @click="closeModal"
        />
        <h1 class="text-xl m-auto mb-2 text-center">This is your Swap Data</h1>
        <div class="text-bold text-sm m-auto text-gray-100">
            <p class="text-lg text-center"><span class="text-blue-800 font-bold">{{ swapData.fromTokenAmount }} {{ swapData.fromToken.name }}</span> will be swapped with <span class="text-blue-800 font-bold">{{ swapData.toTokenAmount }} {{ swapData.toToken.name }}</span></p>
            <p><span class="text-blueGray-700 font-bold">Gas =</span> {{swapData.tx.gas}}</p>
            <p><span class="text-blueGray-700 font-bold">Max Fee Per Gas =</span> {{swapData.tx.maxFeePerGas}}</p>
            <p><span class="text-blueGray-700 font-bold">Max Priority Fee Per Gas =</span> {{swapData.tx.maxPriorityFeePerGas}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Alert',
    props: ['swapData'],
    methods: {
        closeModal(){
            this.$emit('close-modal')
        }
    }
}
</script>