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
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
        },
        {
          name: 'caption',
          title: 'Bildetekst',
          type: 'string',
        },
      ],
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
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Andelsbestyrer',
        subtitle: subtitle ? `Tlf: ${subtitle}` : '',
        media,
      }
    },
  },
})