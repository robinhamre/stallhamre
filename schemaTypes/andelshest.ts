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

  fields: [
    // 🐎 HEST
    defineField({
      name: 'horse',
      title: 'Hest',
      type: 'reference',
      to: [{type: 'horse'}],
      validation: (Rule) => Rule.required(),
    }),

    // 👤 ANDELSBESTYRER
    defineField({
      name: 'shareManager',
      title: 'Andelsbestyrer',
      type: 'reference',
      to: [{type: 'shareManager'}],
      validation: (Rule) => Rule.required(),
    }),

    // 💰 UTBETALINGSBESKJEDER
    defineField({
      name: 'payoutNotices',
      title: 'Utbetalingsbeskjeder',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'payoutNoticeItem',
          title: 'Utbetaling',
          fields: [
            {name: 'year', title: 'År', type: 'number'},
            {
              name: 'month',
              title: 'Periode',
              type: 'string',
              options: {list: months},
            },
            {name: 'invoiceNumber', title: 'Fakturanummer', type: 'string'},
            {
              name: 'amount',
              title: 'Netto sum til utbetaling',
              type: 'number',
            },
            {
              name: 'pdf',
              title: 'PDF (valgfri)',
              type: 'file',
              options: {accept: 'application/pdf'},
            },
          ],
          preview: {
            select: {
              year: 'year',
              month: 'month',
              amount: 'amount',
            },
            prepare({year, month, amount}: any) {
              return {
                title: `${month || ''} ${year || ''}`,
                subtitle:
                  typeof amount === 'number'
                    ? `${amount.toLocaleString('nb-NO')} kr`
                    : '',
              }
            },
          },
        },
      ],
    }),

    // 💵 ANDRE INNTEKTER
    defineField({
      name: 'otherIncome',
      title: 'Andre inntekter',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'incomeItem',
          title: 'Inntekt',
          fields: [
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

    // 🧾 FAKTURA
    defineField({
      name: 'invoices',
      title: 'Faktura',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'invoiceItem',
          title: 'Faktura',
          fields: [
            {name: 'invoiceNumber', title: 'Fakturanummer', type: 'string'},
            {name: 'invoiceDate', title: 'Fakturadato', type: 'date'},
            {
              name: 'month',
              title: 'Periode',
              type: 'string',
              options: {list: months},
            },
            {name: 'year', title: 'År', type: 'number'},
            {
              name: 'total',
              title: 'Totalsum inkl. mva',
              type: 'number',
            },
            {
              name: 'mainPdf',
              title: 'Hovedfaktura PDF',
              type: 'file',
              options: {accept: 'application/pdf'},
            },

            // 📎 VEDLEGG
            {
              name: 'attachments',
              title: 'Vedlegg',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'attachmentItem',
                  fields: [
                    {
                      name: 'supplier',
                      title: 'Leverandør',
                      type: 'reference',
                      to: [{type: 'supplier'}],
                    },
                    {
                      name: 'invoiceNumber',
                      title: 'Fakturanummer',
                      type: 'string',
                    },
                    {
                      name: 'invoiceDate',
                      title: 'Fakturadato',
                      type: 'date',
                    },
                    {
                      name: 'amount',
                      title: 'Sum inkl. mva',
                      type: 'number',
                    },
                    {
                      name: 'pdf',
                      title: 'PDF',
                      type: 'file',
                      options: {accept: 'application/pdf'},
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

    // 📢 OPPDATERINGER
    defineField({
      name: 'updates',
      title: 'Oppdateringer',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'youtubeUpdate',
          title: 'YouTube-oppdatering',
          fields: [
            {name: 'title', title: 'Overskrift', type: 'string'},
            {name: 'description', title: 'Beskrivelse', type: 'text'},
            {name: 'youtubeUrl', title: 'YouTube link', type: 'url'},
            {name: 'date', title: 'Dato', type: 'date'},
          ],
        },
        {
          type: 'object',
          name: 'trainingReport',
          title: 'Treningsrapport',
          fields: [
            {name: 'title', title: 'Overskrift', type: 'string'},
            {name: 'description', title: 'Beskrivelse', type: 'text'},
            {
              name: 'images',
              title: 'Bildegalleri',
              type: 'array',
              of: [{type: 'image'}],
            },
            {name: 'date', title: 'Dato', type: 'date'},
          ],
        },
      ],
    }),

    // 🏁 LØPSKOMMENTAR
    defineField({
      name: 'raceComments',
      title: 'Løpskommentar',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'raceComment',
          fields: [
            {name: 'title', title: 'Overskrift', type: 'string'},
            {name: 'date', title: 'Dato', type: 'date'},
            {name: 'author', title: 'Forfatter', type: 'string'},
            {name: 'description', title: 'Beskrivelse', type: 'text'},
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'horse.name',
      manager: 'shareManager.name',
    },
    prepare({title, manager}: any) {
      return {
        title: title || 'Andelshest',
        subtitle: manager ? `Bestyrer: ${manager}` : '',
      }
    },
  },
})