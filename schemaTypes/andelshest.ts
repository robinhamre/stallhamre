// schemaTypes/andelshest.ts
import {defineField, defineType} from 'sanity'

const months = [
  {title: 'Januar', value: 'januar'},
  {title: 'Februar', value: 'februar'},
  {title: 'Mars', value: 'mars'},
  {title: 'April', value: 'april'},
  {title: 'Mai', value: 'mai'},
  {title: 'Juni', value: 'juni'},
  {title: 'Juli', value: 'juli'},
  {title: 'August', value: 'august'},
  {title: 'September', value: 'september'},
  {title: 'Oktober', value: 'oktober'},
  {title: 'November', value: 'november'},
  {title: 'Desember', value: 'desember'},
]

export default defineType({
  name: 'andelshest',
  title: 'Andelshester',
  type: 'document',

  // 🔥 NYTT: GRUPPER
  groups: [
    {name: 'basic', title: 'Grunnleggende', default: true},
    {name: 'income', title: 'Inntekter'},
    {name: 'expenses', title: 'Utgifter'},
    {name: 'updates', title: 'Oppdateringer'},
  ],

  fields: [
    // 🔹 GRUNNLEGGENDE
    defineField({
      name: 'horse',
      title: 'Hest',
      type: 'reference',
      to: [{type: 'horse'}],
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'shareManager',
      title: 'Andelsbestyrer',
      type: 'reference',
      to: [{type: 'shareManager'}],
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'caretaker',
      title: 'Oppasser',
      type: 'reference',
      to: [{type: 'staff'}],
      group: 'basic',
    }),

    // 🔹 INNTEKTER
    defineField({
      name: 'payoutNotices',
      title: 'Utbetalingsbeskjeder',
      type: 'array',
      group: 'income',
      of: [
        {
          type: 'object',
          name: 'payoutNoticeItem',
          title: 'Utbetaling',
          fields: [
            {name: 'supplier', title: 'Leverandør', type: 'reference', to: [{type: 'supplier'}]},
            {name: 'year', title: 'År', type: 'number'},
            {
              name: 'month',
              title: 'Periode',
              type: 'string',
              options: {list: months, layout: 'dropdown'},
            },
            {name: 'invoiceNumber', title: 'Fakturanummer', type: 'string'},
            {name: 'amount', title: 'Netto sum til utbetaling', type: 'number'},
            {
              name: 'pdf',
              title: 'PDF',
              type: 'file',
              options: {accept: 'application/pdf'},
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'otherIncome',
      title: 'Andre inntekter',
      type: 'array',
      group: 'income',
      of: [
        {
          type: 'object',
          name: 'incomeItem',
          title: 'Inntekt',
          fields: [
            {name: 'supplier', title: 'Leverandør', type: 'reference', to: [{type: 'supplier'}]},
            {name: 'title', title: 'Beskrivelse', type: 'string'},
            {name: 'year', title: 'År', type: 'number'},
            {
              name: 'month',
              title: 'Periode',
              type: 'string',
              options: {list: months},
            },
            {name: 'invoiceNumber', title: 'Fakturanummer', type: 'string'},
            {name: 'amount', title: 'Netto sum', type: 'number'},
            {
              name: 'pdf',
              title: 'PDF',
              type: 'file',
              options: {accept: 'application/pdf'},
            },
          ],
        },
      ],
    }),

    // 🔹 UTGIFTER
    defineField({
      name: 'invoices',
      title: 'Faktura',
      type: 'array',
      group: 'expenses',
      of: [
        {
          type: 'object',
          name: 'invoiceItem',
          title: 'Faktura',
          fields: [
            {name: 'supplier', title: 'Leverandør', type: 'reference', to: [{type: 'supplier'}]},
            {name: 'invoiceNumber', title: 'Fakturanummer', type: 'string'},
            {name: 'invoiceDate', title: 'Fakturadato', type: 'date'},
            {name: 'month', title: 'Periode', type: 'string', options: {list: months}},
            {name: 'year', title: 'År', type: 'number'},
            {name: 'total', title: 'Totalsum inkl. mva', type: 'number'},
            {
              name: 'mainPdf',
              title: 'Hovedfaktura PDF',
              type: 'file',
              options: {accept: 'application/pdf'},
            },
          ],
        },
      ],
    }),

    // 🔹 OPPDATERINGER
    defineField({
      name: 'updates',
      title: 'Oppdateringer',
      type: 'array',
      group: 'updates',
      of: [
        {
          type: 'object',
          name: 'youtubeUpdate',
          title: 'YouTube',
          fields: [
            {name: 'title', title: 'Overskrift', type: 'string'},
            {name: 'description', title: 'Beskrivelse', type: 'text'},
            {name: 'youtubeUrl', title: 'YouTube link', type: 'url'},
            {name: 'date', title: 'Dato', type: 'date'},
            {
              name: 'author',
              title: 'Forfatter',
              type: 'reference',
              to: [{type: 'staff'}, {type: 'shareManager'}],
            },
          ],
        },
        {
          type: 'object',
          name: 'trainingReport',
          title: 'Treningsrapport',
          fields: [
            {name: 'title', title: 'Overskrift', type: 'string'},
            {name: 'description', title: 'Beskrivelse', type: 'text'},
            {name: 'images', title: 'Bilder', type: 'array', of: [{type: 'image'}]},
            {name: 'date', title: 'Dato', type: 'date'},
            {
              name: 'author',
              title: 'Forfatter',
              type: 'reference',
              to: [{type: 'staff'}, {type: 'shareManager'}],
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'raceComments',
      title: 'Løpskommentarer',
      type: 'array',
      group: 'updates',
      of: [
        {
          type: 'object',
          name: 'raceComment',
          title: 'Kommentar',
          fields: [
            {name: 'title', title: 'Overskrift', type: 'string'},
            {name: 'date', title: 'Dato', type: 'date'},
            {name: 'description', title: 'Beskrivelse', type: 'text'},
            {
              name: 'author',
              title: 'Forfatter',
              type: 'reference',
              to: [{type: 'staff'}],
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      horseName: 'horse.name',
      managerName: 'shareManager.name',
    },
    prepare({horseName, managerName}) {
      return {
        title: horseName || 'Andelshest',
        subtitle: managerName ? `Bestyrer: ${managerName}` : '',
      }
    },
  },
})