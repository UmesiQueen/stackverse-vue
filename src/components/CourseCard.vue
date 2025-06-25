<script setup lang="ts">
import { ShoppingBagIcon, MapPinIcon } from "@heroicons/vue/24/solid";
import { defineProps } from "vue";

const props = defineProps({
    id: String,
    title: String,
    imageUrl: String,
    location: String,
    price: [String, Number],
    slots: [String, Number],
    description: String
});
</script>

<template>
    <div
        class=" bg-white font-space-grotesk flex flex-col overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
        <div class="w-full h-52 relative group border-b border-gray-100">
            <img :src="imageUrl" alt="Course Image"
                class="w-full h-full object-cover object-left-top group-hover:scale-105 transition-transform duration-200" />
            <button
                class="bg-white/80 rounded-full p-2 absolute right-2 top-2 hover:bg-white transition-all duration-200 cursor-pointer peer hidden group-hover:block drop-shadow-xl/50">
                <ShoppingBagIcon class="size-6 text-gray-950/80" />
            </button>
            <span role="tooltip" class="text-white bg-gray-950/80 p-1 px-2 text-xs rounded-full hidden peer-hover:block  absolute top-7 right-10 transition-all duration-200 ease-in-out delay-75 drop-shadow-lg">
                Add to cart
            </span>
        </div>
        <div class="p-4 h-72 flex flex-col gap-2">
            <h2 class="font-bold text-lg">{{ title }}</h2>
            <p class="text-sm text-cyan-500 inline-flex items-center gap-1">
                <MapPinIcon class="size-4" /> {{ location }}
            </p>
            <p>{{ description }}</p>
            <p class=" mt-auto"><span class="font-semibold">Available slots:</span> {{ slots }}</p>
            <p class="text-xl font-semibold"> ${{ price }}</p>
        </div>
    </div>
</template>
