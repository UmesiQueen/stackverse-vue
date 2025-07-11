import { reactive } from 'vue';
import rawCourses from './data.json';

export const cartItems = reactive([]);
export const courses = reactive(
  rawCourses.map(course => ({ ...course }))
);