// schemaTypes/imageLibrary.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageLibrary',
  title: 'Bildebank',
  type: 'document',
  fields: [
    // Internt navn, f.eks. "Forside hero", "Tips-seksjon", "Footer-bilde"
    defineField({
      name: 'title',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Nøkkel vi kan bruke i koden (stabil ID)
    defineField({
      name: 'slug',
      title: 'Slug / nøkkel',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),

    // Hvilken type/bruk bilde har (valgfritt, men nyttig)
    defineField({
      name: 'placement',
      title: 'Bruk / plassering',
      type: 'string',
      options: {
        list: [
          {title: 'Forside – Hero', value: 'hero-home'},
          {title: 'Forside – Seksjon', value: 'section-home'},
          {title: 'Tips-side', value: 'tips'},
          {title: 'Statistikk-side', value: 'stats'},
          {title: 'Andeler', value: 'shares'},
          {title: 'Annet', value: 'other'},
        ],
        layout: 'dropdown',
      },
    }),

    // Selve bildet
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
      validation: (Rule) => Rule.required(),
    }),

    // Litt ekstra info hvis du vil
    defineField({
      name: 'notes',
      title: 'Notat / brukstips',
      type: 'text',
      rows: 2,
    }),
  ],
})
