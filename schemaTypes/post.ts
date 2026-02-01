// schemaTypes/post.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Innlegg',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Overskrift',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publiseringsdato',
      type: 'date',
    }),

    defineField({
      name: 'ingress',
      title: 'Ingress',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'categories',
      title: 'Kategorier',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
      ],
    }),

    defineField({
      name: 'textBlock1',
      title: 'Tekstboks 1',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'quote',
      title: 'Sitat',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'image1',
      title: 'Bilde 1',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'caption', title: 'Bildetekst', type: 'string'},
        {name: 'alt', title: 'Alt-tekst', type: 'string'},
      ],
    }),

    defineField({
      name: 'textBlock2',
      title: 'Tekstboks 2',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'image2',
      title: 'Bilde 2',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'caption', title: 'Bildetekst', type: 'string'},
        {name: 'alt', title: 'Alt-tekst', type: 'string'},
      ],
    }),

    defineField({
      name: 'factBox',
      title: 'Faktaboks',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'textBlock3',
      title: 'Tekstboks 3',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // ⭐ STARTER-TABELL (OPPDATERT)
    defineField({
      name: 'raceTable',
      title: 'Starter (tabell)',
      description: 'Dato, løp, hest, kusk og travbane',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'raceRow',
          title: 'Rad',
          fields: [
            {
              name: 'date',
              title: 'Dato',
              type: 'date',
            },
            {
              name: 'raceNumber',
              title: 'Løp nr',
              type: 'number',
            },
            {
              name: 'horse',
              title: 'Hest',
              type: 'reference',
              to: [{type: 'horse'}],
            },
            {
              name: 'driver',
              title: 'Kusk',
              type: 'reference',
              to: [{type: 'driver'}],
            },
            {
              name: 'track',
              title: 'Travbane',
              type: 'reference',
              to: [{type: 'track'}],
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'hiddenTags',
      title: 'Skulte tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),

    // ✅ NYTT: Bildegalleri (med bildetekst)
    defineField({
      name: 'gallery',
      title: 'Bildegalleri',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'caption', title: 'Bildetekst', type: 'string'},
            {name: 'alt', title: 'Alt-tekst', type: 'string'},
          ],
        },
      ],
    }),
  ],
})
