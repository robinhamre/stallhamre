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
      subtitle: 'horses',
    },
    prepare({name, subtitle}: {name?: string; subtitle?: string}) {
      return {
        title: name || 'Oppasser',
        subtitle: subtitle || '',
      }
    },
  },
})