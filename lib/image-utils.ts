// Image utility for consistent image handling across the app
export const imageUrls = {
  placeholder: 'https://via.placeholder.com/400?text=Loading+Image',
  bangladesh: 'https://source.unsplash.com/featured/?bangladesh,travel',
  beach: 'https://source.unsplash.com/featured/?beach,bangladesh',
  mountains: 'https://source.unsplash.com/featured/?mountains,bangladesh',
  culture: 'https://source.unsplash.com/featured/?culture,bangladesh',
  food: 'https://source.unsplash.com/featured/?food,bangladesh',
  city: 'https://source.unsplash.com/featured/?city,bangladesh',
  nature: 'https://source.unsplash.com/featured/?nature,bangladesh',
  hotel: 'https://source.unsplash.com/featured/?hotel,luxury',
  transportation: 'https://source.unsplash.com/featured/?transportation,travel',
}

export const getImageWithFallback = (primaryUrl: string, fallbackUrl: string = imageUrls.placeholder) => {
  return primaryUrl || fallbackUrl
}
