// schemaTypes/invoice.ts
import {defineField, defineType} from 'sanity'

const months = [
  {title: 'Januar', value: '01'},
  {title: 'Februar', value: '02'},
  {title: 'Mars', value: '03'},
  {title: 'April', value: '04'},
  {title: 'Mai', value: '05'},
  {title: 'Juni', value: '06'},
  {title: 'Juli', value: '07'},
  {title: 'August', value: '08'},
  {title: 'September', value: '09'},
  {title: 'Oktober', value: '10'},
  {title: 'November', value: '11'},
  {title: 'Desember', value: '12'},
]

export default defineType({
  name: 'invoice',
  title: 'Viderefakturering',
  type: 'document',

  groups: [
    {name: 'basic', title: 'Grunnleggende', default: true},
    {name: 'assignment', title: 'Hest / Eier'},
    {name: 'amount', title: 'Beløp'},
    {name: 'attachment', title: 'Vedlegg'},
  ],

  fields: [
    defineField({
      name: 'supplier',
      title: 'Leverandør',
      type: 'reference',
      to: [{type: 'supplier'}],
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'costType',
      title: 'Type kostnad',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Sko', value: 'shoeing'},
          {title: 'Transport', value: 'transport'},
          {title: 'Veterinær', value: 'vet'},
          {title: 'Oppsitt', value: 'rider'},
          {title: 'Kosttilskudd', value: 'supplement'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'year',
      title: 'År',
      type: 'number',
      group: 'basic',
      validation: (Rule) => Rule.required().min(2024).max(2100),
    }),

    defineField({
      name: 'month',
      title: 'Periode',
      type: 'string',
      group: 'basic',
      options: {
        list: months,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'invoiceNumber',
      title: 'Fakturanummer',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      name: 'invoiceDate',
      title: 'Fakturadato',
      type: 'date',
      group: 'basic',
    }),

    defineField({
      name: 'horses',
      title: 'Hester',
      type: 'array',
      group: 'assignment',
      description:
        'Legg til én eller flere hester. Hvis fakturaen gjelder mange hester, kan du fordele beløp per hest.',
      of: [
        {
          type: 'object',
          name: 'horseSplit',
          title: 'Hest',
          fields: [
            defineField({
              name: 'horse',
              title: 'Hest',
              type: 'reference',
              to: [{type: 'horse'}],
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'amountExVat',
              title: 'Beløp eks mva',
              type: 'number',
              description: 'Beløp som gjelder denne hesten.',
            }),

            defineField({
              name: 'notes',
              title: 'Notat',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'horse.name',
              amount: 'amountExVat',
            },
            prepare({title, amount}: {title?: string; amount?: number}) {
              return {
                title: title || 'Hest',
                subtitle:
                  typeof amount === 'number'
                    ? `${amount.toLocaleString('nb-NO')} kr eks mva`
                    : '',
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'owner',
      title: 'Eier',
      type: 'reference',
      to: [{type: 'owner'}],
      group: 'assignment',
      description: 'Brukes dersom kostnaden ikke skal knyttes direkte til hest.',
    }),

    defineField({
      name: 'totalAmountExVat',
      title: 'Totalt beløp eks mva',
      type: 'number',
      group: 'amount',
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: 'vatExempt',
      title: 'Fritatt mva',
      type: 'boolean',
      group: 'amount',
      initialValue: false,
    }),

    defineField({
      name: 'pdf',
      title: 'Faktura PDF',
      type: 'file',
      group: 'attachment',
      options: {
        accept: 'application/pdf',
      },
    }),

    defineField({
      name: 'notes',
      title: 'Internt notat',
      type: 'text',
      group: 'attachment',
    }),
  ],

  preview: {
    select: {
      supplier: 'supplier.name',
      costType: 'costType',
      year: 'year',
      month: 'month',
      total: 'totalAmountExVat',
    },
    prepare({
      supplier,
      costType,
      year,
      month,
      total,
    }: {
      supplier?: string
      costType?: string
      year?: number
      month?: string
      total?: number
    }) {
      const monthTitle = months.find((m) => m.value === month)?.title || month || ''

      return {
        title: supplier || 'Viderefakturering',
        subtitle: [
          costType,
          monthTitle && year ? `${monthTitle} ${year}` : '',
          typeof total === 'number' ? `${total.toLocaleString('nb-NO')} kr eks mva` : '',
        ]
          .filter(Boolean)
          .join(' • '),
      }
    },
  },
})