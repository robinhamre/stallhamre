// schemaTypes/horse.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'horse',
  title: 'Treningsliste – Hest',
  type: 'document',
  fields: [
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

    // Fødeår (årstall)
    defineField({
      name: 'birthYear',
      title: 'Fødeår',
      type: 'number', // f.eks. 2020
    }),

    // Fødeland
    defineField({
      name: 'birthCountry',
      title: 'Fødeland',
      type: 'string', // f.eks. "Norge", "Sverige", "USA"
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
  ],
})
