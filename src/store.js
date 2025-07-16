import { reactive, ref } from 'vue';

 const cartItems = reactive([]);
 const courses = reactive([]);
 const isLoading = ref(false);

 const isSheetOpen = ref(false);
 function toggleSheet() {
  isSheetOpen.value = !isSheetOpen.value;
}

const fetchCourses = async () => {
  isLoading.value = true;

  try {
    const response = await fetch('/api/lessons');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Clear existing courses and add new ones
    courses.splice(0, courses.length);
    data.forEach(course => {
      courses.push({ ...course,imageUrl: `https://stackverse-server.onrender.com${course.imageUrl}` });
    });

  } catch (err) {
    console.error('Error fetching courses:', err);
  } finally {
    isLoading.value = false;
  }
};

// Auto-fetch courses when store is imported
fetchCourses();

 export { cartItems , courses, isLoading, isSheetOpen, toggleSheet, fetchCourses };