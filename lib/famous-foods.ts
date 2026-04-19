export interface FamousFood {
  name: string
  nameBangla: string
  description: string
  image: string
}

export const districtFoods: Record<string, FamousFood[]> = {
  "Dhaka": [
    { name: "Haji Biriyani", nameBangla: "হাজী বিরিয়ানী", description: "Legendary mutton biryani from Old Dhaka, slow-cooked with aromatic spices", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400" },
    { name: "Bakarkhani", nameBangla: "বাকরখানি", description: "Traditional crispy flatbread, perfect with tea or curry", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" },
  ],
  "Chittagong": [
    { name: "Mezban Beef", nameBangla: "মেজবানের গরুর মাংস", description: "Traditional Chittagonian beef curry served at community feasts", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400" },
    { name: "Shutki Bhorta", nameBangla: "শুঁটকি ভর্তা", description: "Spicy dried fish mash, a Chittagong specialty", image: "https://sunbd24.com/wp-content/uploads/2016/06/Shutki.jpg?w=400" },
  ],
  "Chattogram": [
    { name: "Mezban Beef", nameBangla: "মেজবানের গরুর মাংস", description: "Traditional Chittagonian beef curry served at community feasts", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400" },
    { name: "Shutki Bhorta", nameBangla: "শুঁটকি ভর্তা", description: "Spicy dried fish mash, a Chittagong specialty", image: "https://sunbd24.com/wp-content/uploads/2016/06/Shutki.jpg?w=400" },
  ],
  "Cox's Bazar": [
    { name: "Fresh Seafood", nameBangla: "তাজা সামুদ্রিক মাছ", description: "Grilled lobster, crab, and fresh catch from the Bay of Bengal", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400" },
    { name: "Shutki", nameBangla: "শুঁটকি", description: "Sun-dried fish, a local delicacy with intense flavors", image: "https://images.squarespace-cdn.com/content/v1/5ea5f3913b0ccf06d0ec2563/b4f80910-4e22-400a-8754-ff2e44a98987/Pohela+Boishakh+2021+-+The+Spice+Odyssey+%2825%29.jpg?w=400" },
  ],
  "Sylhet": [
    { name: "Satkora Beef", nameBangla: "সাতকরা গোশত", description: "Aromatic beef curry with wild citrus fruit unique to Sylhet", image: "https://cdx.dhakamail.com/media/images/2022January/satkoralead-20220206123307.jpg?w=400" },
    { name: "Pitha", nameBangla: "পিঠা", description: "Traditional rice cakes, especially famous during winter", image: "https://www.dhakatimes24.com/assets/news_photos/2024/01/09/image-338988.jpg?w=400" },
  ],
  "Comilla": [
    { name: "Roshmalai", nameBangla: "রসমালাই", description: "World-famous creamy milk dessert, Comilla's pride", image: "https://www.shampratikdeshkal.com/uploads/2020/07/online/photos/malai-5f12c36b92982.jpg?w=400" },
    { name: "Khir", nameBangla: "ক্ষীর", description: "Rich rice pudding made with fresh milk", image: "https://www.sangbadpratidin.in/wp-content/uploads/2018/10/rice-kheer.jpg?w=400" },
  ],
  "Rajshahi": [
    { name: "Mango", nameBangla: "আম", description: "World-renowned Fazli, Langra, and Himsagar mangoes", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400" },
    { name: "Kalai Ruti", nameBangla: "কলাই রুটি", description: "Traditional flatbread made from black gram", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Kalai_ruti_with_bhurta_%26_duck_meat.jpg/250px-Kalai_ruti_with_bhurta_%26_duck_meat.jpg?w=200" },
  ],
  "Khulna": [
    { name: "Galda Chingri", nameBangla: "গলদা চিংড়ি", description: "Giant freshwater prawns from the Sundarbans region", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400" },
    { name: "Sundarbans Honey", nameBangla: "সুন্দরবনের মধু", description: "Pure wild honey collected from the mangrove forest", image: "https://fbbazar.com/wp-content/uploads/2024/12/Sundarban-chak-honey-wholesale-price-in-Bangladesh-1-kg.jpg?w=400" },
  ],
  "Bagerhat": [
    { name: "Galda Chingri", nameBangla: "গলদা চিংড়ি", description: "Giant freshwater prawns from the Sundarbans region", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400" },
    { name: "Ilish Bhapa", nameBangla: "ইলিশ ভাপা", description: "Steamed hilsa fish with mustard paste", image: "https://assets.telegraphindia.com/abp/2023/Sep/1694612327_untitled-design-48.jpg?w=400" },
  ],
  "Rangamati": [
    { name: "Bamboo Chicken", nameBangla: "বাঁশের মুরগি", description: "Tribal delicacy - chicken cooked inside bamboo", image: "https://villagesquare.in/wp-content/uploads/2025/09/LEAD-9.jpg?w=400" },
    { name: "Nappi", nameBangla: "নাপ্পি", description: "Fermented fish paste used in tribal cuisine", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAoyIIrZ8ZVON8YW_-s8qYKNP4-O1OZcZOGw&s?w=400" },
  ],
  "Bandarban": [
    { name: "Bamboo Chicken", nameBangla: "বাঁশের মুরগি", description: "Tribal delicacy - chicken cooked inside bamboo", image: "https://villagesquare.in/wp-content/uploads/2025/09/LEAD-9.jpg?w=400" },
    { name: "Traditional Rice Wine", nameBangla: "পাহাড়ি মদ", description: "Local rice-based beverage of the hill tribes", image: "https://statics.vinpearl.com/vietnamese-rice-wine-02_1687575887.jpg?w=400" },
  ],
  "Barishal": [
    { name: "Ilish Paturi", nameBangla: "ইলিশ পাতুরি", description: "Hilsa fish wrapped in banana leaf with spices", image: "https://bengali.cdn.zeenews.com/bengali/sites/default/files/2018/07/22/129311-ilish-paturi.jpg?w=400" },
    { name: "Coconut Sweets", nameBangla: "নারিকেলের মিষ্টি", description: "Traditional coconut-based desserts", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLdsBF5yPqu4ETwwD4I87b_i7lFb21KXhzg&s?w=400" },
  ],
  "Barisal": [
    { name: "Ilish Paturi", nameBangla: "ইলিশ পাতুরি", description: "Hilsa fish wrapped in banana leaf with spices", image: "https://bengali.cdn.zeenews.com/bengali/sites/default/files/2018/07/22/129311-ilish-paturi.jpg?w=400" },
    { name: "Coconut Sweets", nameBangla: "নারিকেলের মিষ্টি", description: "Traditional coconut-based desserts", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLdsBF5yPqu4ETwwD4I87b_i7lFb21KXhzg&s?w=400" },
  ],
  "Rangpur": [
    { name: "Shidal Shutki", nameBangla: "শিদল শুঁটকি", description: "Fermented dried fish, a northern delicacy", image: "https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/11/sid-4.jpg?size=*:500?w=400" },
    { name: "Alu Bhorta", nameBangla: "আলু ভর্তা", description: "Mashed potato with mustard oil and spices", image: "https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/09/Aloo-Bharta.jpg?size=*:900?w=400" },
  ],
  "Bogra": [
    { name: "Bogra Doi", nameBangla: "বগুড়ার দই", description: "Famous creamy yogurt, a must-try delicacy", image: "https://bogurardoi.com/wp-content/uploads/2024/10/%E0%A6%AC%E0%A6%97%E0%A7%81%E0%A6%A1%E0%A6%BC%E0%A6%BE%E0%A6%B0-%E0%A6%95%E0%A6%BE%E0%A6%AA-%E0%A6%A6%E0%A6%87.jpg?w=400" },
    { name: "Chamcham", nameBangla: "চমচম", description: "Sweet milk-based dessert coated in coconut", image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/BD_Porabarir_Chamcham.JPG?w=400" },
  ],
  "Mymensingh": [
    { name: "Monda Mithoi", nameBangla: "মন্ডা মিঠাই", description: "Traditional sweet made from reduced milk", image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Monda.jpg?w=400" },
    { name: "Ilish Bhuna", nameBangla: "ইলিশ ভুনা", description: "Dry-fried hilsa fish with aromatic spices", image: "https://cdn.banglatribune.net/contents/cache/images/1200x630x1xxxxx1/uploads/media/2019/04/11/b7be66786eb3980f989dccddc640d304-5caf42a81ab10.jpg?w=400" },
  ],
  "Dinajpur": [
    { name: "Lichi", nameBangla: "লিচু", description: "Famous Dinajpur litchi, sweetest in Bangladesh", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH8oLvvNWkHtslXQlN8WMVh5rCtH42DNHdiA&s?w=400" },
    { name: "Kataribhog Rice", nameBangla: "কাটারিভোগ চাল", description: "Aromatic rice variety unique to Dinajpur", image: "https://cdn.jagonews24.com/media/imgAllNew/BG/2019November/ric2-20220302085702.jpg?w=400" },
  ],
  "Moulvibazar": [
    { name: "Seven Layer Tea", nameBangla: "সাত রং চা", description: "Unique layered tea with different flavors in each layer", image: "https://i0.wp.com/adarbepari.com/wp-content/uploads/2016/10/7-layered-tea.jpg?fit=360%2C243&ssl=1?w=400" },
    { name: "Paan", nameBangla: "পান", description: "Premium betel leaf from tea garden region", image: "https://assets.telegraphindia.com/abp/2019/3/6/1606478171_5fc0e95b22364_betel.jpg?w=400" },
  ],
}

// Default food for districts not in the list
export const defaultFood: FamousFood[] = [
  { name: "Hilsa Fish Curry", nameBangla: "ইলিশ মাছের তরকারি", description: "Bangladesh's national fish cooked in traditional style", image: "https://assets.telegraphindia.com/abp/2023/Aug/1691421696_kasundi.jpg?w=400" },
  { name: "Biryani", nameBangla: "বিরিয়ানী", description: "Aromatic rice dish with tender meat and spices", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400" },
]

export function getFamousFoods(district: string): FamousFood[] {
  return districtFoods[district] || defaultFood
}
