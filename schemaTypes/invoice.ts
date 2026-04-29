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
    {name: 'period', title: 'Faktureringsperiode'},
    {name: 'lines', title: 'Varelinjer'},
    {name: 'attachments', title: 'Vedlegg'},
    {name: 'notes', title: 'Notater / status'},
  ],

  fields: [
    defineField({
      name: 'sourceType',
      title: 'Type registrering',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Ekstern leverandørfaktura', value: 'supplierInvoice'},
          {title: 'Manuell viderefakturering', value: 'manualCharge'},
        ],
        layout: 'radio',
      },
      initialValue: 'supplierInvoice',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'supplier',
      title: 'Leverandør',
      type: 'reference',
      group: 'basic',
      to: [{type: 'supplier'}],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document as any
          if (document?.sourceType === 'supplierInvoice' && !value) {
            return 'Velg leverandør når dette er en ekstern leverandørfaktura.'
          }
          return true
        }),
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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'billingYear',
      title: 'Faktureres på år',
      type: 'number',
      group: 'period',
      validation: (Rule) => Rule.required().min(2024).max(2100),
      description: 'Hvilket år kostnaden skal inn på i viderefaktureringen.',
    }),

    defineField({
      name: 'billingMonth',
      title: 'Faktureres på måned',
      type: 'string',
      group: 'period',
      options: {
        list: months,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      description: 'Hvilken måned kostnaden skal inn på i viderefaktureringen.',
    }),

    defineField({
      name: 'lines',
      title: 'Varelinjer',
      type: 'array',
      group: 'lines',
      validation: (Rule) => Rule.min(1).error('Legg til minst én varelinje.'),
      of: [
        {
          type: 'object',
          name: 'invoiceLine',
          title: 'Varelinje',
          fields: [
            defineField({
              name: 'priceItem',
              title: 'Prislinje',
              type: 'reference',
              to: [{type: 'prisliste'}],
              description: 'Valgfritt. Velg fra prislisten hvis linjen matcher en standard vare/tjeneste.',
            }),

            defineField({
              name: 'serviceDate',
              title: 'Dato for tjeneste',
              type: 'date',
            }),

            defineField({
              name: 'track',
              title: 'Travbane',
              type: 'reference',
              to: [{type: 'track'}],
              description: 'Valgfritt. Praktisk for transport eller oppseling.',
            }),

            defineField({
              name: 'horse',
              title: 'Hest',
              type: 'reference',
              to: [{type: 'horse'}],
              description: 'Velg hest hvis kostnaden gjelder en bestemt hest.',
            }),

            defineField({
              name: 'owner',
              title: 'Eier',
              type: 'reference',
              to: [{type: 'owner'}],
              description: 'Bruk dette hvis linjen skal knyttes direkte til eier, uten hest.',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as any
                  if (!parent?.horse && !value) {
                    return 'Velg enten hest eller eier.'
                  }
                  return true
                }),
            }),

            defineField({
              name: 'description',
              title: 'Beskrivelse',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'quantity',
              title: 'Antall',
              type: 'number',
              initialValue: 1,
              validation: (Rule) => Rule.min(0),
            }),

            defineField({
              name: 'unitPriceExVat',
              title: 'Pris per enhet eks mva',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'vatMode',
              title: 'MVA-type',
              type: 'string',
              options: {
                list: [
                  {title: 'MVA fritatt', value: 'vatExempt'},
                  {title: '25% mva', value: 'vat25'},
                  {title: 'Uten mva', value: 'noVat'},
                ],
              },
              initialValue: 'vat25',
            }),

            defineField({
              name: 'includeOnCustomerInvoice',
              title: 'Ta med på kundefaktura',
              type: 'boolean',
              initialValue: true,
            }),

            defineField({
              name: 'notes',
              title: 'Notat',
              type: 'string',
            }),
          ],

          preview: {
            select: {
              description: 'description',
              horseName: 'horse.name',
              ownerName: 'owner.name',
              quantity: 'quantity',
              unitPrice: 'unitPriceExVat',
            },
            prepare({
              description,
              horseName,
              ownerName,
              quantity,
              unitPrice,
            }: {
              description?: string
              horseName?: string
              ownerName?: string
              quantity?: number
              unitPrice?: number
            }) {
              const total =
                typeof quantity === 'number' && typeof unitPrice === 'number'
                  ? quantity * unitPrice
                  : undefined

              return {
                title: description || 'Varelinje',
                subtitle: [
                  horseName || ownerName,
                  typeof total === 'number' ? `${total} kr eks mva` : '',
                ]
                  .filter(Boolean)
                  .join(' • '),
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'supplierInvoicePdf',
      title: 'Leverandørfaktura PDF',
      type: 'file',
      group: 'attachments',
      options: {
        accept: 'application/pdf',
      },
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'notes',
      options: {
        list: [
          {title: 'Registrert', value: 'registered'},
          {title: 'Klar til fakturering', value: 'ready'},
          {title: 'Ferdig viderefakturert', value: 'invoiced'},
        ],
      },
      initialValue: 'registered',
    }),

    defineField({
      name: 'notes',
      title: 'Interne notater',
      type: 'text',
      group: 'notes',
      rows: 5,
    }),
  ],

  preview: {
    select: {
      supplier: 'supplier.name',
      invoiceNumber: 'invoiceNumber',
      invoiceDate: 'invoiceDate',
      billingYear: 'billingYear',
      billingMonth: 'billingMonth',
      status: 'status',
    },
    prepare({
      supplier,
      invoiceNumber,
      invoiceDate,
      billingYear,
      billingMonth,
      status,
    }: {
      supplier?: string
      invoiceNumber?: string
      invoiceDate?: string
      billingYear?: number
      billingMonth?: string
      status?: string
    }) {
      const monthTitle = months.find((m) => m.value === billingMonth)?.title || billingMonth || ''
      return {
        title: supplier || 'Viderefakturering',
        subtitle: [
          invoiceNumber,
          invoiceDate,
          monthTitle && billingYear ? `${monthTitle} ${billingYear}` : '',
          status,
        ]
          .filter(Boolean)
          .join(' • '),
      }
    },
  },
})