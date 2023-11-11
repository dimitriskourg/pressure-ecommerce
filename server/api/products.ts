export default defineEventHandler(() => {
  const products = [
    { id: 1, title: 'Unbound Performance Oversized T-Shirt', description: 'The best T-shirt for training with inexhaustible energy! In two colors to choose from! Normal line. White Color', url: 'https://unboundathletics.gr/wp-content/uploads/2023/07/dsc04066-3.webp', price: 2000, category: 'T-Shirts', rating: 4.5, numReviews: 10, countInStock: 10, discount: 10 },
    { id: 2, title: 'Unbound Performance Oversized T-Shirt black', description: 'The best T-shirt for training with inexhaustible energy! In two colors to choose from! Normal line. Black Color', url: 'https://unboundathletics.gr/wp-content/uploads/2023/07/23.webp', price: 2800, category: 'T-Shirts', rating: 4.5, numReviews: 10, countInStock: 0, discount: 0 },
    { id: 3, title: 'Unbound Fitted Lightweight T-Shirt', description: 'The most stylish and stretchy t-shirt you can own! The unbound lightweight fitted - T-shirt highlights every possible point of your physique! No seams on the sleeves to hug and accentuate your shoulders evenly! The unbound lightweight fitted - T-shirt makes the difference in and out of the gym', url: 'https://unboundathletics.gr/wp-content/uploads/2023/07/40.webp', price: 2200, category: 'T-Shirts', rating: 4.5, numReviews: 10, countInStock: 10, discount: 0 },
    { id: 4, title: 'Unbound Lightweight TankTop', description: 'The unbound lightweight tanktop draws all eyes on it. Either for training or for a more casual occasion, it can be worn and bring about the desired result!! More gainz!!', url: 'https://unboundathletics.gr/wp-content/uploads/2023/08/dsc04066-1.webp', price: 1900, category: 'TankTop', rating: 4.5, numReviews: 10, countInStock: 10, discount: 20 },
    { id: 5, title: 'Unbound Smooth Mission Hoodie', description: 'Incredibly smooth and soft fabric. It will not limit you in any movement in the gym! The best form for training. Regular fit', url: 'https://unboundathletics.gr/wp-content/uploads/2023/10/unbound-mission-hoodie.webp', price: 4700, category: 'Hoodies', rating: 4.5, numReviews: 10, countInStock: 10, discount: 60 },
    { id: 6, title: 'Unbound Smooth Mission Pants', description: 'Incredibly smooth and soft fabric. It will not limit you in any movement in the gym! The best form for training. Regular fit', url: 'https://unboundathletics.gr/wp-content/uploads/2023/10/unbound-mission-pants.webp', price: 4700, category: 'Pants', rating: 4.5, numReviews: 10, countInStock: 10, discount: 60 },
  ]

  return {
    ...products,
  }
})
