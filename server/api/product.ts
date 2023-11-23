export default defineEventHandler(() => {
  const product
    = { id: 1,
title: 'Unbound Performance Oversized T-Shirt',
description: 'The best T-shirt for training with inexhaustible energy! In two colors to choose from! Normal line. White Color',
images: ['https://cdn.shopify.com/s/files/1/1367/5201/files/RestDayHeavyweightT-ShirtGSSmokeyTeal-PIGMENTDYEA4A9B-TBLY-1462.jpg?v=1696606389', 'https://cdn.shopify.com/s/files/1/1367/5201/files/RestDayHeavyweightT-ShirtGSSmokeyTeal-PIGMENTDYEA4A9B-TBLY-1479.jpg?v=1696606389', 'https://cdn.shopify.com/s/files/1/1367/5201/files/RestDayHeavyweightT-ShirtGSSmokeyTeal-PIGMENTDYEA4A9B-TBLY-1474.jpg?v=1696606390', 'https://cdn.shopify.com/s/files/1/1367/5201/files/RestDayHeavyweightT-ShirtGSSmokeyTeal-PIGMENTDYEA4A9B-TBLY-1493.jpg?v=1696606390', 'https://cdn.shopify.com/s/files/1/1367/5201/files/RestDayHeavyweightT-ShirtGSSmokeyTeal-PIGMENTDYEA4A9B-TBLY-1476.jpg?v=1696606390', 'https://cdn.shopify.com/s/files/1/1367/5201/files/RestDayHeavyweightT-ShirtGSSmokeyTeal-PIGMENTDYEA4A9B-TBLY-1482.jpg?v=1696606390'],
price: 2000,
category: 'T-Shirts',
rating: 4.5,
numReviews: 10,
countInStock: 10,
discount: 10,
color: 'White',
sizes: [
      { size: 'XS', quantity: 2 },
      { size: 'S', quantity: 0 },
      { size: 'M', quantity: 10 },
      { size: 'L', quantity: 0 },
      { size: 'XL', quantity: 10 },
      { size: 'XXL', quantity: 10 },
    ],
sizeGuide: 'Regular Fit: Αγόρασε το νούμερο που φοράς κανονικά σε ρούχα/παντελόνια' }

  return {
    ...product,
  }
})
