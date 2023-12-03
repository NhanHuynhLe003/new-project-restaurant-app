export interface FoodModel {
  food_id: string;
  food_name: string;
  food_type: string;
  food_img: string;
  food_desc?: string;
  food_rating: number;
  food_ingredients?: string[];
  food_tags?: string[];
  food_price: number;
  food_discount?: number;
  food_availability: boolean;
  created_at: string;
  updated_at: string;
}
