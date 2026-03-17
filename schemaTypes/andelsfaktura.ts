// schemaTypes/andelsfaktura.ts
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
  name: 'andelsfaktura',
  title: 'Andelsfakturaer',
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
      name: 'mainInvoicePdf',
      title: 'Hovedfaktura PDF',
      description: 'Faktura fra Stall Frode Hamre AS',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
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
      name: 'totalInclVat',
      title: 'Totalsum inkl. mva',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: 'attachments',
      title: 'Vedlegg',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'attachmentItem',
          title: 'Vedlegg',
          fields: [
            {
              name: 'supplier',
              title: 'Leverandør',
              type: 'reference',
              to: [{type: 'supplier'}],
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'invoiceNumber',
              title: 'Fakturanummer',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'invoiceDate',
              title: 'Fakturadato',
              type: 'date',
              options: {
                dateFormat: 'DD.MM.YYYY',
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'amountInclVat',
              title: 'Sum inkl. mva',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(0),
            },
            {
              name: 'pdf',
              title: 'PDF',
              type: 'file',
              options: {
                accept: 'application/pdf',
              },
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              supplierName: 'supplier.name',
              invoiceNumber: 'invoiceNumber',
              amount: 'amountInclVat',
            },
            prepare({
              supplierName,
              invoiceNumber,
              amount,
            }: {
              supplierName?: string
              invoiceNumber?: string
              amount?: number
            }) {
              const amountLabel =
                typeof amount === 'number'
                  ? `${amount.toLocaleString('nb-NO')} kr`
                  : ''

              return {
                title: supplierName || 'Vedlegg',
                subtitle: [
                  invoiceNumber ? `Faktura: ${invoiceNumber}` : '',
                  amountLabel,
                ]
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
      horseName: 'horse.name',
      invoiceNumber: 'invoiceNumber',
      month: 'periodMonth',
      year: 'periodYear',
      totalInclVat: 'totalInclVat',
    },
    prepare({
      horseName,
      invoiceNumber,
      month,
      year,
      totalInclVat,
    }: {
      horseName?: string
      invoiceNumber?: string
      month?: string
      year?: number
      totalInclVat?: number
    }) {
      const monthLabel = months.find((m) => m.value === month)?.title || month || ''
      const periodLabel =
        monthLabel && year ? `${monthLabel} ${year}` : ''

      const amountLabel =
        typeof totalInclVat === 'number'
          ? `${totalInclVat.toLocaleString('nb-NO')} kr`
          : ''

      return {
        title: horseName || 'Andelsfaktura',
        subtitle: [
          invoiceNumber ? `Faktura: ${invoiceNumber}` : '',
          periodLabel,
          amountLabel,
        ]
          .filter(Boolean)
          .join(' • '),
      }
    },
  },
})