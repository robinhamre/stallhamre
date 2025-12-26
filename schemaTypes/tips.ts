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
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{type: 'tipsCategory'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'track',
      title: 'Travbane',
      type: 'string',
    }),

    defineField({
      name: 'gameType',
      title: 'Forfatter',
      type: 'string',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Dato',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    }),

    defineField({
      name: 'ingress',
      title: 'Ingress',
      type: 'text',
      rows: 3,
    }),

    // Startkommentarer per hest (hentes fra horse.ts)
    defineField({
      name: 'startComments',
      title: 'Startkommentarer',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'startComment',
          title: 'Startkommentar',
          fields: [
            defineField({
              name: 'horse',
              title: 'Hest',
              type: 'reference',
              to: [{type: 'horse'}],
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'raceType',
              title: 'AM / V',
              type: 'string',
              options: {
                list: [
                  {title: 'AM', value: 'am'},
                  {title: 'V', value: 'v'},
                ],
                layout: 'radio',
              },
            }),

            defineField({
              name: 'shoes',
              title: 'Sko',
              type: 'string',
              options: {
                list: [
                  {title: 'Sko', value: 'sko'},
                  {title: 'Skoløs frem', value: 'barfota_frem'},
                  {title: 'Skoløs bak', value: 'barfota_bak'},
                  {title: 'Skoløs', value: 'barfota'},
                ],
              },
            }),

            defineField({
              name: 'comment',
              title: 'Kommentar',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              horseName: 'horse.name',
              raceType: 'raceType',
              shoes: 'shoes',
              comment: 'comment',
            },
            prepare({horseName, raceType, shoes, comment}) {
              const rt = raceType ? raceType.toUpperCase() : ''
              const shoeLabel =
                shoes === 'sko'
                  ? 'Sko'
                  : shoes === 'barfota_frem'
                    ? 'Skoløs frem'
                    : shoes === 'barfota_bak'
                      ? 'Skoløs bak'
                      : shoes === 'barfota'
                        ? 'Skoløs'
                        : ''
              const parts = [rt, shoeLabel].filter(Boolean).join(' • ')
              return {
                title: horseName || 'Uten hest',
                subtitle: [parts, comment].filter(Boolean).join(' — '),
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'link',
      title: 'Link til saken',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),
  ],
})
