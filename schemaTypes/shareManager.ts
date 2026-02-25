// schemaTypes/shareManager.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shareManager',
  title: 'Andelsbestyrer',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),

    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 4,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'phone',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Andelsbestyrer',
        subtitle: subtitle ? `Tlf: ${subtitle}` : '',
      }
    },
  },
})