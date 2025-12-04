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

    // Publiseringsdato
    defineField({
      name: 'publishedAt',
      title: 'Publiseringsdato',
      type: 'date',
      options: {
        // bare for visning i Studio – på nettsiden kan vi formatere som vi vil
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

    // Kategorier (fra egen Kategori-type)
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

    // Bilde 1 + bildetekst
    defineField({
      name: 'image1',
      title: 'Bilde 1',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'caption',
          title: 'Bildetekst',
          type: 'string',
        }),
        defineField({
          name: 'alt',
          title: 'Alt-tekst (for skjermleser)',
          type: 'string',
        }),
      ],
    }),

    // Tekstboks 2
    defineField({
      name: 'textBlock2',
      title: 'Tekstboks 2',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // Bilde 2 + bildetekst
    defineField({
      name: 'image2',
      title: 'Bilde 2',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'caption',
          title: 'Bildetekst',
          type: 'string',
        }),
        defineField({
          name: 'alt',
          title: 'Alt-tekst (for skjermleser)',
          type: 'string',
        }),
      ],
    }),

    // Tekstboks 3
    defineField({
      name: 'textBlock3',
      title: 'Tekstboks 3',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // Starter / tabell (mange rader, 4 kolonner)
    defineField({
      name: 'raceTable',
      title: 'Starter (tabell)',
      description: 'Dato, hest, kusk og bane. Legg til så mange rader du vil.',
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
              type: 'string', // f.eks. 05.12.2025
            },
            {
              name: 'horse',
              title: 'Hest',
              type: 'string',
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

    // Skulte tags
    defineField({
      name: 'hiddenTags',
      title: 'Skulte tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
  ],
})
