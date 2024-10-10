import { h } from 'vue'
import type { orders } from '@prisma/client'
import type { ColumnDef } from '@tanstack/vue-table'
import DropdownAction from '@/components/AdminComponents/orders/data-table-dropdown.vue'
import DataTableColumnHeader from '@/components/common/table/DataTableColumnHeader.vue'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<orders>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected(),
      'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      'checked': row.getIsSelected(),
      'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'id'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left' }, row.id)
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'User Name' }),
    cell: ({ row }) => {
      const name = row.getValue('name') as string || 'N/A'
      return h('div', { class: 'text-left font-medium' }, name)
    },
  },
  {
    id: 'userAddress',
    accessorFn: row => `${row.street}, ${row.city}, ${row.country}, ${row.zipcode}`,
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'User Address' }),
    cell: ({ row }) => {
      const userAddress = row.getValue('userAddress') as string || 'N/A'
      return h('div', { class: 'text-left' }, userAddress)
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Created At' }),
    cell: ({ row }) => {
      let createdDate = row.getValue('createdAt') as string || 'N/A'
      createdDate = new Date(createdDate).toLocaleString()
      return h('div', { class: 'text-left' }, createdDate)
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Total' }),
    cell: ({ row }) => {
      const total: string = `${(row.getValue('total') as number) / 100}€`
      return h('div', { class: 'text-left' }, total)
    },
  },
  {
    accessorKey: 'stripeId',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Stripe ID' }),
    cell: ({ row }) => {
      const stripeId = row.getValue('stripeId') as string || 'N/A'
      return h('div', { class: 'text-left' }, stripeId)
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        order,
      }))
    },
  },
]
