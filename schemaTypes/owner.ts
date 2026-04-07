import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'owner',
  title: 'Eier',
  type: 'document',

  groups: [
    {name: 'personalia', title: 'Personalia', default: true},
    {name: 'invoice', title: 'Fakturainformasjon'},
    {name: 'horsesContracts', title: 'Hester / kontrakt'},
  ],

  fields: [
    defineField({
      name: 'ownerType',
      title: 'Type',
      type: 'string',
      group: 'personalia',
      options: {
        list: [
          {title: 'Privat', value: 'privat'},
          {title: 'Firma', value: 'firma'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'privat',
    }),

    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      group: 'personalia',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'careOf',
      title: 'c/o kontaktperson',
      type: 'string',
      group: 'personalia',
      hidden: ({document}) => document?.ownerType !== 'firma',
      description: 'Brukes når eier er firma.',
    }),

    defineField({
      name: 'organizationNumber',
      title: 'Organisasjonsnummer',
      type: 'string',
      group: 'personalia',
      hidden: ({document}) => document?.ownerType !== 'firma',
    }),

    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
      group: 'personalia',
    }),

    defineField({
      name: 'phoneCountryCode',
      title: 'Landkode',
      type: 'string',
      group: 'personalia',
      options: {
        list: [
          {title: '+47 (Norge)', value: '+47'},
          {title: '+46 (Sverige)', value: '+46'},
          {title: '+45 (Danmark)', value: '+45'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: '+47',
    }),

    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      group: 'personalia',
      description: 'Kun nummer, uten landkode',
    }),

    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      group: 'personalia',
    }),

    defineField({
      name: 'postalCode',
      title: 'Postnummer',
      type: 'string',
      group: 'personalia',
    }),

    defineField({
      name: 'postalPlace',
      title: 'Poststed',
      type: 'string',
      group: 'personalia',
    }),

    defineField({
      name: 'country',
      title: 'Land',
      type: 'string',
      group: 'personalia',
      options: {
        list: [
          {title: 'Norge', value: 'Norge'},
          {title: 'Sverige', value: 'Sverige'},
          {title: 'Danmark', value: 'Danmark'},
          {title: 'Frankrike', value: 'Frankrike'},
          {title: 'Andre', value: 'Andre'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'Norge',
    }),

    defineField({
      name: 'invoiceSameAsPersonalia',
      title: 'Autofyll fakturainfo fra personalia',
      type: 'boolean',
      group: 'invoice',
      initialValue: true,
      description: 'Hak av hvis fakturainformasjon er lik personalia.',
    }),

    defineField({
      name: 'invoiceRecipient',
      title: 'Fakturamottaker',
      type: 'string',
      group: 'invoice',
      hidden: ({document}) => document?.invoiceSameAsPersonalia === true,
      description: 'Hvis tom og autofyll er valgt, brukes navn fra personalia.',
    }),

    defineField({
      name: 'invoiceCareOf',
      title: 'Faktura c/o kontaktperson',
      type: 'string',
      group: 'invoice',
      hidden: ({document}) =>
        document?.invoiceSameAsPersonalia === true || document?.ownerType !== 'firma',
    }),

    defineField({
      name: 'invoiceOrganizationNumber',
      title: 'Faktura organisasjonsnummer',
      type: 'string',
      group: 'invoice',
      hidden: ({document}) =>
        document?.invoiceSameAsPersonalia === true || document?.ownerType !== 'firma',
    }),

    defineField({
      name: 'invoiceEmail',
      title: 'Faktura e-post',
      type: 'string',
      group: 'invoice',
      hidden: ({document}) => document?.invoiceSameAsPersonalia === true,
    }),

    defineField({
      name: 'invoicePhoneCountryCode',
      title: 'Faktura landkode',
      type: 'string',
      group: 'invoice',
      hidden: ({document}) => document?.invoiceSameAsPersonalia === true,
      options: {
        list: [
          {title: '+47 (Norge)', value: '+47'},
          {title: '+46 (Sverige)', value: '+46'},
          {title: '+45 (Danmark)', value: '+45'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: '+47',
    }),

    defineField({
      name: 'invoicePhone',
      title: 'Faktura telefon',
      type: 'string',
      group: 'invoice',
      hidden: ({document}) => document?.invoiceSameAsPersonalia === true,
      description: 'Kun nummer, uten landkode',
    }),

    defineField({
      name: 'invoiceAddress',
      title: 'Faktura adresse',
      type: 'string',
      group: 'invoice',
      hidden: ({document}) => document?.invoiceSameAsPersonalia === true,
    }),

    defineField({
      name: 'invoicePostalCode',
      title: 'Faktura postnummer',
      type: 'string',
      group: 'invoice',
      hidden: ({document}) => document?.invoiceSameAsPersonalia === true,
    }),

    defineField({
      name: 'invoicePostalPlace',
      title: 'Faktura poststed',
      type: 'string',
      group: 'invoice',
      hidden: ({document}) => document?.invoiceSameAsPersonalia === true,
    }),

    defineField({
      name: 'invoiceCountry',
      title: 'Faktura land',
      type: 'string',
      group: 'invoice',
      hidden: ({document}) => document?.invoiceSameAsPersonalia === true,
      options: {
        list: [
          {title: 'Norge', value: 'Norge'},
          {title: 'Sverige', value: 'Sverige'},
          {title: 'Danmark', value: 'Danmark'},
          {title: 'Frankrike', value: 'Frankrike'},
          {title: 'Andre', value: 'Andre'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'Norge',
    }),

    defineField({
      name: 'horses',
      title: 'Eide hester',
      type: 'array',
      group: 'horsesContracts',
      of: [{type: 'reference', to: [{type: 'horse'}]}],
      description: 'Valgfritt. Hester kan også velge eier fra horse.ts',
    }),

    defineField({
      name: 'contracts',
      title: 'Oppdragsavtaler (eier)',
      type: 'array',
      group: 'horsesContracts',
      of: [
        {
          type: 'object',
          name: 'contractItem',
          title: 'Oppdragsavtale',
          fields: [
            {
              name: 'horse',
              title: 'Hest',
              type: 'reference',
              to: [{type: 'horse'}],
            },
            {
              name: 'file',
              title: 'PDF',
              type: 'file',
              options: {
                accept: 'application/pdf',
              },
            },
          ],
          preview: {
            select: {
              horseName: 'horse.name',
            },
            prepare({horseName}: {horseName?: string}) {
              return {
                title: horseName || 'Oppdragsavtale',
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'notes',
      title: 'Notater',
      type: 'text',
      group: 'horsesContracts',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      invoiceRecipient: 'invoiceRecipient',
      invoiceSameAsPersonalia: 'invoiceSameAsPersonalia',
      ownerType: 'ownerType',
      organizationNumber: 'organizationNumber',
    },
    prepare({
      title,
      invoiceRecipient,
      invoiceSameAsPersonalia,
      ownerType,
      organizationNumber,
    }) {
      const recipient =
        invoiceSameAsPersonalia || !invoiceRecipient
          ? 'Faktura = personalia'
          : `Faktura: ${invoiceRecipient}`

      const typeLabel = ownerType === 'firma' ? 'Firma' : 'Privat'
      const orgLabel =
        ownerType === 'firma' && organizationNumber
          ? `Org.nr: ${organizationNumber}`
          : ''

      return {
        title,
        subtitle: [typeLabel, orgLabel, recipient].filter(Boolean).join(' • '),
      }
    },
  },
})