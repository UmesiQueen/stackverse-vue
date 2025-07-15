import { reactive, ref } from 'vue';
import rawCourses from './data.json';

// Type definitions
export interface CartItem {
  id: string;
  count: number;
}

export interface Course {
  id: string;
  name?: string;
  price?: number;
  imageUrl?: string;
  inStock?: number;
  location?: string;
  description?: string;
}

export const cartItems = reactive<CartItem[]>([]);
export const courses = reactive<Course[]>(
  rawCourses.map(course => ({ ...course }))
);

export const isSheetOpen = ref(false);
export function toggleSheet() {
  isSheetOpen.value = !isSheetOpen.value;
}