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

  groups: [
    {name: 'basic', title: 'Grunnleggende', default: true},
    {name: 'marketplace', title: 'Andelstorg'},
    {name: 'income', title: 'Inntekter'},
    {name: 'expenses', title: 'Utgifter'},
    {name: 'updates', title: 'Oppdateringer'},
    {name: 'raceComments', title: 'Løpskommentar'},
  ],

  fields: [
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

    defineField({
      name: 'publishToMarketplace',
      title: 'Vis på andelstorg',
      type: 'boolean',
      group: 'marketplace',
      initialValue: false,
      description: 'Skru på hvis hesten skal vises på /andel.',
    }),

    defineField({
      name: 'horseFactText',
      title: 'Faktatekst',
      type: 'text',
      group: 'marketplace',
      rows: 6,
      description: 'Kort presentasjon av hesten til andelstorget.',
    }),

    defineField({
      name: 'videoUrl',
      title: 'Video-link',
      type: 'url',
      group: 'marketplace',
      description: 'For eksempel YouTube eller Vimeo.',
    }),

    defineField({
      name: 'gallery',
      title: 'Galleri',
      type: 'array',
      group: 'marketplace',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),

    defineField({
      name: 'managerComment',
      title: 'Kommentar fra andelsbestyrer',
      type: 'text',
      group: 'marketplace',
      rows: 5,
    }),

    defineField({
      name: 'frodesComment',
      title: 'Kommentar fra Frode',
      type: 'text',
      group: 'marketplace',
      rows: 5,
    }),

    defineField({
      name: 'totalShares',
      title: 'Totalt antall andeler',
      type: 'number',
      group: 'marketplace',
      description: 'Brukes som visningsgrunnlag på andelstorget.',
    }),

    defineField({
      name: 'pricePerShare',
      title: 'Pris per andel',
      type: 'number',
      group: 'marketplace',
    }),

    defineField({
      name: 'contractPdf',
      title: 'Kontrakt PDF',
      type: 'file',
      group: 'marketplace',
      options: {
        accept: 'application/pdf',
      },
    }),

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
            {
              name: 'supplier',
              title: 'Leverandør',
              type: 'reference',
              to: [{type: 'supplier'}],
            },
            {
              name: 'year',
              title: 'År',
              type: 'number',
            },
            {
              name: 'month',
              title: 'Periode',
              type: 'string',
              options: {
                list: months,
                layout: 'dropdown',
              },
            },
            {
              name: 'invoiceNumber',
              title: 'Fakturanummer',
              type: 'string',
            },
            {
              name: 'amount',
              title: 'Netto sum til utbetaling',
              type: 'number',
            },
            {
              name: 'pdf',
              title: 'PDF',
              type: 'file',
              options: {
                accept: 'application/pdf',
              },
            },
          ],
          preview: {
            select: {
              supplierName: 'supplier.name',
              year: 'year',
              month: 'month',
              amount: 'amount',
            },
            prepare({
              supplierName,
              year,
              month,
              amount,
            }: {
              supplierName?: string
              year?: number
              month?: string
              amount?: number
            }) {
              const monthLabel = months.find((m) => m.value === month)?.title || month || ''
              const amountLabel =
                typeof amount === 'number'
                  ? `${amount.toLocaleString('nb-NO')} kr`
                  : ''

              return {
                title: supplierName || 'Utbetaling',
                subtitle: [monthLabel, year?.toString(), amountLabel]
                  .filter(Boolean)
                  .join(' • '),
              }
            },
          },
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
            {
              name: 'supplier',
              title: 'Leverandør',
              type: 'reference',
              to: [{type: 'supplier'}],
            },
            {
              name: 'title',
              title: 'Beskrivelse',
              type: 'string',
            },
            {
              name: 'year',
              title: 'År',
              type: 'number',
            },
            {
              name: 'month',
              title: 'Periode',
              type: 'string',
              options: {
                list: months,
              },
            },
            {
              name: 'invoiceNumber',
              title: 'Fakturanummer',
              type: 'string',
            },
            {
              name: 'amount',
              title: 'Netto sum',
              type: 'number',
            },
            {
              name: 'pdf',
              title: 'PDF',
              type: 'file',
              options: {
                accept: 'application/pdf',
              },
            },
          ],
          preview: {
            select: {
              supplierName: 'supplier.name',
              title: 'title',
              amount: 'amount',
            },
            prepare({
              supplierName,
              title,
              amount,
            }: {
              supplierName?: string
              title?: string
              amount?: number
            }) {
              const amountLabel =
                typeof amount === 'number'
                  ? `${amount.toLocaleString('nb-NO')} kr`
                  : ''

              return {
                title: title || supplierName || 'Inntekt',
                subtitle: [supplierName, amountLabel].filter(Boolean).join(' • '),
              }
            },
          },
        },
      ],
    }),

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
              name: 'month',
              title: 'Periode',
              type: 'string',
              options: {
                list: months,
              },
            },
            {
              name: 'year',
              title: 'År',
              type: 'number',
            },
            {
              name: 'total',
              title: 'Totalsum inkl. mva',
              type: 'number',
            },
            {
              name: 'mainPdf',
              title: 'Hovedfaktura PDF',
              type: 'file',
              options: {
                accept: 'application/pdf',
              },
            },
            {
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
                      options: {
                        accept: 'application/pdf',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

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
            {
              name: 'title',
              title: 'Overskrift',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Beskrivelse',
              type: 'text',
            },
            {
              name: 'youtubeUrl',
              title: 'YouTube link',
              type: 'url',
            },
            {
              name: 'date',
              title: 'Dato',
              type: 'date',
            },
            {
              name: 'author',
              title: 'Forfatter',
              type: 'reference',
              to: [{type: 'staff'}, {type: 'shareManager'}],
            },
          ],
          preview: {
            select: {
              title: 'title',
              date: 'date',
              authorName: 'author.name',
            },
            prepare({title, date, authorName}: {title?: string; date?: string; authorName?: string}) {
              return {
                title: title || 'YouTube',
                subtitle: [date, authorName].filter(Boolean).join(' • '),
              }
            },
          },
        },

        {
          type: 'object',
          name: 'imageMessage',
          title: 'Bildemelding',
          fields: [
            {
              name: 'title',
              title: 'Overskrift',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Beskrivelse',
              type: 'text',
            },
            {
              name: 'images',
              title: 'Bilder',
              type: 'array',
              of: [{type: 'image'}],
            },
            {
              name: 'date',
              title: 'Dato',
              type: 'date',
            },
            {
              name: 'author',
              title: 'Forfatter',
              type: 'reference',
              to: [{type: 'staff'}, {type: 'shareManager'}],
            },
          ],
          preview: {
            select: {
              title: 'title',
              date: 'date',
              authorName: 'author.name',
            },
            prepare({title, date, authorName}: {title?: string; date?: string; authorName?: string}) {
              return {
                title: title || 'Bildemelding',
                subtitle: [date, authorName].filter(Boolean).join(' • '),
              }
            },
          },
        },

        {
          type: 'object',
          name: 'textMessage',
          title: 'Tekstmelding',
          fields: [
            {
              name: 'description',
              title: 'Melding',
              type: 'text',
            },
            {
              name: 'date',
              title: 'Dato',
              type: 'date',
            },
            {
              name: 'author',
              title: 'Forfatter',
              type: 'reference',
              to: [{type: 'staff'}, {type: 'shareManager'}],
            },
          ],
          preview: {
            select: {
              description: 'description',
              date: 'date',
              authorName: 'author.name',
            },
            prepare({
              description,
              date,
              authorName,
            }: {
              description?: string
              date?: string
              authorName?: string
            }) {
              return {
                title: description ? description.slice(0, 50) : 'Tekstmelding',
                subtitle: [date, authorName].filter(Boolean).join(' • '),
              }
            },
          },
        },

        {
          type: 'object',
          name: 'videoMessage',
          title: 'Videomelding',
          fields: [
            {
              name: 'title',
              title: 'Overskrift',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Beskrivelse',
              type: 'text',
            },
            {
              name: 'videos',
              title: 'Videoer',
              type: 'array',
              of: [
                {
                  type: 'file',
                  options: {
                    accept: 'video/*',
                  },
                },
              ],
            },
            {
              name: 'date',
              title: 'Dato',
              type: 'date',
            },
            {
              name: 'author',
              title: 'Forfatter',
              type: 'reference',
              to: [{type: 'staff'}, {type: 'shareManager'}],
            },
          ],
          preview: {
            select: {
              title: 'title',
              date: 'date',
              authorName: 'author.name',
            },
            prepare({title, date, authorName}: {title?: string; date?: string; authorName?: string}) {
              return {
                title: title || 'Videomelding',
                subtitle: [date, authorName].filter(Boolean).join(' • '),
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'raceComments',
      title: 'Løpskommentarer',
      type: 'array',
      group: 'raceComments',
      of: [
        {
          type: 'object',
          name: 'raceComment',
          title: 'Kommentar',
          fields: [
            {
              name: 'title',
              title: 'Overskrift',
              type: 'string',
            },
            {
              name: 'date',
              title: 'Dato',
              type: 'date',
            },
            {
              name: 'description',
              title: 'Beskrivelse',
              type: 'text',
            },
            {
              name: 'author',
              title: 'Forfatter',
              type: 'reference',
              to: [{type: 'staff'}],
            },
          ],
          preview: {
            select: {
              title: 'title',
              date: 'date',
              authorName: 'author.name',
            },
            prepare({title, date, authorName}: {title?: string; date?: string; authorName?: string}) {
              return {
                title: title || 'Løpskommentar',
                subtitle: [date, authorName].filter(Boolean).join(' • '),
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
      managerName: 'shareManager.name',
      marketplace: 'publishToMarketplace',
    },
    prepare({horseName, managerName, marketplace}) {
      return {
        title: horseName || 'Andelshest',
        subtitle: [
          managerName ? `Bestyrer: ${managerName}` : '',
          marketplace ? 'På andelstorg' : '',
        ]
          .filter(Boolean)
          .join(' • '),
      }
    },
  },
})