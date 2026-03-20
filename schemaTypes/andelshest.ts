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
    defineField({
      name: 'horse',
      title: 'Hest',
      type: 'reference',
      to: [{type: 'horse'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'shareManager',
      title: 'Andelsbestyrer',
      type: 'reference',
      to: [{type: 'shareManager'}],
      validation: (Rule) => Rule.required(),
    }),

    // ✅ RIKTIG: bruker oppasser.ts
    defineField({
      name: 'caretaker',
      title: 'Oppasser',
      type: 'reference',
      to: [{type: 'oppasser'}],
      description: 'Velg oppasser for hesten',
    }),

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
            {
              name: 'supplier',
              title: 'Leverandør',
              type: 'reference',
              to: [{type: 'supplier'}],
            },
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
              title: 'PDF (valgfri)',
              type: 'file',
              options: {accept: 'application/pdf'},
            },
          ],
        },
      ],
    }),

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
            {
              name: 'images',
              title: 'Bildegalleri',
              type: 'array',
              of: [{type: 'image'}],
            },
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