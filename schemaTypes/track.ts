// schemaTypes/track.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'track',
  title: 'Travbane',
  type: 'document',

  groups: [
    {name: 'basic', title: 'Grunnleggende', default: true},
    {name: 'location', title: 'Adresse'},
    {name: 'internal', title: 'Oppseling internt'},
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
        layout: 'dropdown',
      },
      initialValue: 'NO',
    }),

    defineField({
      name: 'internalStartPrice',
      title: 'Pris på oppseling',
      type: 'number',
      group: 'internal',
      description: 'Brukes kun internt i systemet. Skal ikke vises på nettsiden.',
    }),

    defineField({
      name: 'internalStartVatMode',
      title: 'MVA på oppseling',
      type: 'string',
      group: 'internal',
      options: {
        list: [
          {title: 'MVA', value: 'vat'},
          {title: 'Fritatt mva', value: 'exempt'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'vat',
    }),

    defineField({
      name: 'trackLength',
      title: 'Banelengde',
      type: 'number',
      group: 'basic',
      description: 'Meter, for eksempel 1000.',
    }),

    defineField({
      name: 'stretchLength',
      title: 'Oppløpslengde',
      type: 'number',
      group: 'basic',
      description: 'Meter.',
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
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      title: 'name',
      abbreviation: 'abbreviation',
      postalPlace: 'postalPlace',
      country: 'country',
      media: 'image',
    },
    prepare({
      title,
      abbreviation,
      postalPlace,
      country,
      media,
    }: {
      title?: string
      abbreviation?: string
      postalPlace?: string
      country?: string
      media?: unknown
    }) {
      return {
        title,
        subtitle: [abbreviation, postalPlace, country].filter(Boolean).join(' • '),
        media,
      }
    },
  },
})