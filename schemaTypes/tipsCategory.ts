// schemaTypes/tipsCategory.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tipsCategory',
  title: 'Tips-kategori',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
  ],
})
