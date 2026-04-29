import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'prisliste',
  title: 'Prisliste',
  type: 'document',

  groups: [
    {name: 'basic', title: 'Grunnleggende', default: true},
    {name: 'pricing', title: 'Pris og mva'},
    {name: 'trackPricing', title: 'Banepriser'},
    {name: 'automation', title: 'Automatisering'},
    {name: 'notes', title: 'Notater'},
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Navn',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'productCode',
      title: 'Produktnr',
      type: 'string',
      group: 'basic',
      description: 'For eksempel 1, 4, 8, 11, 23, 25, 30 osv.',
    }),

    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Boksleie', value: 'boxRent'},
          {title: 'Trening / fór', value: 'trainingFeed'},
          {title: 'Oppseling m/diett', value: 'startFeeDiet'},
          {title: 'Andel av premiepenger (5%)', value: 'prizeShareDomestic'},
          {title: 'Andel av premiepenger (10%)', value: 'prizeShareForeign'},
          {title: 'Mattilsynet (eksport)', value: 'mattilsynetExport'},
          {title: 'Markur', value: 'markur'},
          {title: 'Transport av hest', value: 'transport'},
          {title: 'Carnet papirer', value: 'carnet'},
          {title: 'Annet', value: 'custom'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      group: 'basic',
      rows: 3,
    }),

    defineField({
      name: 'active',
      title: 'Aktiv',
      type: 'boolean',
      group: 'basic',
      initialValue: true,
    }),

    defineField({
      name: 'pricingModel',
      title: 'Prismodell',
      type: 'string',
      group: 'pricing',
      options: {
        list: [
          {title: 'Fast måned', value: 'fixedMonthly'},
          {title: 'Fast gebyr', value: 'fixedFee'},
          {title: 'Per dag', value: 'perDay'},
          {title: 'Per start', value: 'perStart'},
          {title: 'Prosent', value: 'percentage'},
          {title: 'Banepris', value: 'trackPrice'},
          {title: 'Manuell', value: 'manual'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'unitLabel',
      title: 'Enhet',
      type: 'string',
      group: 'pricing',
      description: 'For eksempel måned, dag, start, prosent, stk',
    }),

    defineField({
      name: 'defaultQuantity',
      title: 'Standard antall',
      type: 'number',
      group: 'pricing',
      initialValue: 1,
    }),

    defineField({
      name: 'defaultPriceExVat',
      title: 'Standard pris eks mva',
      type: 'number',
      group: 'pricing',
      hidden: ({document}) => document?.pricingModel === 'percentage',
      description: 'Brukes for faste varer/tjenester og som fallback hvis banepris ikke er satt.',
    }),

    defineField({
      name: 'percentageRate',
      title: 'Prosentsats',
      type: 'number',
      group: 'pricing',
      hidden: ({document}) => document?.pricingModel !== 'percentage',
      description: 'For eksempel 5 eller 10.',
      validation: (Rule) => Rule.min(0).max(100),
    }),

    defineField({
      name: 'vatMode',
      title: 'MVA-type',
      type: 'string',
      group: 'pricing',
      options: {
        list: [
          {title: 'MVA fritatt', value: 'vatExempt'},
          {title: '25% mva', value: 'vat25'},
          {title: 'Uten mva', value: 'noVat'},
        ],
      },
      initialValue: 'vat25',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'allowProration',
      title: 'Tillat delvis måned / proratering',
      type: 'boolean',
      group: 'pricing',
      hidden: ({document}) => document?.pricingModel !== 'fixedMonthly',
      initialValue: false,
      description: 'Brukes for for eksempel Boksleie og Trening / fór når hest kommer inn eller ut midt i måneden.',
    }),

    defineField({
      name: 'dailyPriceExVat',
      title: 'Dagspris eks mva',
      type: 'number',
      group: 'pricing',
      hidden: ({document}) =>
        document?.pricingModel !== 'fixedMonthly' || document?.allowProration !== true,
      description: 'Valgfritt hvis du vil styre delvis måned med fast dagsats.',
    }),

    defineField({
      name: 'useTrackPrices',
      title: 'Bruk banepriser',
      type: 'boolean',
      group: 'trackPricing',
      initialValue: false,
      description: 'Skru på hvis prisen skal hentes fra valgt travbane.',
    }),

    defineField({
      name: 'trackPrices',
      title: 'Banepriser',
      type: 'array',
      group: 'trackPricing',
      hidden: ({document}) => document?.useTrackPrices !== true,
      of: [
        {
          type: 'object',
          name: 'trackPriceItem',
          title: 'Banepris',
          fields: [
            defineField({
              name: 'track',
              title: 'Travbane',
              type: 'reference',
              to: [{type: 'track'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'priceExVat',
              title: 'Pris eks mva',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'notes',
              title: 'Notat',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'track.name',
              price: 'priceExVat',
            },
            prepare({title, price}: {title?: string; price?: number}) {
              return {
                title: title || 'Bane',
                subtitle: typeof price === 'number' ? `${price} kr` : '',
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'foreignTrackNoVat',
      title: 'Uten mva ved utenlandsk bane',
      type: 'boolean',
      group: 'automation',
      initialValue: false,
      description:
        'Praktisk for transport eller andre linjer der bane i utlandet skal være mva-fritt.',
    }),

    defineField({
      name: 'automationKey',
      title: 'Automatiseringsnøkkel',
      type: 'string',
      group: 'automation',
      options: {
        list: [
          {title: 'Boksleie', value: 'boxRent'},
          {title: 'Trening / fór', value: 'trainingFeed'},
          {title: 'Oppseling m/diett', value: 'startFeeDiet'},
          {title: 'Premieandel innland 5%', value: 'prizeShareDomestic'},
          {title: 'Premieandel utland 10%', value: 'prizeShareForeign'},
          {title: 'Mattilsynet eksport', value: 'mattilsynetExport'},
          {title: 'Markur', value: 'markur'},
          {title: 'Transport', value: 'transport'},
          {title: 'Carnet papirer', value: 'carnet'},
          {title: 'Ingen / manuell', value: 'manual'},
        ],
      },
    }),

    defineField({
      name: 'notes',
      title: 'Notater',
      type: 'text',
      group: 'notes',
      rows: 4,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      code: 'productCode',
      category: 'category',
      active: 'active',
    },
    prepare({
      title,
      code,
      category,
      active,
    }: {
      title?: string
      code?: string
      category?: string
      active?: boolean
    }) {
      return {
        title: title || 'Prislinje',
        subtitle: [
          code ? `#${code}` : '',
          category,
          active === false ? 'Inaktiv' : '',
        ]
          .filter(Boolean)
          .join(' • '),
      }
    },
  },
})