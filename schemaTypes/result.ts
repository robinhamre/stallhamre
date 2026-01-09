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

    // Løpstype
    defineField({
      name: 'raceType',
      title: 'Løpstype',
      type: 'string',
      options: {
        list: [
          {title: 'Løp', value: 'Løp'},
          {title: 'V75', value: 'V75'},
          {title: 'V86', value: 'V86'},
          {title: 'V85', value: 'V85'},
          {title: 'V65', value: 'V65'},
        ],
        layout: 'radio',
      },
    }),

    // ✅ 1. Distanse
    defineField({
      name: 'distance',
      title: 'Distanse',
      type: 'string',
      options: {
        list: [
          {title: '1609m', value: '1609m'},
          {title: '2100m', value: '2100m'},
          {title: '2600m', value: '2600m'},
          {title: '3100m', value: '3100m'},
        ],
      },
    }),

    // ✅ 2. Plassering
    defineField({
      name: 'placement',
      title: 'Plassering',
      type: 'string',
      options: {
        list: [
          {title: '1', value: '1'},
          {title: '2', value: '2'},
          {title: '3', value: '3'},
          {title: '4', value: '4'},
          {title: '5', value: '5'},
          {title: '6', value: '6'},
          {title: '7', value: '7'},
          {title: '0', value: '0'},
          {title: 'DG', value: 'DG'},
          {title: 'STR', value: 'STR'},
        ],
      },
    }),

    // ✅ 3. Tid (valgfri)
    defineField({
      name: 'time',
      title: 'Tid',
      type: 'string',
      description: 'F.eks. 1.13,8a (valgfritt)',
    }),

    // ✅ 4. Startmetode
    defineField({
      name: 'startMethod',
      title: 'Startmetode',
      type: 'string',
      options: {
        list: [
          {title: 'Autostart', value: 'Autostart'},
          {title: 'Voltestart', value: 'Voltestart'},
        ],
        layout: 'radio',
      },
    }),

    // ✅ 5. Innkjørt
    defineField({
      name: 'earnings',
      title: 'Innkjørt',
      type: 'number',
      description: 'Beløp i kroner',
    }),
  ],
})
