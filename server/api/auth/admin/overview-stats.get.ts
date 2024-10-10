import { PrismaClient } from '@prisma/client'
import { serverSupabaseUser } from '#supabase/server'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  let user = null
  try {
    user = await serverSupabaseUser(event)
  }
  catch (e) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  if (!user || user.role !== 'eshop_admin')
    throw createError({ statusCode: 401, message: 'Unauthorized' })

  // 1 month ago
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

  // 1 hour ago
  const oneHourAgo = new Date()
  oneHourAgo.setHours(oneHourAgo.getHours() - 1)

  const totalRevenueRes = await prisma.orders.aggregate({
    _sum: {
      total: true,
    },
  })

  const totalRevenue1MonthAgoRes = await prisma.orders.aggregate({
    _sum: {
      total: true,
    },
    where: {
      createdAt: {
        gte: oneMonthAgo.toISOString(),
      },
    },
  })

  const totalRevenue = totalRevenueRes._sum.total ? totalRevenueRes._sum.total / 100 : 0
  const totalRevenue1MonthAgo = totalRevenue1MonthAgoRes._sum.total ? totalRevenue1MonthAgoRes._sum.total / 100 : 0
  const totalRevenueChange = totalRevenue - totalRevenue1MonthAgo || 0

  const usersRes = await prisma.users.count()
  const users1MonthAgoRes = await prisma.users.count({
    where: {
      created_at: {
        gte: oneMonthAgo.toISOString(),
      },
    },
  })
  const users = usersRes || 0
  const users1MonthAgo = users1MonthAgoRes || 0
  const usersChange = users - users1MonthAgo || 0

  const ordersRes = await prisma.orders.count()

  const orders1MonthAgoRes = await prisma.orders.count({
    where: {
      createdAt: {
        gte: oneMonthAgo.toISOString(),
      },
    },
  })

  const orders = ordersRes || 0
  const orders1MonthAgo = orders1MonthAgoRes || 0
  const ordersChange = orders - orders1MonthAgo || 0

  const totalProductsRes = await prisma.products.count()
  const totalProducts1MonthAgoRes = await prisma.products.count({
    where: {
      createdAt: {
        gte: oneMonthAgo.toISOString(),
      },
    },
  })

  const totalProducts = totalProductsRes || 0
  const totalProducts1MonthAgo = totalProducts1MonthAgoRes || 0
  const totalProductsChange = totalProducts - totalProducts1MonthAgo || 0

  return {
    totalRevenue,
    totalRevenueChange,
    users,
    usersChange,
    orders,
    ordersChange,
    totalProducts,
    totalProductsChange,
  }
})
