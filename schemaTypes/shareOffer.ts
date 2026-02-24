// schemaTypes/shareOffer.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shareOffer',
  title: 'Andelstilbud',
  type: 'document',

  fields: [
    // Knytter andelstilbud til hest (henter data fra horse.ts via reference)
    defineField({
      name: 'horse',
      title: 'Hest',
      type: 'reference',
      to: [{type: 'horse'}],
      validation: (Rule) => Rule.required(),
    }),

    // -----------------------
    // Om andeler
    // -----------------------
    defineField({
      name: 'totalShares',
      title: 'Antall andeler',
      type: 'number',
    }),

    defineField({
      name: 'availableShares',
      title: 'Ledige andeler',
      type: 'number',
    }),

    defineField({
      name: 'pricePerShare',
      title: 'Pris pr andel',
      type: 'number',
      description: 'Beløp i kroner',
    }),

    // -----------------------
    // Informasjon rundt andelen
    // -----------------------
    defineField({
      name: 'manager',
      title: 'Andelsbestyrer',
      type: 'string',
    }),

    defineField({
      name: 'frodesComment',
      title: 'Frodes kommentar',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'duration',
      title: 'Løpetid for andel',
      type: 'string',
    }),

    // YouTube først
    defineField({
      name: 'videoUrl',
      title: 'Video (YouTube-link)',
      type: 'url',
      description: 'Lim inn YouTube URL',
    }),

    // Bildegalleri mellom YouTube og PDF
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

    // PDF til slutt
    defineField({
      name: 'contract',
      title: 'Andelskontrakt (PDF)',
      type: 'file',
      options: {accept: '.pdf'},
    }),
  ],

  preview: {
    select: {
      title: 'horse.name',
      media: 'gallery.0',
      availableShares: 'availableShares',
    },
    prepare({title, media, availableShares}) {
      return {
        title: title || 'Andelstilbud',
        subtitle:
          availableShares !== undefined ? `Ledige andeler: ${availableShares}` : '',
        media,
      }
    },
  },
})