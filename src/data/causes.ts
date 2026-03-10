export type Cause = {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
};

export const categories = [
  { name: "All", icon: "🏠" },
  { name: "Food", icon: "🍽️" },
  { name: "Birthday", icon: "🎂" },
  { name: "Environment", icon: "🌿" },
  { name: "Animals", icon: "🐾" },
  { name: "Education", icon: "📚" },
  { name: "Orphanage", icon: "🏡" },
  { name: "Healthcare", icon: "🏥" },
];

export const causes: Cause[] = [
  { id: "homeless", title: "Feed a Homeless Person", price: "₹30/Person", image: "https://media.thaagam.ngo/media/deps/causes/card/hl_card_image.jpeg", category: "Food" },
  { id: "virtual_birthday_cake", title: "Virtual Cake Cutting Celebration", price: "₹4000/Celebration", image: "https://media.thaagam.ngo/media/deps/causes/card/vbc.jpeg", category: "Birthday" },
  { id: "thaali", title: "Thaali Meals", price: "₹60/Person", image: "https://media.thaagam.ngo/media/deps/causes/card/d_thaali_cd.jpg", category: "Food" },
  { id: "chicken_briyani", title: "Chicken Biryani", price: "₹120/Person", image: "https://media.thaagam.ngo/media/deps/causes/card/chicken_briyani.webp", category: "Food" },
  { id: "stray_dog", title: "Feed a Stray Dog", price: "₹35/Stray Dog", image: "https://media.thaagam.ngo/media/deps/causes/card/stray_dog.webp", category: "Animals" },
  { id: "plant_tree", title: "Plant a Tree", price: "₹70/Sapling", image: "https://media.thaagam.ngo/media/deps/causes/card/planttree.webp", category: "Environment" },
  { id: "wheel_chair", title: "Wheelchair", price: "₹6500/Person", image: "https://media.thaagam.ngo/media/deps/causes/card/wheelchair-1.webp", category: "Healthcare" },
  { id: "child_gift", title: "Gift for Children", price: "₹200/Child", image: "https://media.thaagam.ngo/media/deps/causes/card/child_gift-4.webp", category: "Orphanage" },
  { id: "napkin", title: "Give a Napkin", price: "₹40/Person", image: "https://media.thaagam.ngo/media/deps/causes/card/napkin.webp", category: "Healthcare" },
  { id: "veg_briyani", title: "Veg Biryani", price: "₹60/Person", image: "https://media.thaagam.ngo/media/deps/causes/card/veg_briyani-4.webp", category: "Food" },
  { id: "egg_briyani", title: "Egg Biryani", price: "₹70/Person", image: "https://media.thaagam.ngo/media/deps/causes/card/egg_briyani.webp", category: "Food" },
  { id: "school_bag", title: "School Bag", price: "₹500/Bag", image: "https://media.thaagam.ngo/media/deps/causes/card/school_bag.webp", category: "Education" },
  { id: "child_education", title: "Educate a Child", price: "₹800/Child", image: "https://media.thaagam.ngo/media/deps/causes/card/education-1.webp", category: "Education" },
  { id: "slipper", title: "A Pair of Slippers", price: "₹150/Child", image: "https://media.thaagam.ngo/media/deps/causes/card/slippers.webp", category: "Orphanage" },
  { id: "blanket", title: "Blanket", price: "₹200/Person", image: "https://media.thaagam.ngo/media/deps/causes/card/BL.webp", category: "Orphanage" },
  { id: "grocery_kit", title: "Grocery Kit", price: "₹500/Kit", image: "https://media.thaagam.ngo/media/deps/causes/card/grocery_kit.webp", category: "Food" },
  { id: "birthday_cake", title: "Birthday Cake", price: "₹1600 (20 children)", image: "https://media.thaagam.ngo/media/deps/causes/card/CAKE.webp", category: "Birthday" },
  { id: "bird_house", title: "Bird House", price: "₹350/House", image: "https://media.thaagam.ngo/media/deps/causes/card/bird_house.webp", category: "Environment" },
];
