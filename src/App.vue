<script setup lang="ts">
import { ShoppingCartIcon, MagnifyingGlassIcon, ArrowPathRoundedSquareIcon } from "@heroicons/vue/24/solid";
import CourseCard from "./components/CourseCard.vue";
</script>

<template>
	<header class="flex justify-between items-center bg-amber-900 text-white p-6 sticky top-0 w-full z-10">
		<h1 class="font-kaushan text-4xl font-semibold cursor-default text-shadow-lg">Online Course Shop</h1>
		<div class="flex items-center gap-3 font-space-grotesk">
			<p class="text-lg cursor-default">$0.0</p>
			<button class="relative rounded-full p-2 hover:bg-white/20 transition duration-200 cursor-pointer peer">
				<ShoppingCartIcon class="size-7" />
				<p
					class="absolute top-1 text-xs right-0 font-bold text-amber-700 bg-white rounded-full w-4 outline-1 outline-amber-70 data-[disabled=true]:outline-gray-400 ">
					0
				</p>
			</button>
			<span role="tooltip"
				class="text-white bg-gray-950/80 p-1 px-3 text-xs rounded-full hidden peer-hover:block absolute bottom-2 right-12">
				View cart
			</span>
		</div>
	</header>
	<main class="bg-amber-50/30 font-space-grotesk">
		<div class="flex w-full p-20 gap-10 divide-x divide-gray-300">
			<div class="basis-1/4 ">
				<div class="flex items-center gap-1 h-10 mb-10 w-[calc(100%-3.5rem)]">
					<input type="text" placeholder="Search for courses"
						class=" p-2 border border-gray-300 rounded-l-md h-full w-full" />
					<button
						class="bg-amber-600 rounded-r-md h-full w-12 inline-flex items-center justify-center hover:bg-amber-600/80  cursor-pointer transition duration-200">
						<MagnifyingGlassIcon class="size-5 text-white" />
					</button>
				</div>
				<div class="flex flex-col gap-5">
					<h2 class="text-xl font-semibold">Filters</h2>
					<ul class="*:flex *:gap-2 *:w-fit">
						<li class="hover:text-amber-500 transition duration-200 *:accent-amber-700">
							<input type="radio" id="subject" name="filter" value="subject" />
							<label for="subject">Subject</label>
						</li>
						<li class="hover:text-amber-500 transition duration-200 *:accent-amber-700">
							<input type="radio" id="location" name="filter" value="location" />
							<label for="location">Location</label>
						</li>
						<li class="hover:text-amber-500 transition duration-200 *:accent-amber-700">
							<input type="radio" id="price" name="filter" value="price" />
							<label for="price">Price</label>
						</li>
						<li class="hover:text-amber-500 transition duration-200 *:accent-amber-700">
							<input type="radio" id="available" name="filter" value="available" />
							<label for="available">Availability</label>
						</li>
					</ul>
					<div>
						<h3 class="text-md font-medium mb-2"> Sort by </h3>
						<ul class="*:flex *:gap-2 pl-4">
							<li class="hover:text-amber-500 transition duration-200 *:accent-amber-700">
								<input type="radio" id="ascending" name="sort" value="ascending" checked />
								<label for="ascending">Ascending</label>
							</li>
							<li class="hover:text-amber-500 transition duration-200 *:accent-amber-700">
								<input type="radio" id="descending" name="sort" value="descending" />
								<label for="descending">Descending</label>
							</li>
						</ul>
					</div>
					<button
						class="bg-amber-600 text-white px-4 py-2 rounded-md w-[calc(100%-3.5rem)] cursor-pointer hover:bg-amber-600/80 transition duration-200">
						Apply
					</button>
				</div>
			</div>
			<div class="basis-3/4 px-4">
				<div class="flex items-end justify-between mb-10">
					<h2 class="text-2xl font-semibold">All Courses</h2>
					<button
						class="text-base hover:underline hover:text-amber-500 transition duration-200 cursor-pointer">
						Clear filters
					</button>
				</div>
				<div class=" grid grid-cols-1 md:grid-cols-3 gap-7 w-full">
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped></style>
