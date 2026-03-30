// schemaTypes/proforma.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'proforma',
  title: 'Proforma',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Navn på register',
      type: 'string',
      initialValue: 'Proforma register',
      validation: (Rule) => Rule.required(),
      description: 'Internt navn på dette registeret.',
    }),

    defineField({
      name: 'parties',
      title: 'Register',
      type: 'array',
      description: 'Lagrede selskaper og privatpersoner som kan brukes som avsender eller mottaker.',
      of: [
        {
          type: 'object',
          name: 'partyItem',
          title: 'Oppføring',
          fields: [
            {
              name: 'partyType',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Selskap', value: 'company'},
                  {title: 'Privatperson', value: 'person'},
                ],
                layout: 'radio',
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'name',
              title: 'Navn',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'address',
              title: 'Adresse',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'postalCode',
              title: 'Postnummer',
              type: 'string',
            },
            {
              name: 'postalPlace',
              title: 'Poststed',
              type: 'string',
            },
            {
              name: 'email',
              title: 'E-post',
              type: 'string',
            },
            {
              name: 'phone',
              title: 'Telefon',
              type: 'string',
            },
            {
              name: 'idNumber',
              title: 'Personnummer / org-nummer',
              type: 'string',
            },
            {
              name: 'notes',
              title: 'Notat',
              type: 'text',
              rows: 3,
            },
          ],
          preview: {
            select: {
              title: 'name',
              partyType: 'partyType',
              postalPlace: 'postalPlace',
              idNumber: 'idNumber',
            },
            prepare({
              title,
              partyType,
              postalPlace,
              idNumber,
            }: {
              title?: string
              partyType?: string
              postalPlace?: string
              idNumber?: string
            }) {
              const typeLabel =
                partyType === 'company'
                  ? 'Selskap'
                  : partyType === 'person'
                    ? 'Privatperson'
                    : ''

              return {
                title: title || 'Oppføring',
                subtitle: [typeLabel, postalPlace, idNumber].filter(Boolean).join(' • '),
              }
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare({title}: {title?: string}) {
      return {
        title: title || 'Proforma',
        subtitle: 'Felles register for selskaper og privatpersoner',
      }
    },
  },
})