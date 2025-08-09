<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import noMobileView from '../assets/no_mobile_view.jpg'

const isMobile = ref(window.innerWidth < 1024)

function handleResize() {
    isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<template>
    <div v-if="isMobile" class="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div class="px-5 pt-14 flex flex-col gap-5 items-center max-w-[500px] mx-auto">
            <img :src="noMobileView" alt="NoMobileView" class="mix-blend-multiply w-40 aspect-square" />
            <p class="text-center font-medium">
                We're sorry, but it seems the current page cannot be viewed on your
                device due to the screen size limitation. To ensure the best user experience
                and readability, the page you're trying to access requires a larger screen size (min-width 1024px).
            </p>
        </div>
    </div>
</template>