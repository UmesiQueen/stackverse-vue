<script setup>
import { ref, computed, watch } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import CourseCard from "../components/CourseCard.vue";
import Sheet from "../components/Sheet.vue";
import { courses, isSheetOpen, toggleSheet, isLoading } from "../store";

// Filter state
const search = ref("");
const debouncedSearch = ref("");
const filterType = ref("");
const locationFilter = ref("");
const sortOrder = ref("ascending");
const showSuggestions = ref(false);
let debounceTimeout = null;

// Debounce search
watch(search, (val) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        debouncedSearch.value = val;
        showSuggestions.value = !!val.trim();
    }, 300);
});

// Get unique locations for filter
const locations = computed(() => Array.from(new Set(courses.map(c => c.location))));

const suggestions = computed(() => {
    if (!debouncedSearch.value.trim()) return [];
    const term = debouncedSearch.value.trim().toLowerCase();
    return courses.filter(c => c.topic.toLowerCase().includes(term)).slice(0, 5);
});

const filteredCourses = computed(() => {
    let arr = [...courses];
    // On load, show original order
    if (!filterType.value && !debouncedSearch.value.trim() && !locationFilter.value) {
        return arr;
    }
    // Subject: filter by name, sort alphabetically
    if (filterType.value === "subject") {
        arr = arr.filter(c => c.topic.toLowerCase().includes(debouncedSearch.value.trim().toLowerCase()));
        arr = arr.sort((a, b) =>
            sortOrder.value === "ascending"
                ? a.topic.localeCompare(b.topic)
                : b.topic.localeCompare(a.topic)
        );
    }
    // Price: sort by price
    else if (filterType.value === "price") {
        arr = arr.sort((a, b) =>
            sortOrder.value === "ascending" ? a.price - b.price : b.price - a.price
        );
    }
    // Location: filter by location
    else if (filterType.value === "location" && locationFilter.value) {
        arr = arr.filter(c => c.location === locationFilter.value);
    }
    // Availability: sort by space
    else if (filterType.value === "available") {
        arr = arr.sort((a, b) =>
            sortOrder.value === "ascending" ? a.space - b.space : b.space - a.space
        );
    }

    else if (debouncedSearch.value.trim()) {
        arr = arr.filter(c => c.topic.toLowerCase().includes(debouncedSearch.value.trim().toLowerCase()));
    }
    return arr;
});

function selectSuggestion(name) {
    search.value = name;
    debouncedSearch.value = name;
    showSuggestions.value = false;
    filterType.value = "subject";
}
</script>

<template>
    <div class="relative">
        <!-- Overlay for blur and blocking interaction -->
        <div v-if="isSheetOpen"
            class="fixed inset-0 z-20 bg-black/10 backdrop-blur-[.5px]  pointer-events-auto transition-all duration-300">
        </div>

        <main
            :class="[isSheetOpen ? 'pointer-events-none select-none blur-sm' : '', 'bg-cyan-50/30 font-space-grotesk transition-all duration-300']">
            <div class="flex w-full p-20 gap-10 divide-x divide-gray-300">
                <div class="basis-1/4">
                    <div class="flex items-center gap-[2px] h-10 mb-10 w-[calc(100%-3.5rem)] relative">
                        <input type="text" v-model="search" placeholder="Search for courses"
                            class="p-2 border border-gray-300 rounded-l-md h-full w-full"
                            @focus="showSuggestions = !!search.trim()" @blur="showSuggestions = false" />
                        <button
                            class="bg-cyan-600 rounded-r-md h-full w-12 inline-flex items-center justify-center hover:bg-cyan-600/70  cursor-pointer transition duration-200">
                            <MagnifyingGlassIcon class="size-5 text-white" />
                        </button>
                        <ul v-if="showSuggestions && suggestions.length"
                            class="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded shadow z-30">
                            <li v-for="s in suggestions" :key="s.id" @mousedown.prevent="selectSuggestion(s.topic)"
                                class="px-4 py-2 hover:bg-cyan-100 cursor-pointer text-gray-900">
                                {{ s.topic }}
                            </li>
                        </ul>
                    </div>
                    <div class="flex flex-col gap-5">
                        <h2 class="font-lilita text-xl font-semibold">Filters</h2>
                        <ul class="*:flex *:gap-2 *:w-fit">
                            <li class="hover:text-cyan-500 transition duration-200 *:accent-cyan-700">
                                <input type="radio" id="subject" name="filter" value="subject" v-model="filterType" />
                                <label for="subject">Subject</label>
                            </li>
                            <li class="hover:text-cyan-500 transition duration-200 *:accent-cyan-700 contents !w-full">
                                <input type="radio" id="location" name="filter" value="location" v-model="filterType" />
                                <label for="location">Location</label>
                                <select v-if="filterType === 'location'" v-model="locationFilter"
                                    class="hover:text-black text-right ml-6 text-sm">
                                    <option value="">All</option>
                                    <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
                                </select>
                            </li>
                            <li class="hover:text-cyan-500 transition duration-200 *:accent-cyan-700">
                                <input type="radio" id="price" name="filter" value="price" v-model="filterType" />
                                <label for="price">Price</label>
                            </li>
                            <li class="hover:text-cyan-500 transition duration-200 *:accent-cyan-700">
                                <input type="radio" id="available" name="filter" value="available"
                                    v-model="filterType" />
                                <label for="available">Availability</label>
                            </li>
                        </ul>
                        <div>
                            <h3 class="font-lilita text-md font-medium mb-2"> Sort by </h3>
                            <ul class="*:flex *:gap-2 w-fit pl-4">
                                <li class="hover:text-cyan-500 transition duration-200 *:accent-cyan-700">
                                    <input type="radio" id="ascending" name="sort" value="ascending"
                                        v-model="sortOrder" />
                                    <label for="ascending">Ascending</label>
                                </li>
                                <li class="hover:text-cyan-500 transition duration-200 *:accent-cyan-700">
                                    <input type="radio" id="descending" name="sort" value="descending"
                                        v-model="sortOrder" />
                                    <label for="descending">Descending</label>
                                </li>
                            </ul>
                        </div>
                        <button
                            class="bg-cyan-600 text-white px-4 py-2 rounded-md w-[calc(100%-3.5rem)] cursor-pointer hover:bg-cyan-600/70 transition duration-200"
                            @click="filterType = ''; locationFilter = ''; search = ''">
                            Clear Filters
                        </button>
                    </div>
                </div>
                <div class="basis-3/4 px-4">
                    <div class="flex items-end justify-between mb-10">
                        <h2 class="font-lilita text-2xl font-semibold">All Courses</h2>
                        <p class="text-sm"> {{ isLoading ? '...' : filteredCourses.length }} result(s)</p>
                    </div>
                    <div
                        class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full  p-1 pb-5 ">

                        <!-- Skeleton Loader -->
                        <div v-if="isLoading" v-for="n in 3" :key="'skeleton-' + n"
                            class="bg-white rounded-lg shadow-md p-6 animate-pulse">
                            <!-- Image skeleton -->
                            <div class="w-full h-48 bg-gray-300 rounded-md mb-4"></div>

                            <!-- Title skeleton -->
                            <div class="h-6 bg-gray-300 rounded-md mb-3"></div>

                            <!-- Location skeleton -->
                            <div class="h-4 bg-gray-300 rounded-md mb-3 w-3/4"></div>

                            <!-- Price skeleton -->
                            <div class="h-5 bg-gray-300 rounded-md mb-3 w-1/2"></div>

                            <!-- Description skeleton -->
                            <div class="space-y-2 mb-4">
                                <div class="h-4 bg-gray-300 rounded-md"></div>
                                <div class="h-4 bg-gray-300 rounded-md w-5/6"></div>
                            </div>

                            <!-- Slots skeleton -->
                            <div class="h-4 bg-gray-300 rounded-md mb-4 w-1/3"></div>

                            <!-- Button skeleton -->
                            <div class="h-10 bg-gray-300 rounded-md w-full"></div>
                        </div>

                        <!-- Actual Course Cards -->
                        <CourseCard v-else v-for="(course) in filteredCourses" :key="course.id" :id="course.id"
                            :imageUrl="course.imageUrl" :title="course.topic" :location="course.location"
                            :price="course.price" :slots="course.space" :description="course.description" />
                    </div>
                </div>
            </div>
        </main>

        <Transition enter-active-class="transition-transform duration-300" enter-from-class="translate-x-full"
            enter-to-class="translate-x-0" leave-active-class="transition-transform duration-300"
            leave-from-class="translate-x-0" leave-to-class="translate-x-full">
            <Sheet v-if="isSheetOpen" @close="toggleSheet" />
        </Transition>
    </div>
</template>