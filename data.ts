
import { Dish } from './types.ts';

export const DISHES: Dish[] = [
  {
    id: '1',
    name: 'Grilled Paneer Tikka',
    price: 240,
    kcal: 634,
    protein: 25,
    carb: 23,
    fat: 52,
    fiber: 1,
    image: 'https://picsum.photos/seed/tikka/400/400',
    tags: ['Rich Calcium'],
    isVeg: true,
    isBestSeller: true,
    isHot: true,
    isHighProtein: true,
    description: 'Grilled paneer tikka is a popular Indian vegetarian starter featuring marinated cubes of paneer and vegetables, skewered and grilled to perfection.',
    ingredients: [
      { name: 'Amul fresh paneer', weight: '115g' },
      { name: 'Yogurt', weight: '29g' },
      { name: 'Bell pappers green', weight: '14g' },
      { name: 'Onions', weight: '14g' },
      { name: 'Spices turmeric', weight: '1g' },
      { name: 'Spices cumin seed', weight: '1g' },
      { name: 'Coriander poweder', weight: '1g' },
      { name: 'Spices chili powder', weight: '1g' },
      { name: 'Garam masala', weight: '1g' },
      { name: 'Salt', weight: '2g' },
      { name: 'Black pepper', weight: '1g' },
      { name: 'Ginger garlic paste', weight: '5g' },
      { name: 'Lemon juice', weight: '5ml' },
      { name: 'Vegetable oil', weight: '10ml' }
    ]
  },
  {
    id: '2',
    name: 'Tofu Broccoli Stir Fry',
    price: 320,
    kcal: 450,
    protein: 30,
    carb: 20,
    fat: 15,
    fiber: 8,
    image: 'https://picsum.photos/seed/tofu/400/400',
    tags: ['Low Carb', 'Vegan'],
    isVeg: true,
    isBestSeller: false,
    isHot: true,
    isHighProtein: true,
    description: 'A healthy and vibrant stir-fry with firm tofu, fresh broccoli florets, and a savory soy-ginger glaze.',
    ingredients: [
      { name: 'Firm Tofu', weight: '150g' },
      { name: 'Broccoli', weight: '100g' },
      { name: 'Soy Sauce', weight: '15ml' },
      { name: 'Ginger', weight: '5g' }
    ]
  },
  {
    id: '3',
    name: 'Roasted Chicken Salad',
    price: 380,
    kcal: 520,
    protein: 45,
    carb: 10,
    fat: 22,
    fiber: 6,
    image: 'https://picsum.photos/seed/salad/400/400',
    tags: ['Fiber Rich'],
    isVeg: false,
    isBestSeller: true,
    isHot: false,
    isHighProtein: true,
    description: 'Succulent roasted chicken breast pieces served over a bed of crisp greens, cherry tomatoes, and cucumbers.',
    ingredients: [
      { name: 'Chicken Breast', weight: '200g' },
      { name: 'Mixed Greens', weight: '50g' },
      { name: 'Cherry Tomatoes', weight: '30g' },
      { name: 'Olive Oil', weight: '10ml' }
    ]
  },
  {
    id: '4',
    name: 'Quinoa Veggie Bowl',
    price: 290,
    kcal: 380,
    protein: 15,
    carb: 45,
    fat: 12,
    fiber: 10,
    image: 'https://picsum.photos/seed/quinoa/400/400',
    tags: ['Gluten Free'],
    isVeg: true,
    isBestSeller: false,
    isHot: false,
    isHighProtein: false,
    description: 'A nutritional powerhouse featuring fluffy quinoa, roasted seasonal vegetables, and a light lemon tahini dressing.',
    ingredients: [
      { name: 'Cooked Quinoa', weight: '120g' },
      { name: 'Sweet Potato', weight: '60g' },
      { name: 'Kale', weight: '40g' },
      { name: 'Tahini', weight: '15g' }
    ]
  }
];
