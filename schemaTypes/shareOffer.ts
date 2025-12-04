// schemaTypes/shareOffer.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shareOffer',
  title: 'Ledige andeler',
  type: 'document',
  fields: [
    // Grunninfo – samme som hest
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),

    defineField({
      name: 'owner',
      title: 'Eier',
      type: 'string',
    }),

    defineField({
      name: 'pedigree',
      title: 'Stamme',
      type: 'string',
    }),

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

    defineField({
      name: 'link',
      title: 'Link (lenke til annen side)',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),

    // Ekstra felter for andeler
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
      name: 'depositPrice',
      title: 'Pris innskudd',
      type: 'string', // f.eks. "5 000 kr per andel"
    }),

    defineField({
      name: 'contract',
      title: 'Vilkår / kontrakt (PDF)',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
  ],
})
