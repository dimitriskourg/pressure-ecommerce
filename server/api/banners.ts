export default defineEventHandler(() => {
  const categories = [
    {
      id: 1,
      category: 'New Release',
      mainImageUrl: 'https://unboundathletics.gr/wp-content/uploads/2023/07/dsc04066-3.webp',
      secondImageUrl: 'https://unboundathletics.gr/wp-content/uploads/2023/10/unbound-mission-hoodie.webp',
      buttonText: 'Shop New',
      buttonLink: 'new-release',
    },
    {
      id: 2,
      category: 'Best Sellers',
      mainImageUrl: 'https://unboundathletics.gr/wp-content/uploads/2023/07/dsc04066-3.webp',
      secondImageUrl: 'https://unboundathletics.gr/wp-content/uploads/2023/10/unbound-mission-hoodie.webp',
      buttonText: 'View Products',
      buttonLink: 'best-sellers',
    },
    {
      id: 3,
      category: 'On Sale',
      mainImageUrl: 'https://unboundathletics.gr/wp-content/uploads/2023/07/dsc04066-3.webp',
      secondImageUrl: 'https://unboundathletics.gr/wp-content/uploads/2023/10/unbound-mission-hoodie.webp',
      buttonText: 'View Products',
      buttonLink: 'on-sale',
    },
  ]

  return {
    ...categories,
  }
})
