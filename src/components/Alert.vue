<template>
    <div class="fixed h-screen w-screen bg-black bg-opacity-50"></div>
    <div class="transform -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 h-96 w-96 max-w-9/10 bg-cyan-500 bg-opacity-80 shadow-md p-5 rounded-2xl flex" style="overflowWrap: anywhere">
        <p class="text-bold text-2xl m-auto text-center text-gray-100">{{ errorCapsulated }}</p>
    </div>
</template>
<script>
export default {
    name: 'Alert',
    props: ['error'],
    computed: {
        errorCapsulated() {
            const error = this.error;
            return error[0].toUpperCase() + error.slice(1);    
        }
    }
}
</script>