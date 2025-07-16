<script setup>
import { TrashIcon, ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";
import { ref, computed } from "vue";
import { cartItems, courses } from "../store.js";

function getCourse(id) {
    return courses.find((c) => c.id === id);
}

const prevCounts = ref({});

function removeItem(id) {
    const idx = cartItems.findIndex((item) => item.id === id);
    if (idx !== -1) {
        const item = cartItems[idx];
        const course = getCourse(id);
        if (course) course.space += item.count;
        cartItems.splice(idx, 1);
        delete prevCounts.value[id];
    }
}

function getMaxCount(item) {
    const course = getCourse(item.id);
    return course ? course.space + item.count : 1;
}

function onCountInput(item) {
    const course = getCourse(item.id);
    if (!course) return;
    const prev = prevCounts.value[item.id] ?? item.count;
    let newCount = item.count;
    if (newCount < 1) newCount = 1;
    if (newCount > course.space + prev) newCount = course.space + prev;
    const diff = newCount - prev;
    course.space -= diff;
    item.count = newCount;
    prevCounts.value[item.id] = newCount;
}

// --- Checkout form logic ---
const name = ref("");
const phone = ref("");
const showToast = ref(false);
const isLoading = ref(false);

const nameValid = computed(() => /^[A-Za-z\s]+$/.test(name.value.trim()));
const phoneValid = computed(() => /^[0-9]+$/.test(phone.value.trim()));
const formValid = computed(() => nameValid.value && phoneValid.value);

const disableCheckoutBtn = computed(() =>
    !formValid.value || cartItems.length < 1 || isLoading.value
);

async function submitOrder(e) {
    e.preventDefault();
    isLoading.value = true;
    const formData = {
        name: name.value.trim(),
        phone: phone.value.trim(),
        cartItems: cartItems.map(item => ({
            id: item.id,
            count: item.count
        }))
    };

    if (formValid.value) {
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error(`Order not Created! status: ${response.status}`)
            }

            const result = await response.json()
            console.log('Order created:', result)

            // Make the lesson update request after successful order creation
            try {
                const updateResponse = await fetch('/api/lessons/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'reduce-spaces',
                        orderId: result.orderId,
                        cartItems: result.order.cartItems
                    })
                })

                if (!updateResponse.ok) {
                    throw new Error(`Lesson update failed! status: ${updateResponse.status}`)
                }

                const updateResult = await updateResponse.json()
                console.log('Lesson spaces updated:', updateResult)

                resetForm(); // Clear form and cart only after both requests succeed

            } catch (updateErr) {
                console.error('Error updating lesson spaces:', updateErr)
                alert('Order created successfully, but there was an issue updating lesson spaces. Please contact support.')
            }

        } catch (err) {
            console.error('Error:', err)
            alert('Failed to submit order. Please try again.');
        } finally {
            isLoading.value = false
        }
    }
}

function resetForm() {
    name.value = '';
    phone.value = '';
    cartItems.length = 0; // Clear cart
    prevCounts.value = {}; // Reset previous counts
    showToast.value = true; // Show success toast

    // Hide toast after 2 seconds
    setTimeout(() => {
        showToast.value = false;
    }, 3000);
}
</script>

<template>
    <div class="p-20 font-space-grotesk">
        <h2 class="font-lilita text-xl font-semibold">Shopping Cart</h2>
        <div class="mt-5 flex gap-5 *:flex-grow *:w-full w-full min-h-[400px]">
            <div class="flex flex-col gap-4">
                <template v-if="cartItems.length">
                    <div v-for="(item) in cartItems" :key="item.id"
                        class="flex items-center gap-4 border-b border-gray-300 pb-4">
                        <div class="border-1 border-black w-20 aspect-square bg-top-left bg-cover"
                            :style="{ backgroundImage: `url(${(getCourse(item.id)?.imageUrl) || ''})` }" />
                        <div class="flex flex-col justify-between h-full gap-1">
                            <h3 class="font-medium">{{ getCourse(item.id)?.topic || 'Course title' }}</h3>
                            <p class="text-lg font-semibold text-cyan-600">${{ getCourse(item.id)?.price || 0 }}</p>
                            <input type="number" min="1" :max="getMaxCount(item)" v-model.number="item.count"
                                @input="onCountInput(item)"
                                class="border border-gray-300 rounded-md w-16 p-1 text-center" />
                        </div>
                        <button
                            class="ml-auto p-2 rounded-full hover:bg-gray-200 transition duration-200 cursor-pointer"
                            @click="removeItem(item.id)">
                            <TrashIcon class="size-5 text-gray-400" />
                        </button>
                    </div>
                </template>
                <template v-else>
                    <p class="text-center text-gray-400">Your cart is empty.</p>
                </template>
                <div class="flex items-center justify-between py-4 px-6 border-y border-gray-300 mt-auto">
                    <p class="text-lg font-semibold">Subtotal:</p>
                    <p class="text-lg">${{cartItems.reduce((sum, item) => sum + (getCourse(item.id)?.price || 0) *
                        item.count,
                        0).toFixed(2)}}</p>
                </div>
            </div>
            <div class="self-end">
                <div class="mx-auto w-full max-w-md">
                    <h2 class="font-lilita text-xl font-semibold mb-5">Proceed to checkout</h2>
                    <form @submit="submitOrder" class="w-full max-w-md flex flex-col gap-5 relative">
                        <input v-model="name" type="text" placeholder="Name"
                            class="border border-gray-300 rounded-md p-2"
                            :class="{ 'border-red-500': name.valueOf() && !nameValid }" autocomplete="off" />
                        <span v-if="name.valueOf() && !nameValid"
                            class="text-red-500 text-xs absolute top-11 left-1">Name must be
                            letters
                            only.</span>
                        <input v-model="phone" type="text" placeholder="Phone"
                            class="border border-gray-300 rounded-md p-2"
                            :class="{ 'border-red-500': phone.valueOf() && !phoneValid }" autocomplete="off" />
                        <span v-if="phone.valueOf() && !phoneValid"
                            class="text-red-500 text-xs absolute bottom-13 left-1">Phone
                            must be numbers
                            only.</span>
                        <button type="submit"
                            :disabled="disableCheckoutBtn"
                            class="bg-cyan-600 text-white px-4 py-2 text-lg rounded-md w-full cursor-pointer hover:bg-cyan-600/70 transition duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed ">
                            <p v-if="!isLoading">Checkout</p>
                            <p v-else class="animate-spin">↺</p>
                        </button>
                    </form>
                </div>
                <transition name="fade">
                    <div v-if="showToast"
                        class="fixed top-50 right-1/2 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded shadow-lg w-80 h-56 inline-flex flex-col gap-1 items-center justify-center z-50 animate-bounce-in border border-gray-300">
                        <img src="../assets/success.gif" alt="Success GIF" class="w-24 h-20 mb-2" />
                        <p class="font-lilita text-2xl">Order Created!</p>
                        <p>Thank you for your purchase.</p>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@keyframes bounce-in {
    0% {
        transform: translateY(40px) scale(0.95);
        opacity: 0;
    }

    60% {
        transform: translateY(-10px) scale(1.05);
        opacity: 1;
    }

    100% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
}

.animate-bounce-in {
    animation: bounce-in 0.5s;
}
</style>