// schemaTypes/post.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Innlegg',
  type: 'document',
  fields: [
    // Overskrift
    defineField({
      name: 'title',
      title: 'Overskrift',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Publiseringsdato
    defineField({
      name: 'publishedAt',
      title: 'Publiseringsdato',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
    }),

    // Ingress
    defineField({
      name: 'ingress',
      title: 'Ingress',
      type: 'text',
      rows: 3,
    }),

    // Kategorier
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

    // Tekstboks 1
    defineField({
      name: 'textBlock1',
      title: 'Tekstboks 1',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // Sitat
    defineField({
      name: 'quote',
      title: 'Sitat',
      type: 'text',
      rows: 2,
    }),

    // Bilde 1
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

    // Tekstboks 2
    defineField({
      name: 'textBlock2',
      title: 'Tekstboks 2',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // Bilde 2
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

    // Faktaboks (ligger fast – ikke flyttes)
    defineField({
      name: 'factBox',
      title: 'Faktaboks',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // Tekstboks 3 (siste tekst)
    defineField({
      name: 'textBlock3',
      title: 'Tekstboks 3',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // STARTER / TABELL
    defineField({
      name: 'raceTable',
      title: 'Starter (tabell)',
      description: 'Dato, løp nr, hest, kusk og bane.',
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
              type: 'string',
              description: 'F.eks. 05.12.2025',
            },
            {
              name: 'raceNumber',
              title: 'Løp nr',
              type: 'string',
              description: 'F.eks. 5',
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
              type: 'string',
            },
            {
              name: 'track',
              title: 'Bane',
              type: 'string',
            },
          ],
        },
      ],
    }),

    // Skjulte tags
    defineField({
      name: 'hiddenTags',
      title: 'Skjulte tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
  ],
})
