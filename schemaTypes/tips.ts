// schemaTypes/tips.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tips',
  title: 'Tips',
  type: 'document',
  fields: [
    // Overskrift
    defineField({
      name: 'title',
      title: 'Overskrift',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Bilde
    defineField({
      name: 'image',
      title: 'Bilde',
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

    // Video-lenke (brukes i stedet for bilde hvis satt)
    defineField({
      name: 'videoUrl',
      title: 'Video (lenke)',
      type: 'url',
      description: 'Hvis du fyller inn video-lenke her, skal videoen vises i stedet for bildet.',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),

    // Kategori (egen tips-kategori)
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{type: 'tipsCategory'}],
    }),

    // Travbane
    defineField({
      name: 'track',
      title: 'Travbane',
      type: 'string', // f.eks. "Bjerke Travbane"
    }),

    // Spillform
    defineField({
      name: 'gameType',
      title: 'Spillform',
      type: 'string', // f.eks. "V75", "V65", "DD"
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

    // Link til ekstern sak
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
