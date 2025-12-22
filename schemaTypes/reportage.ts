import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'reportage',
  title: 'Reportasjer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Overskrift',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'ingress',
      title: 'Ingress',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'author',
      title: 'Forfatter',
      type: 'string',
    }),

    defineField({
      name: 'link',
      title: 'Lenke',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),

    defineField({
      name: 'isLocked',
      title: 'Låst',
      type: 'boolean',
      initialValue: false,
      description: 'Brukes hvis innholdet er bak paywall/ikke fritt tilgjengelig.',
    }),

    defineField({
      name: 'type',
      title: 'Reportasje / Artikkel',
      type: 'reference',
      to: [{type: 'reportageCategory'}],
      validation: (Rule) => Rule.required(),
    }),

    // Optional (men nyttig for sortering i frontend)
    defineField({
      name: 'publishedAt',
      title: 'Publisert',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      author: 'author',
      locked: 'isLocked',
      typeTitle: 'type.title',
    },
    prepare({title, media, author, locked, typeTitle}) {
      const lockLabel = locked ? '🔒 Låst' : 'Åpen'
      const typeLabel = typeTitle ? ` • ${typeTitle}` : ''
      const authorLabel = author ? ` • ${author}` : ''
      return {
        title,
        media,
        subtitle: `${lockLabel}${typeLabel}${authorLabel}`,
      }
    },
  },
})
