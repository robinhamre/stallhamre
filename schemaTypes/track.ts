// schemaTypes/track.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'track',
  title: 'Travbane',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'abbreviation',
      title: 'Baneforkortelse',
      type: 'string',
      description: 'For eksempel B for Bjerke, J for Jarlsberg osv.',
    }),

    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
    }),

    defineField({
      name: 'postalCode',
      title: 'Postnummer',
      type: 'string',
    }),

    defineField({
      name: 'postalPlace',
      title: 'Poststed',
      type: 'string',
    }),

    defineField({
      name: 'country',
      title: 'Land',
      type: 'string',
      options: {
        list: [
          {title: 'Norge', value: 'Norge'},
          {title: 'Sverige', value: 'Sverige'},
          {title: 'Danmark', value: 'Danmark'},
          {title: 'Finland', value: 'Finland'},
          {title: 'Frankrike', value: 'Frankrike'},
          {title: 'Andre', value: 'Andre'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'Norge',
    }),

    defineField({
      name: 'trackLength',
      title: 'Banelengde',
      type: 'number',
      description: 'Meter (f.eks. 1000)',
    }),

    defineField({
      name: 'stretchLength',
      title: 'Oppløpslengde',
      type: 'number',
      description: 'Meter',
    }),

    defineField({
      name: 'link',
      title: 'Lenke',
      type: 'url',
    }),

    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'country',
      media: 'image',
      abbreviation: 'abbreviation',
    },
    prepare({title, subtitle, media, abbreviation}) {
      return {
        title,
        subtitle: [abbreviation, subtitle].filter(Boolean).join(' • '),
        media,
      }
    },
  },
})