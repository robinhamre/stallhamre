// schemaTypes/payoutNotice.ts
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
  name: 'payoutNotice',
  title: 'Ubetalingsbeskjeder',
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
      name: 'invoiceNumber',
      title: 'Fakturanummer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'invoiceDate',
      title: 'Fakturadato',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'periodMonth',
      title: 'Periode (måned)',
      type: 'string',
      options: {
        list: months,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'periodYear',
      title: 'Periode (år)',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(2000).max(2100),
    }),

    defineField({
      name: 'payoutAmount',
      title: 'Sum til utbetaling (100%)',
      type: 'number',
      description: 'Total sum til utbetaling før eventuell fordeling.',
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: 'sourcePdf',
      title: 'Grunnlag PDF',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      horseName: 'horse.name',
      month: 'periodMonth',
      year: 'periodYear',
      amount: 'payoutAmount',
      invoiceNumber: 'invoiceNumber',
    },
    prepare({
      horseName,
      month,
      year,
      amount,
      invoiceNumber,
    }: {
      horseName?: string
      month?: string
      year?: number
      amount?: number
      invoiceNumber?: string
    }) {
      const monthLabel = months.find((m) => m.value === month)?.title || month || ''
      const periodLabel =
        monthLabel && year ? `${monthLabel} ${year}` : monthLabel || year?.toString() || ''

      const amountLabel =
        typeof amount === 'number'
          ? `${amount.toLocaleString('nb-NO')} kr`
          : ''

      return {
        title: horseName || 'Ubetalingsbeskjed',
        subtitle: [
          periodLabel,
          invoiceNumber ? `Faktura: ${invoiceNumber}` : '',
          amountLabel,
        ]
          .filter(Boolean)
          .join(' • '),
      }
    },
  },
})