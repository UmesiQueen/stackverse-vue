<script setup lang="ts">
import { ShoppingBagIcon } from "@heroicons/vue/24/solid";
</script>

<template>
    <div class=" bg-white font-space-grotesk flex flex-col overflow-hidden">
        <div class=" bg-amber-600 w-full h-56 relative group">
            <button
                class="bg-white/20 rounded-full p-2 absolute right-2 top-2 hover:bg-white/50 transition duration-200 cursor-pointer peer hidden group-hover:block">
                <ShoppingBagIcon class="size-6 text-gray-950/80" />
            </button>
            <span role="tooltip"
                class="text-white bg-gray-950/80 p-1 px-2 text-xs rounded-full hidden peer-hover:block absolute top-7 right-10 transition-all duration-200 ease-in-out delay-75">
                Add to cart
            </span>
        </div>
        <div class="space-y-4 p-2">
            <h2 class="font-bold text-xl">Course Title</h2>
            <p class="text-justify ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium aspernatur ...
            </p>
            <p><b>Price:</b> $100</p>
            <p><b>In-stock:</b> 10</p>
        </div>
    </div>
</template>
