// schemaTypes/result.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'result',
  title: 'Resultat',
  type: 'document',
  fields: [
    defineField({
      name: 'raceName',
      title: 'Løpsnavn',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{type: 'resultCategory'}],
    }),

    defineField({
      name: 'date',
      title: 'Dato',
      type: 'date',
    }),

    defineField({
      name: 'horse',
      title: 'Hest',
      type: 'reference',
      to: [{type: 'horse'}],
    }),

    defineField({
      name: 'driver',
      title: 'Kusk',
      type: 'string',
    }),

    defineField({
      name: 'track',
      title: 'Travbane',
      type: 'reference',
      to: [{type: 'track'}],
    }),

    defineField({
      name: 'earnings',
      title: 'Innkjørt',
      type: 'number',
    }),
  ],
})
