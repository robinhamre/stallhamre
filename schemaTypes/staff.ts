import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'staff',
  title: 'Personal',
  type: 'document',

  groups: [
    {name: 'basic', title: 'Grunninfo', default: true},
    {name: 'contact', title: 'Kontakt'},
    {name: 'payroll', title: 'Lønnsinfo'},
    {name: 'visibility', title: 'Synlighet'},
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      group: 'basic',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      group: 'basic',
      rows: 4,
    }),

    defineField({
      name: 'role',
      title: 'Stilling',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      name: 'employmentType',
      title: 'Ansatttype',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Trener / kusk', value: 'trainerDriver'},
          {title: 'Stallpersonell', value: 'stableStaff'},
          {title: 'Ekstrahjelp / vikar', value: 'temporaryWorker'},
          {title: 'Andelskontakt', value: 'shareContact'},
        ],
      },
    }),

    defineField({
      name: 'branch',
      title: 'Filial',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      group: 'contact',
    }),

    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
      group: 'contact',
    }),

    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      group: 'contact',
    }),

    defineField({
      name: 'postalCode',
      title: 'Postnummer',
      type: 'string',
      group: 'contact',
    }),

    defineField({
      name: 'postalPlace',
      title: 'Poststed',
      type: 'string',
      group: 'contact',
    }),

    defineField({
      name: 'personnummer',
      title: 'Personnummer',
      type: 'string',
      group: 'payroll',
    }),

    defineField({
      name: 'accountNumber',
      title: 'Kontonummer',
      type: 'string',
      group: 'payroll',
    }),

    defineField({
      name: 'employeeNumber',
      title: 'Ansattnummer',
      type: 'string',
      group: 'payroll',
    }),

    defineField({
      name: 'employmentPercentage',
      title: 'Stillingsprosent',
      type: 'number',
      group: 'payroll',
      validation: (Rule) => Rule.min(0).max(100),
    }),

    defineField({
      name: 'startDate',
      title: 'Startdato',
      type: 'date',
      group: 'payroll',
    }),

    defineField({
      name: 'defaultFastlonn',
      title: 'Standard fastlønn',
      type: 'number',
      group: 'payroll',
    }),

    defineField({
      name: 'defaultDagsats',
      title: 'Standard dagsats',
      type: 'number',
      group: 'payroll',
      initialValue: 1050,
    }),

    defineField({
      name: 'visible',
      title: 'Synlig på nettside',
      type: 'boolean',
      group: 'visibility',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      visible: 'visible',
      media: 'image',
    },
    prepare({title, subtitle, visible, media}) {
      return {
        title,
        subtitle: `${subtitle || ''} ${visible === false ? '🚫 Skjult' : ''}`.trim(),
        media,
      }
    },
  },
})