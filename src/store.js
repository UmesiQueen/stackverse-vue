import { reactive, ref } from 'vue';

export const cartItems = reactive([]);
export const courses = reactive([]);
export const isLoading = ref(false);
export const error = ref(null);

export const isSheetOpen = ref(false);
export function toggleSheet() {
  isSheetOpen.value = !isSheetOpen.value;
}

export const fetchCourses = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await fetch('/api/lessons');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Clear existing courses and add new ones
    courses.splice(0, courses.length);
    data.forEach(course => {
      courses.push({ ...course });
    });

  } catch (err) {
    error.value = err.message;
    console.error('Error fetching courses:', err);
  } finally {
    isLoading.value = false;
  }
};

// Auto-fetch courses when store is imported
fetchCourses();