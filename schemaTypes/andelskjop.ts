// schemaTypes/andelskjop.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'andelskjop',
  title: 'Andelsfaktura (Kjøp)',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Navn på register',
      type: 'string',
      initialValue: 'Andelsfaktura (Kjøp) register',
      validation: (Rule) => Rule.required(),
      description: 'Internt navn på dette registeret.',
    }),

    defineField({
      name: 'parties',
      title: 'Kjøpere / selgere',
      type: 'array',
      description:
        'Lagrede selskaper og privatpersoner som kan brukes som kjøper eller selger.',
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
              name: 'accountNumber',
              title: 'Kontonummer',
              type: 'string',
              description: 'Kontonummer som skal brukes for denne selgeren/kjøperen.',
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
              accountNumber: 'accountNumber',
            },
            prepare({
              title,
              partyType,
              postalPlace,
              idNumber,
              accountNumber,
            }: {
              title?: string
              partyType?: string
              postalPlace?: string
              idNumber?: string
              accountNumber?: string
            }) {
              const typeLabel =
                partyType === 'company'
                  ? 'Selskap'
                  : partyType === 'person'
                    ? 'Privatperson'
                    : ''

              return {
                title: title || 'Oppføring',
                subtitle: [typeLabel, postalPlace, idNumber, accountNumber]
                  .filter(Boolean)
                  .join(' • '),
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
        title: title || 'Andelsfaktura (Kjøp)',
        subtitle: 'Felles register for kjøpere og selgere',
      }
    },
  },
})