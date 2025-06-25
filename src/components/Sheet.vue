<script setup lang="ts">
import { XMarkIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { defineEmits } from "vue";
const emit = defineEmits(["close"]);
</script>

<template>
    <aside class="bg-white w-[500px] h-full fixed right-0 top-0 shadow-2xl z-20 font-space-grotesk flex flex-col">
        <button class="absolute top-2 right-3 p-2 rounded-full hover:bg-gray-200 transition duration-200 cursor-pointer"
            @click="emit('close')">
            <XMarkIcon class="size-5" />
        </button>
        <h2 class="text-xl font-semibold py-4 px-6">Shopping Cart</h2>
        <hr class="text-gray-300" />
        <div class="py-4 px-6">
            <div class="flex items-center gap-4 border-b border-gray-300 pb-4 ">
                <div class="border-2 border-cyan-600 w-20 aspect-square" />
                <div class="flex flex-col justify-between h-full gap-1">
                    <h3 class="font-normal">Course title</h3>
                    <p class="text-lg font-semibold text-cyan-600">$100</p>
                    <input type="number" min="1" value="1"
                        class="border border-gray-300 rounded-md w-16 p-1 text-center" />
                </div>
                <button class="ml-auto p-2 rounded-full hover:bg-gray-200 transition duration-200 cursor-pointer">
                    <TrashIcon class="size-5 text-gray-400" />
                </button>
            </div>
        </div>
        <div class="mt-auto">
            <div class="flex items-center justify-between py-4 px-6 border-y border-gray-300">
                <p class="text-lg font-semibold">Subtotal:</p>
                <p class="text-lg">$100</p>
            </div>
            <div class="flex items-center justify-between p-6">
                <button
                    class="bg-cyan-600 text-white px-4 py-2 rounded-md w-full cursor-pointer hover:bg-cyan-600/70 transition duration-200">
                    Checkout
                </button>
                <button
                    class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md w-full ml-2 cursor-pointer hover:bg-gray-300 transition duration-200">
                    Clear Cart
                </button>
            </div>
        </div>
    </aside>
</template>