cat > lonnsliste.ts <<'EOF'
import {defineArrayMember, defineField, defineType} from 'sanity'

const MONTHS = [
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
] as const

const EMPLOYEE_TYPES = [
  {title: 'Trener / kusk', value: 'trainerDriver'},
  {title: 'Stallpersonell', value: 'stableStaff'},
  {title: 'Ekstrahjelp / vikar', value: 'temporaryWorker'},
] as const

export default defineType({
  name: 'lonnsliste',
  title: 'Lønnslister',
  type: 'document',
  groups: [
    {name: 'period', title: 'Periode', default: true},
    {name: 'employee', title: 'Ansatt'},
    {name: 'salary', title: 'Lønn'},
    {name: 'expenses', title: 'Utlegg og vedlegg'},
    {name: 'notes', title: 'Notater'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      description: 'Kan stå tom. Blir automatisk bygget i preview.',
    }),

    defineField({
      name: 'year',
      title: 'År',
      type: 'number',
      group: 'period',
      initialValue: new Date().getFullYear(),
      validation: (Rule) => Rule.required().min(2024).max(2100),
    }),

    defineField({
      name: 'month',
      title: 'Måned',
      type: 'string',
      group: 'period',
      options: {
        list: MONTHS,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'periodLabel',
      title: 'Periodeetikett',
      type: 'string',
      group: 'period',
      description: 'Valgfritt. Eksempel: Januar 2026.',
    }),

    defineField({
      name: 'employee',
      title: 'Ansatt',
      type: 'reference',
      to: [{type: 'staff'}],
      group: 'employee',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'employeeType',
      title: 'Ansatttype',
      type: 'string',
      group: 'employee',
      options: {
        list: EMPLOYEE_TYPES,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'employeeSnapshot',
      title: 'Ansattinformasjon for denne lønnskjøringen',
      type: 'object',
      group: 'employee',
      description:
        'Brukes som et historisk snapshot. Fylles ut ved lønnskjøring slik at gammel lønnsdata ikke endrer seg hvis personaldata oppdateres senere.',
      fields: [
        defineField({
          name: 'personnummer',
          title: 'Personnummer',
          type: 'string',
        }),
        defineField({
          name: 'accountNumber',
          title: 'Kontonummer',
          type: 'string',
        }),
        defineField({
          name: 'address',
          title: 'Adresse',
          type: 'string',
        }),
        defineField({
          name: 'postalCode',
          title: 'Postnummer',
          type: 'string',
        }),
        defineField({
          name: 'postalPlace',
          title: 'Poststed',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          title: 'Telefon',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'E-post',
          type: 'string',
        }),
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),

    defineField({
      name: 'fastlonn',
      title: 'Fastlønn',
      type: 'number',
      group: 'salary',
      hidden: ({document}) => document?.employeeType === 'temporaryWorker',
      initialValue: 0,
    }),

    defineField({
      name: 'dagsats',
      title: 'Dagsats',
      type: 'number',
      group: 'salary',
      hidden: ({document}) => document?.employeeType !== 'temporaryWorker',
      initialValue: 1050,
    }),

    defineField({
      name: 'workedDays',
      title: 'Arbeidsdager',
      type: 'array',
      group: 'salary',
      hidden: ({document}) => document?.employeeType !== 'temporaryWorker',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'date',
              title: 'Dato',
              type: 'date',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'from',
              title: 'Fra',
              type: 'string',
              description: 'Eksempel: 07:00',
            }),
            defineField({
              name: 'to',
              title: 'Til',
              type: 'string',
              description: 'Eksempel: 15:30',
            }),
            defineField({
              name: 'location',
              title: 'Gård / sted',
              type: 'string',
            }),
            defineField({
              name: 'comment',
              title: 'Kommentar',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              date: 'date',
              from: 'from',
              to: 'to',
              location: 'location',
            },
            prepare({date, from, to, location}) {
              const time = [from, to].filter(Boolean).join('–')
              return {
                title: date || 'Arbeidsdag',
                subtitle: [time, location].filter(Boolean).join(' • '),
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'premiegrunnlag',
      title: 'Totale innkjørte premiepenger',
      type: 'number',
      group: 'salary',
      hidden: ({document}) => document?.employeeType !== 'trainerDriver',
      description: 'Brukes som grunnlag for 5 % premiepenger til trener / kusk.',
      initialValue: 0,
    }),

    defineField({
      name: 'premieprosent',
      title: 'Premieprosent',
      type: 'number',
      group: 'salary',
      hidden: ({document}) => document?.employeeType !== 'trainerDriver',
      initialValue: 5,
      validation: (Rule) => Rule.min(0).max(100),
    }),

    defineField({
      name: 'oppselinger',
      title: 'Oppselinger',
      type: 'number',
      group: 'salary',
      description: 'Legg inn antall oppselinger denne måneden.',
      initialValue: 0,
    }),

    defineField({
      name: 'dietter',
      title: 'Dietter',
      type: 'array',
      group: 'salary',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'date',
              title: 'Dato',
              type: 'date',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'track',
              title: 'Bane',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'overnight',
              title: 'Med overnatting',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'amount',
              title: 'Beløp',
              type: 'number',
              description: 'Valgfritt dersom dere regner dette ut utenfor studio.',
            }),
            defineField({
              name: 'comment',
              title: 'Kommentar',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              date: 'date',
              track: 'track',
              overnight: 'overnight',
              amount: 'amount',
            },
            prepare({date, track, overnight, amount}) {
              return {
                title: [date, track].filter(Boolean).join(' • '),
                subtitle: [
                  overnight ? 'Med overnatting' : 'Uten overnatting',
                  typeof amount === 'number' ? `${amount} kr` : null,
                ]
                  .filter(Boolean)
                  .join(' • '),
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'expenses',
      title: 'Utlegg',
      type: 'array',
      group: 'expenses',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'date',
              title: 'Dato',
              type: 'date',
            }),
            defineField({
              name: 'supplier',
              title: 'Leverandør / beskrivelse',
              type: 'string',
            }),
            defineField({
              name: 'amount',
              title: 'Beløp',
              type: 'number',
            }),
            defineField({
              name: 'paid',
              title: 'Utbetalt',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'comment',
              title: 'Kommentar',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              supplier: 'supplier',
              amount: 'amount',
              date: 'date',
            },
            prepare({supplier, amount, date}) {
              return {
                title: supplier || 'Utlegg',
                subtitle: [date, typeof amount === 'number' ? `${amount} kr` : null]
                  .filter(Boolean)
                  .join(' • '),
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'attachments',
      title: 'Vedlegg',
      type: 'array',
      group: 'expenses',
      description:
        'Brukes til manuelle timelister, kvitteringer eller andre bilag. Støtter både PDF og bilde.',
      of: [
        defineArrayMember({
          type: 'file',
          options: {
            accept: '.pdf,.jpg,.jpeg,.png,.webp',
          },
          fields: [
            defineField({
              name: 'label',
              title: 'Beskrivelse',
              type: 'string',
            }),
          ],
        }),
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'label',
              title: 'Beskrivelse',
              type: 'string',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'notes',
      options: {
        list: [
          {title: 'Kladd', value: 'draft'},
          {title: 'Klar til utbetaling', value: 'ready'},
          {title: 'Utbetalt', value: 'paid'},
        ],
      },
      initialValue: 'draft',
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
      employeeName: 'employee.name',
      month: 'month',
      year: 'year',
      employeeType: 'employeeType',
      status: 'status',
    },
    prepare({employeeName, month, year, employeeType, status}) {
      const monthTitle =
        MONTHS.find((item) => item.value === month)?.title || month || 'Ukjent måned'

      const typeTitle =
        EMPLOYEE_TYPES.find((item) => item.value === employeeType)?.title || employeeType

      const statusLabel =
        status === 'paid' ? '✅ Utbetalt' : status === 'ready' ? '🟡 Klar' : '📝 Kladd'

      return {
        title: employeeName ? `${employeeName} – ${monthTitle} ${year}` : `${monthTitle} ${year}`,
        subtitle: [typeTitle, statusLabel].filter(Boolean).join(' • '),
      }
    },
  },

  orderings: [
    {
      title: 'Nyeste periode først',
      name: 'periodDesc',
      by: [
        {field: 'year', direction: 'desc'},
        {field: 'month', direction: 'desc'},
      ],
    },
  ],
})
EOF