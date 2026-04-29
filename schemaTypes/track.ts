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
  ],

  fields: [
    // 🔹 Leverandør
    defineField({
      name: 'supplier',
      title: 'Leverandør',
      type: 'reference',
      to: [{type: 'supplier'}],
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 Type kostnad
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

    // 🔹 År
    defineField({
      name: 'year',
      title: 'År',
      type: 'number',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 Måned
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

    // 🔹 Fakturainfo
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

    // 🔥 HESTER (flere)
    defineField({
      name: 'horses',
      title: 'Hester',
      type: 'array',
      group: 'assignment',
      of: [
        {
          type: 'object',
          name: 'horseSplit',
          title: 'Hest',
          fields: [
            {
              name: 'horse',
              title: 'Hest',
              type: 'reference',
              to: [{type: 'horse'}],
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'amount',
              title: 'Beløp eks mva',
              type: 'number',
              description: 'Beløp for denne hesten',
            },
          ],
          preview: {
            select: {
              title: 'horse.name',
              amount: 'amount',
            },
            prepare({title, amount}: any) {
              return {
                title: title || 'Hest',
                subtitle: amount ? `${amount} kr` : '',
              }
            },
          },
        },
      ],
    }),

    // 🔹 Eier (fallback hvis ikke hest)
    defineField({
      name: 'owner',
      title: 'Eier (hvis ikke hest)',
      type: 'reference',
      to: [{type: 'owner'}],
      group: 'assignment',
    }),

    // 🔹 Totalbeløp
    defineField({
      name: 'totalAmount',
      title: 'Totalt beløp eks mva',
      type: 'number',
      group: 'amount',
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 MVA toggle
    defineField({
      name: 'vatExempt',
      title: 'Fritatt mva',
      type: 'boolean',
      group: 'amount',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      supplier: 'supplier.name',
      costType: 'costType',
      year: 'year',
      month: 'month',
      total: 'totalAmount',
    },
    prepare({supplier, costType, year, month, total}: any) {
      const monthTitle = months.find((m) => m.value === month)?.title || month

      return {
        title: supplier || 'Viderefakturering',
        subtitle: [
          costType,
          monthTitle && year ? `${monthTitle} ${year}` : '',
          total ? `${total} kr` : '',
        ]
          .filter(Boolean)
          .join(' • '),
      }
    },
  },
})