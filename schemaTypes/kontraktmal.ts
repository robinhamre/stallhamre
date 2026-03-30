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

    defineField({
      name: 'partyRegister',
      title: 'Part-register',
      description: 'Opprett personer/selskaper som kan brukes i kontrakter.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'partyRegisterItem',
          title: 'Part i register',
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

    defineField({
      name: 'parties',
      title: 'Parter',
      type: 'array',
      description: 'Partene som inngår i denne kontrakten.',
      of: [
        {
          type: 'object',
          name: 'contractParty',
          title: 'Part',
          fields: [
            {name: 'role', title: 'Rolle', type: 'string'},
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
              role: 'role',
            },
            prepare({title, role}: {title?: string; role?: string}) {
              return {
                title: title || 'Part',
                subtitle: role || '',
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'thirdParty',
      title: 'Sportslig og økonomisk ansvarlig tredjepart',
      type: 'object',
      hidden: ({document}) => document?.contractType !== 'andelskontrakt',
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
    }),

    defineField({
      name: 'sections',
      title: 'Innhold / punkter',
      type: 'array',
      description:
        'Legg til så mange punkter du vil. Du kan bruke nummerering som 1, 2, 6, 6.1, 6.2 osv.',
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
          preview: {
            select: {
              number: 'number',
              heading: 'heading',
            },
            prepare({number, heading}: {number?: string; heading?: string}) {
              return {
                title: heading || 'Tekstpunkt',
                subtitle: number ? `Punkt ${number}` : 'Uten nummer',
              }
            },
          },
        },
        {
          type: 'object',
          name: 'tableSection',
          title: 'Tabell',
          fields: [
            {name: 'number', title: 'Punktnummer', type: 'string'},
            {name: 'heading', title: 'Overskrift', type: 'string'},
            defineField({
              name: 'columns',
              title: 'Kolonner',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'columnItem',
                  title: 'Kolonne',
                  fields: [{name: 'title', title: 'Kolonnenavn', type: 'string'}],
                  preview: {
                    select: {
                      title: 'title',
                    },
                  },
                },
              ],
            }),
            defineField({
              name: 'rows',
              title: 'Rader',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'rowItem',
                  title: 'Rad',
                  fields: [
                    {
                      name: 'cells',
                      title: 'Celler',
                      type: 'array',
                      of: [{type: 'string'}],
                    },
                  ],
                  preview: {
                    select: {
                      cells: 'cells',
                    },
                    prepare({cells}: {cells?: string[]}) {
                      return {
                        title: 'Rad',
                        subtitle: cells?.join(' | ') || '',
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              number: 'number',
              heading: 'heading',
            },
            prepare({number, heading}: {number?: string; heading?: string}) {
              return {
                title: heading || 'Tabell',
                subtitle: number ? `Punkt ${number}` : 'Tabell',
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
      contractType: 'contractType',
    },
    prepare({
      title,
      contractType,
    }: {
      title?: string
      contractType?: string
    }) {
      const label =
        contractType === 'andelskontrakt'
          ? 'Andelskontrakt'
          : contractType === 'kjopskontrakt'
            ? 'Kjøpskontrakt'
            : contractType === 'oppdragsavtale'
              ? 'Oppdragsavtale'
              : ''

      return {
        title: title || 'Kontraktsmal',
        subtitle: label,
      }
    },
  },
})