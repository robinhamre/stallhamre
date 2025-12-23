// schemaTypes/tips.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tips',
  title: 'Tips',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Overskrift',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publiseringsdato',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
    }),

    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{type: 'tipsCategory'}],
    }),

    defineField({
      name: 'track',
      title: 'Travbane',
      type: 'string',
    }),

    defineField({
      name: 'betType',
      title: 'Spillform',
      type: 'string',
    }),

    defineField({
      name: 'ingress',
      title: 'Ingress',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'link',
      title: 'Link (lenke til annen sak)',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),

    // Hest + startkommentar (tabell)
    defineField({
      name: 'starts',
      title: 'Starter / vurderinger',
      description: 'Velg hest fra treningslisten og skriv startkommentar.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'startRow',
          title: 'Rad',
          fields: [
            defineField({
              name: 'horse',
              title: 'Hest',
              type: 'reference',
              to: [{type: 'horse'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'comment',
              title: 'Startkommentar',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'horse.name',
              subtitle: 'comment',
            },
          },
        },
      ],
    }),

    // Eventuell brødtekst
    defineField({
      name: 'content',
      title: 'Tekst',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
