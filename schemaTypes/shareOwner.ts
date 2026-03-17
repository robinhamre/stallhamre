// schemaTypes/shareOwner.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shareOwner',
  title: 'Andelseiere',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'street',
      title: 'Gateadresse',
      type: 'string',
    }),

    defineField({
      name: 'postalCode',
      title: 'Postnummer',
      type: 'string',
    }),

    defineField({
      name: 'city',
      title: 'Sted',
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
      name: 'accountNumber',
      title: 'Kontonummer',
      type: 'string',
    }),

    defineField({
      name: 'horses',
      title: 'Hester / eierandel',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'horseShare',
          title: 'Hest',
          fields: [
            {
              name: 'horse',
              title: 'Hest',
              type: 'reference',
              to: [{type: 'horse'}],
            },
            {
              name: 'ownership',
              title: 'Eierandel (%)',
              type: 'number',
              description: 'Eierandel i prosent',
            },
          ],
          preview: {
            select: {
              title: 'horse.name',
              ownership: 'ownership',
            },
            prepare({title, ownership}) {
              return {
                title: title || 'Hest',
                subtitle: ownership ? `${ownership}% eierandel` : '',
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'contracts',
      title: 'Andelskontrakter',
      type: 'array',
      of: [
        {
          type: 'file',
          title: 'PDF',
          options: {
            accept: 'application/pdf',
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? `Sted: ${subtitle}` : '',
      }
    },
  },
})