<script setup lang="ts">
import { ShoppingCartIcon } from "@heroicons/vue/24/solid";
import { cartItems, courses, toggleSheet } from "./store";
</script>

<template>
	<header class="flex justify-between items-center bg-cyan-900 text-white p-6 sticky top-0 w-full z-10">
		<h1 class="font-lilita text-4xl font-semibold cursor-default text-shadow-lg">
			<RouterLink to="/">StackVerse</RouterLink>
		</h1>
		<div class="flex items-center gap-3 font-space-grotesk group">
			<p class="text-lg cursor-default">${{cartItems.reduce((sum, item) => sum + (courses.find(c => c.id ===
				item.id)?.price || 0) * item.count, 0).toFixed(2)}}</p>
			<button @click="toggleSheet" :disabled="cartItems.length < 1" aria-label="Open shopping cart"
				class="relative rounded-full p-2 hover:bg-white/20 disabled:hover:bg-transparent transition duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50  peer">
				<ShoppingCartIcon class="size-7" />
				<p
					class="absolute top-1 text-xs right-0 font-bold text-cyan-900 bg-white [.peer:disabled_&]:opacity-50 rounded-full w-4 outline-1 outline-cyan-900">
					{{ cartItems.length }}
				</p>
			</button>
			<span role="tooltip"
				class="text-white bg-gray-950/80 p-1 px-3 text-xs rounded-full hidden group-has-[.peer:hover:not(:disabled)]:block absolute bottom-2 right-12">
				View cart
			</span>
		</div>
	</header>
	<router-view />
</template>
