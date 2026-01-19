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

    // ✅ SLUG – brukes til egne banesider
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
    },
  },
})
