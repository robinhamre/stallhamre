// schemaTypes/track.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'track',
  title: 'Travbane',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Navn',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
    }),
  ],
})
