<script setup>
import { ShoppingBagIcon, MapPinIcon, CheckBadgeIcon } from "@heroicons/vue/24/solid";
import { defineProps, ref, computed } from "vue";
import { cartItems, courses } from '../store';

const props = defineProps({
    id: String,
    title: String,
    imageUrl: String,
    location: String,
    price: [String, Number],
    slots: [String, Number],
    description: String
});

const showToast = ref(false);
const toastMsg = ref("");
let toastTimeout = null;

const course = computed(() => courses.find(c => c.id === props.id));
const space = computed(() => course.value && course.value.space !== undefined ? course.value.space : 0);

function triggerToast(msg) {
    toastMsg.value = msg;
    showToast.value = true;
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        showToast.value = false;
    }, 2000);
}

function addToCart() {
    if (space.value < 1) return;
    const idx = cartItems.findIndex(item => item.id === props.id);
    if (idx !== -1) {
        cartItems[idx].count += 1;
    } else {
        cartItems.push({ id: props.id, count: 1 });
    }
    if (course.value) course.value.space -= 1;
    triggerToast(`Added '${props.title}' to cart`);
}
</script>

<template>
    <div>
        <transition name="toast-slide">
            <div v-if="showToast"
                class="fixed bottom-8 right-8 z-50 bg-cyan-900/80 min-w-[500px] text-white backdrop-blur-sm px-6 py-3 border border-cyan-700 rounded-lg shadow-lg text-center text-sm font-medium inline-flex items-center gap-2 transition-all">
                <CheckBadgeIcon class="size-5" />
                <p> {{ toastMsg }}</p>
            </div>
        </transition>
        <div
            class=" bg-white font-space-grotesk flex flex-col overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
            <div class="w-full h-52 relative group border-b border-gray-100">
                <img :src="imageUrl" alt="Course Image"
                    class="w-full h-full object-cover object-left-top group-hover:scale-105 transition-transform duration-200" />
                <button @click="addToCart" :aria-label="`Add ${title} to cart`" :disabled="space < 1"
                    class="bg-white/80 rounded-full p-2 absolute right-2 top-2 hover:bg-white transition-all duration-200 cursor-pointer peer hidden group-hover:block drop-shadow-xl/50 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ShoppingBagIcon class="size-6 text-gray-950/80" />
                </button>
                <p role="tooltip"
                    class="text-white bg-gray-950/80 p-1 px-2 text-xs rounded-full hidden peer-hover:block  absolute top-7 right-10 transition-all duration-200 ease-in-out delay-75 drop-shadow-lg">
                    <span v-if="space > 0">Add to Cart</span>
                    <span v-else>Out of Stock</span>
                </p>
            </div>
            <div class="p-4 grid grid-rows-[auto_auto_1fr_auto_auto] gap-2">
                <h2 class="font-bold text-lg">{{ title }}</h2>
                <p class="text-sm text-cyan-500 inline-flex items-center gap-1">
                    <MapPinIcon class="size-4" /> {{ location }}
                </p>
                <p class="text-sm">{{ description }}</p>
                <p class="text-sm"><span class="font-semibold">Available slots:</span> {{ space }}</p>
                <div class="flex items-end justify-between mt-3">
                            <p class="text-xl font-semibold"> ${{ price }}</p>
                            <button @click="addToCart" :aria-label="`Add ${title} to cart`" :disabled="space < 1"
                                class="bg-cyan-900 w-fit text-white text-sm p-2 rounded-md cursor-pointer hover:bg-cyan-900/70 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                <span v-if="space > 0">Add to Cart</span>
                                <span v-else>Out of Stock</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
</template>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-slide-enter-from {
    opacity: 0;
    transform: translate(60px, 60px) scale(0.95);
}

.toast-slide-enter-to {
    opacity: 1;
    transform: translate(0, 0) scale(1);
}

.toast-slide-leave-from {
    opacity: 1;
    transform: translate(0, 0) scale(1);
}

.toast-slide-leave-to {
    opacity: 0;
    transform: translate(60px, 60px) scale(0.95);
}
</style>
