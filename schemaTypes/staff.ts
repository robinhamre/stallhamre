// schemaTypes/staff.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'staff',
  title: 'Personal',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'role',
      title: 'Stilling',
      type: 'string',
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
      name: 'branch',
      title: 'Filial',
      type: 'string',
    }),

    // 👇 NYTT FELT
    defineField({
      name: 'visible',
      title: 'Synlig på nettside',
      type: 'boolean',
      initialValue: true,
      description: 'Skru av for å skjule personen fra nettsiden',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      visible: 'visible',
    },
    prepare({title, subtitle, visible}) {
      return {
        title,
        subtitle: `${subtitle || ''} ${visible === false ? '🚫 Skjult' : ''}`.trim(),
      }
    },
  },
})