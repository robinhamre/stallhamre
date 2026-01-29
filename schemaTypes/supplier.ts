// schemaTypes/supplier.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'supplier',
  title: 'Leverandør',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'name'},
  },
})
