// schemaTypes/horse.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'horse',
  title: 'Hest',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // ✅ Eier rett under navn (valgfri, men blir påkrevd hvis Aktiv = true)
    defineField({
      name: 'owner',
      title: 'Eier',
      type: 'reference',
      to: [{ type: 'owner' }],
      description:
        'Valgfri når hesten er Ikke aktiv. Påkrevd når hesten settes som Aktiv.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.active && !value) {
            return 'Du må velge eier når hesten settes som Aktiv.'
          }
          return true
        }),
    }),

    // ✅ Aktiv / Ikke aktiv – styrer om hesten skal vises på treningslisten
    defineField({
      name: 'active',
      title: 'Aktiv (i trening nå)',
      type: 'boolean',
      initialValue: false,
      description:
        'Aktiv = vises på treningslisten på nettsiden. Ikke aktiv = brukes kun til historikk/statistikk.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (value === true && !parent?.owner) {
            return 'Velg eier før du setter hesten som Aktiv.'
          }
          return true
        }),
    }),

    defineField({
      name: 'gender',
      title: 'Kjønn',
      type: 'string',
      options: {
        list: [
          { title: 'Hoppe', value: 'hoppe' },
          { title: 'Hingst', value: 'hingst' },
          { title: 'Vallak', value: 'vallak' },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'birthYear',
      title: 'Fødselsår',
      type: 'number',
    }),

    defineField({
      name: 'country',
      title: 'Fødeland',
      type: 'string',
    }),

    defineField({
      name: 'sire',
      title: 'Far',
      type: 'string',
    }),

    defineField({
      name: 'dam',
      title: 'Mor',
      type: 'string',
    }),

    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: { hotspot: true },
    }),

    // ✅ Bildegalleri pr hest (om du vil ha dette nå)
    defineField({
      name: 'gallery',
      title: 'Bildegalleri',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', title: 'Bildetekst', type: 'string' },
            { name: 'alt', title: 'Alt-tekst', type: 'string' },
          ],
        },
      ],
    }),

    defineField({
      name: 'notes',
      title: 'Notater',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      ownerName: 'owner.name',
      active: 'active',
      media: 'image',
    },
    prepare({ title, ownerName, active, media }) {
      const status = active ? 'Aktiv' : 'Ikke aktiv'
      const owner = ownerName ? ` • Eier: ${ownerName}` : ''
      return {
        title,
        subtitle: `${status}${owner}`,
        media,
      }
    },
  },
})
