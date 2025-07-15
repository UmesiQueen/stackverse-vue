import { reactive, ref } from 'vue';
import rawCourses from './data.json';


export const cartItems = reactive([]);
export const courses = reactive(
  rawCourses.map(course => ({ ...course }))
);

export const isSheetOpen = ref(false);
export function toggleSheet() {
  isSheetOpen.value = !isSheetOpen.value;
}