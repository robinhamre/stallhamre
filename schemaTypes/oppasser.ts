// schemaTypes/oppasser.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'oppasser',
  title: 'Oppassere',
  type: 'document',

  fields: [
    defineField({
      name: 'staff',
      title: 'Ansatt',
      type: 'reference',
      to: [{type: 'staff'}],
      validation: (Rule) => Rule.required(),
    }),

    // 🖼️ NYTT FELT
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
        },
      ],
    }),

    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
    }),

    defineField({
      name: 'horses',
      title: 'Passhester',
      type: 'text',
      description: 'Liste over hester denne personen passer',
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
  ],

  preview: {
    select: {
      name: 'staff.name',
      media: 'image',
      subtitle: 'horses',
    },
    prepare({name, subtitle, media}: {name?: string; subtitle?: string; media?: any}) {
      return {
        title: name || 'Oppasser',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})