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

    // 🔗 Eier (MÅ settes før aktiv)
    defineField({
      name: 'owner',
      title: 'Eier',
      type: 'reference',
      to: [{ type: 'owner' }],
      description: 'Må velges før hesten kan settes som aktiv',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.active && !value) {
            return 'Du må velge eier før hesten kan settes som aktiv.'
          }
          return true
        }),
    }),

    // ✅ Aktiv-status (låst uten eier)
    defineField({
      name: 'active',
      title: 'Aktiv',
      type: 'boolean',
      initialValue: false,

      readOnly: ({ document }) => {
        return !document?.owner
      },

      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (value === true && !parent?.owner) {
            return 'Velg eier først før du aktiverer hesten.'
          }
          return true
        }),
    }),

    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      subtitle: 'owner.name',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Eier: ${subtitle}` : 'Ingen eier satt',
        media,
      }
    },
  },
})
