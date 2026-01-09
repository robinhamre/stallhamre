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

    defineField({
      name: 'driver',
      title: 'Kusk',
      type: 'reference',
      to: [{type: 'driver'}],
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'track',
      title: 'Travbane',
      type: 'reference',
      to: [{type: 'track'}],
      validation: Rule => Rule.required(),
    }),

    // ✅ NYTT FELT – LØPSTYPE
    defineField({
      name: 'raceType',
      title: 'Løpstype',
      type: 'string',
      options: {
        list: [
          {title: 'Løp', value: 'lop'},
          {title: 'V75', value: 'v75'},
          {title: 'V86', value: 'v86'},
          {title: 'V85', value: 'v85'},
          {title: 'V65', value: 'v65'},
        ],
        layout: 'radio', // ← ryddig UI (én valgt)
      },
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
