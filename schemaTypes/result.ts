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
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'date',
      title: 'Dato',
      type: 'date',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'horse',
      title: 'Hest',
      type: 'reference',
      to: [{type: 'horse'}],
      validation: Rule => Rule.required(),
    }),

    // ✅ ENDRET: fritekst → reference
    defineField({
      name: 'driver',
      title: 'Kusk',
      type: 'reference',
      to: [{type: 'driver'}],
      validation: Rule => Rule.required(),
    }),

    // ✅ ENDRET: fritekst → reference
    defineField({
      name: 'track',
      title: 'Travbane',
      type: 'reference',
      to: [{type: 'track'}],
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'earnings',
      title: 'Innkjørt',
      type: 'number',
      description: 'Beløp i kroner',
    }),
  ],
})
