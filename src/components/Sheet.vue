<script setup lang="ts">
import { XMarkIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { defineEmits } from "vue";
import courses from "../data.json";
import { cartItems } from "../store.ts";

const emit = defineEmits(["close"]);

function removeItem(id: string) {
  const idx = cartItems.findIndex(item => item.id === id);
  if (idx !== -1) cartItems.splice(idx, 1);
}

function clearCart() {
  cartItems.splice(0, cartItems.length);
}
</script>

<template>
    <aside class="bg-white w-[600px] h-full fixed right-0 top-0 shadow-2xl z-20 font-space-grotesk flex flex-col">
        <button class="absolute top-2 right-3 p-2 rounded-full hover:bg-gray-200 transition duration-200 cursor-pointer"
            @click="emit('close')">
            <XMarkIcon class="size-5" />
        </button>
        <h2 class="text-xl font-semibold py-4 px-6">Shopping Cart</h2>
        <hr class="text-gray-300" />
        <div class="py-4 px-6 flex flex-col gap-4 overflow-y-auto h-[calc(100%-6rem)] no-scrollbar">
            <template v-if="cartItems.length">
                <div v-for="(item, idx) in cartItems" :key="item.id" class="flex items-center gap-4 border-b border-gray-300 pb-4">
                    <div class="border-1 border-black w-20 aspect-square bg-top-left bg-cover" :style="{ backgroundImage: `url(${(courses.find(c => c.id === item.id)?.imageUrl) || ''})` }" />
                    <div class="flex flex-col justify-between h-full gap-1">
                        <h3 class="font-medium">{{ courses.find(c => c.id === item.id)?.name || 'Course title' }}</h3>
                        <p class="text-lg font-semibold text-cyan-600">${{ courses.find(c => c.id === item.id)?.price || 0 }}</p>
                        <input type="number" min="1" v-model.number="item.count"
                            class="border border-gray-300 rounded-md w-16 p-1 text-center" />
                    </div>
                    <button class="ml-auto p-2 rounded-full hover:bg-gray-200 transition duration-200 cursor-pointer" @click="removeItem(item.id)">
                        <TrashIcon class="size-5 text-gray-400" />
                    </button>
                </div>
            </template>
            <template v-else>
                <p class="text-center text-gray-400">Your cart is empty.</p>
            </template>
        </div>
        <div class="mt-auto">
            <div class="flex items-center justify-between py-4 px-6 border-y border-gray-300">
                <p class="text-lg font-semibold">Subtotal:</p>
                <p class="text-lg">${{ cartItems.reduce((sum, item) => sum + (courses.find(c => c.id === item.id)?.price || 0) * item.count, 0).toFixed(2) }}</p>
            </div>
            <div class="flex items-center justify-between p-6">
                <button
                    class="bg-cyan-600 text-white px-4 py-2 rounded-md w-full cursor-pointer hover:bg-cyan-600/70 transition duration-200">
                    Checkout
                </button>
                <button
                    class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md w-full ml-2 cursor-pointer hover:bg-gray-300 transition duration-200"
                    @click="clearCart">
                    Clear Cart
                </button>
            </div>
        </div>
    </aside>
</template>