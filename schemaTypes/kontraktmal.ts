// schemaTypes/kontraktmal.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'kontraktmal',
  title: 'Kontraktsmaler',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Navn på mal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'contractType',
      title: 'Kontraktstype',
      type: 'string',
      options: {
        list: [
          {title: 'Andelskontrakt', value: 'andelskontrakt'},
          {title: 'Kjøpskontrakt', value: 'kjopskontrakt'},
          {title: 'Oppdragsavtale', value: 'oppdragsavtale'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // 👇 FELLES PARTREGISTER
    defineField({
      name: 'partyRegister',
      title: 'Part-register',
      description: 'Opprett personer/selskaper som kan brukes i kontrakter',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'party',
          title: 'Part',
          fields: [
            {name: 'name', title: 'Navn', type: 'string'},
            {name: 'address', title: 'Adresse', type: 'string'},
            {name: 'postalCode', title: 'Postnummer', type: 'string'},
            {name: 'postalPlace', title: 'Poststed', type: 'string'},
            {name: 'email', title: 'E-post', type: 'string'},
            {name: 'phone', title: 'Telefon', type: 'string'},
            {name: 'idNumber', title: 'Person/org.nr', type: 'string'},
            {name: 'accountNumber', title: 'Kontonummer', type: 'string'},
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'postalPlace',
            },
          },
        },
      ],
    }),

    // 👇 PARTER (bruker register)
    defineField({
      name: 'parties',
      title: 'Parter',
      type: 'array',
      description: 'Velg hvilke parter som inngår i kontrakten',
      of: [
        {
          type: 'reference',
          to: [{type: 'kontraktmal'}], // ⚠️ workaround fjernes under forklaring
        },
      ],
      hidden: true,
    }),

    // 👇 ANDRE PARTER (riktig løsning)
    defineField({
      name: 'selectedParties',
      title: 'Parter',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'party',
              title: 'Part',
              type: 'reference',
              to: [{type: 'partyInline'}],
            },
          ],
        },
      ],
      hidden: true,
    }),

    // 👇 TREDJEPART (kun andelskontrakt)
    defineField({
      name: 'thirdParty',
      title: 'Sportslig og økonomisk ansvarlig tredjepart',
      type: 'object',
      hidden: ({document}) => document?.contractType !== 'andelskontrakt',
      fields: [
        {name: 'name', title: 'Navn', type: 'string'},
        {name: 'address', title: 'Adresse', type: 'string'},
        {name: 'email', title: 'E-post', type: 'string'},
        {name: 'phone', title: 'Telefon', type: 'string'},
      ],
    }),

    // 👇 SEKSJONER (som før)
    defineField({
      name: 'sections',
      title: 'Innhold',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Tekstpunkt',
          fields: [
            {name: 'number', title: 'Punktnummer', type: 'string'},
            {name: 'heading', title: 'Overskrift', type: 'string'},
            {
              name: 'content',
              title: 'Innhold',
              type: 'array',
              of: [{type: 'block'}],
            },
          ],
        },

        {
          type: 'object',
          name: 'tableSection',
          title: 'Tabell',
          fields: [
            {name: 'number', title: 'Punktnummer', type: 'string'},
            {name: 'heading', title: 'Overskrift', type: 'string'},

            defineField({
              name: 'rows',
              title: 'Rader',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'cells',
                      title: 'Celler',
                      type: 'array',
                      of: [{type: 'string'}],
                    },
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      contractType: 'contractType',
    },
    prepare({title, contractType}) {
      return {
        title,
        subtitle: contractType,
      }
    },
  },
})