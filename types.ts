
export interface Ingredient {
  name: string;
  weight: string;
}

export interface Macro {
  label: string;
  value: number;
  goal: number;
  unit: string;
  color: string;
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  kcal: number;
  protein: number;
  carb: number;
  fat: number;
  fiber?: number;
  image: string;
  tags: string[];
  isVeg: boolean;
  isBestSeller?: boolean;
  isHot?: boolean;
  isHighProtein?: boolean;
  description?: string;
  ingredients?: Ingredient[];
}

export interface CartItem extends Dish {
  quantity: number;
}
