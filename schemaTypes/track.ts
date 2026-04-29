// schemaTypes/track.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'track',
  title: 'Travbane',
  type: 'document',

  groups: [
    {name: 'basic', title: 'Grunnleggende', default: true},
    {name: 'location', title: 'Adresse'},
    {name: 'pricing', title: 'Oppseling (intern)'},
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'abbreviation',
      title: 'Baneforkortelse',
      type: 'string',
      group: 'basic',
      description: 'For eksempel B, J, M, F osv.',
    }),

    // ADRESSE
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      group: 'location',
    }),

    defineField({
      name: 'postalCode',
      title: 'Postnummer',
      type: 'string',
      group: 'location',
    }),

    defineField({
      name: 'postalPlace',
      title: 'Poststed',
      type: 'string',
      group: 'location',
    }),

    defineField({
      name: 'country',
      title: 'Land',
      type: 'string',
      group: 'location',
      options: {
        list: [
          {title: 'Norge', value: 'NO'},
          {title: 'Sverige', value: 'SE'},
          {title: 'Danmark', value: 'DK'},
          {title: 'Finland', value: 'FI'},
          {title: 'Frankrike', value: 'FR'},
          {title: 'Andre', value: 'OTHER'},
        ],
      },
      initialValue: 'NO',
    }),

    // 🔥 INTERN OPPSSELINGSPRIS
    defineField({
      name: 'internalStartPrice',
      title: 'Pris på oppseling (intern)',
      type: 'number',
      group: 'pricing',
      description: 'Brukes kun internt til beregning. Vises ikke på nettside.',
    }),

    defineField({
      name: 'vatMode',
      title: 'MVA',
      type: 'string',
      group: 'pricing',
      options: {
        list: [
          {title: 'MVA', value: 'vat'},
          {title: 'Fritatt mva', value: 'exempt'},
        ],
        layout: 'radio',
      },
      initialValue: 'vat',
    }),

    // EKSTRA INFO (valgfritt)
    defineField({
      name: 'trackLength',
      title: 'Banelengde (meter)',
      type: 'number',
      group: 'basic',
    }),

    defineField({
      name: 'stretchLength',
      title: 'Oppløpslengde (meter)',
      type: 'number',
      group: 'basic',
    }),

    defineField({
      name: 'link',
      title: 'Lenke',
      type: 'url',
      group: 'basic',
    }),

    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      group: 'basic',
      options: {hotspot: true},
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'postalPlace',
      abbreviation: 'abbreviation',
    },
    prepare({title, subtitle, abbreviation}) {
      return {
        title,
        subtitle: [abbreviation, subtitle].filter(Boolean).join(' • '),
      }
    },
  },
})