<script setup lang="ts">
import { ref } from "vue";
import { ShoppingCartIcon, MagnifyingGlassIcon, ArrowPathRoundedSquareIcon, XMarkIcon, TrashIcon } from "@heroicons/vue/24/solid";
import CourseCard from "./components/CourseCard.vue";
import Sheet from "./components/Sheet.vue";
import courses from "./data.json";
import { cartItems } from "./store";

const isSheetOpen = ref(false);
function openSheet() {
	isSheetOpen.value = true;
}
function closeSheet() {
	isSheetOpen.value = false;
}
</script>

<template>
	<header class="flex justify-between items-center bg-cyan-900 text-white p-6 sticky top-0 w-full z-10">
		<h1 class="font-lilita text-4xl font-semibold cursor-default text-shadow-lg">StackVerse</h1>
		<div class="flex items-center gap-3 font-space-grotesk group">
			<p class="text-lg cursor-default">${{cartItems.reduce((sum, item) => sum + (courses.find(c => c.id ===
				item.id)?.price || 0) * item.count, 0).toFixed(2)}}</p>
			<button @click="openSheet" :disabled="cartItems.length < 1" aria-label="Open shopping cart"
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

	<div class="relative">
		<!-- Overlay for blur and blocking interaction -->
		<div v-if="isSheetOpen"
			class="fixed inset-0 z-20 bg-black/10 backdrop-blur-[.5px]  pointer-events-auto transition-all duration-300">
		</div>

		<main
			:class="[isSheetOpen ? 'pointer-events-none select-none blur-sm' : '', 'bg-cyan-50/30 font-space-grotesk transition-all duration-300']">
			<div class="flex w-full p-20 gap-10 divide-x divide-gray-300">
				<div class="basis-1/4 ">
					<div class="flex items-center gap-1 h-10 mb-10 w-[calc(100%-3.5rem)]">
						<input type="text" placeholder="Search for courses"
							class=" p-2 border border-gray-300 rounded-l-md h-full w-full" />
						<button
							class="bg-cyan-600 rounded-r-md h-full w-12 inline-flex items-center justify-center hover:bg-cyan-600/70  cursor-pointer transition duration-200">
							<MagnifyingGlassIcon class="size-5 text-white" />
						</button>
					</div>
					<div class="flex flex-col gap-5">
						<h2 class="text-xl font-semibold">Filters</h2>
						<ul class="*:flex *:gap-2 *:w-fit">
							<li class="hover:text-cyan-500 transition duration-200 *:accent-cyan-700">
								<input type="radio" id="subject" name="filter" value="subject" />
								<label for="subject">Subject</label>
							</li>
							<li class="hover:text-cyan-500 transition duration-200 *:accent-cyan-700">
								<input type="radio" id="location" name="filter" value="location" />
								<label for="location">Location</label>
							</li>
							<li class="hover:text-cyan-500 transition duration-200 *:accent-cyan-700">
								<input type="radio" id="price" name="filter" value="price" />
								<label for="price">Price</label>
							</li>
							<li class="hover:text-cyan-500 transition duration-200 *:accent-cyan-700">
								<input type="radio" id="available" name="filter" value="available" />
								<label for="available">Availability</label>
							</li>
						</ul>
						<div>
							<h3 class="text-md font-medium mb-2"> Sort by </h3>
							<ul class="*:flex *:gap-2 w-fit pl-4">
								<li class="hover:text-cyan-500 transition duration-200 *:accent-cyan-700">
									<input type="radio" id="ascending" name="sort" value="ascending" checked />
									<label for="ascending">Ascending</label>
								</li>
								<li class="hover:text-cyan-500 transition duration-200 *:accent-cyan-700">
									<input type="radio" id="descending" name="sort" value="descending" />
									<label for="descending">Descending</label>
								</li>
							</ul>
						</div>
						<button
							class="bg-cyan-600 text-white px-4 py-2 rounded-md w-[calc(100%-3.5rem)] cursor-pointer hover:bg-cyan-600/70 transition duration-200">
							Apply
						</button>
					</div>
				</div>
				<div class="basis-3/4 px-4">
					<div class="flex items-end justify-between mb-10">
						<h2 class="text-2xl font-semibold">All Courses</h2>
						<button
							class="text-base hover:underline hover:text-cyan-500 transition duration-200 cursor-pointer">
							Clear filters
						</button>
					</div>
					<div
						class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full overflow-y-auto max-h-[calc(100vh-112px)] p-1 pb-5 ">
						<CourseCard v-for="(course) in courses" :key="course.id" :id="course.id"
							:imageUrl="course.imageUrl" :title="course.name" :location="course.location"
							:price="course.price" :slots="course.inStock" :description="course.description" />
					</div>
				</div>
			</div>
		</main>
	</div>

	<Transition enter-active-class="transition-transform duration-300" enter-from-class="translate-x-full"
		enter-to-class="translate-x-0" leave-active-class="transition-transform duration-300"
		leave-from-class="translate-x-0" leave-to-class="translate-x-full">
		<Sheet v-if="isSheetOpen" @close="closeSheet" />
	</Transition>
</template>
