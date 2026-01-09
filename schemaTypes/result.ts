// schemaTypes/result.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'result',
  title: 'Resultat',
  type: 'document',

  // ✅ Defaults (for raskere punching)
  initialValue: {
    raceType: 'lop',
    distance: '2100m',
    startMethod: 'autostart',
  },

  fieldsets: [
    {
      name: 'core',
      title: 'Grunninfo',
      options: {columns: 2},
    },
    {
      name: 'raceMeta',
      title: 'Løpsdetaljer',
      // 3 kolonner gjør at radio-felt + tid/innkjørt blir mer “kompakt”
      options: {columns: 3},
    },
  ],

  fields: [
    defineField({
      name: 'raceName',
      title: 'Løpsnavn',
      type: 'string',
      fieldset: 'core',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{type: 'resultCategory'}],
      fieldset: 'core',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'date',
      title: 'Dato',
      type: 'date',
      fieldset: 'core',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'horse',
      title: 'Hest',
      type: 'reference',
      to: [{type: 'horse'}],
      fieldset: 'core',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'driver',
      title: 'Kusk',
      type: 'reference',
      to: [{type: 'driver'}],
      fieldset: 'core',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'track',
      title: 'Travbane',
      type: 'reference',
      to: [{type: 'track'}],
      fieldset: 'core',
      validation: (Rule) => Rule.required(),
    }),

    // ✅ Løpstype (horisontal radio)
    defineField({
      name: 'raceType',
      title: 'Løpstype',
      type: 'string',
      fieldset: 'raceMeta',
      options: {
        list: [
          {title: 'Løp', value: 'lop'},
          {title: 'V75', value: 'v75'},
          {title: 'V86', value: 'v86'},
          {title: 'V85', value: 'v85'},
          {title: 'V65', value: 'v65'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),

    // ✅ Distanse (horisontal radio)
    defineField({
      name: 'distance',
      title: 'Distanse',
      type: 'string',
      fieldset: 'raceMeta',
      options: {
        list: [
          {title: '1609m', value: '1609m'},
          {title: '2100m', value: '2100m'},
          {title: '2600m', value: '2600m'},
          {title: '3100m', value: '3100m'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),

    // ✅ Plassering (horisontal radio)
    defineField({
      name: 'placing',
      title: 'Plassering',
      type: 'string',
      fieldset: 'raceMeta',
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
        layout: 'radio',
        direction: 'horizontal',
      },
    }),

    // ✅ Tid (valgfritt, kompakt)
    defineField({
      name: 'time',
      title: 'Tid',
      type: 'string',
      fieldset: 'raceMeta',
      description: 'F.eks. 1.13,8a (valgfritt)',
    }),

    // ✅ Startmetode (horisontal radio)
    defineField({
      name: 'startMethod',
      title: 'Startmetode',
      type: 'string',
      fieldset: 'raceMeta',
      options: {
        list: [
          {title: 'Autostart', value: 'autostart'},
          {title: 'Voltestart', value: 'voltestart'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),

    // ✅ Innkjørt (valgfritt)
    defineField({
      name: 'earnings',
      title: 'Innkjørt',
      type: 'number',
      fieldset: 'raceMeta',
      description: 'Beløp i kroner',
    }),
  ],
})
