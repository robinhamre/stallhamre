import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'supplier',
  title: 'Leverandør',
  type: 'document',

  groups: [
    {name: 'basic', title: 'Grunnleggende', default: true},
    {name: 'address', title: 'Adresse'},
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
      name: 'category',
      title: 'Kategori',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Veterinær', value: 'veterinar'},
          {title: 'Fôr', value: 'for'},
          {title: 'Transport', value: 'transport'},
          {title: 'Utstyr', value: 'utstyr'},
          {title: 'Stall / gård', value: 'stall'},
          {title: 'Regnskap', value: 'regnskap'},
          {title: 'Offentlig', value: 'offentlig'},
          {title: 'Annet', value: 'annet'},
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'contactPerson',
      title: 'Kontaktperson',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      name: 'organizationNumber',
      title: 'Organisasjonsnummer',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      group: 'basic',
    }),

    // 🔹 Adresse
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      group: 'address',
    }),

    defineField({
      name: 'postalCode',
      title: 'Postnummer',
      type: 'string',
      group: 'address',
    }),

    defineField({
      name: 'postalPlace',
      title: 'Poststed',
      type: 'string',
      group: 'address',
    }),

    defineField({
      name: 'country',
      title: 'Land',
      type: 'string',
      group: 'address',
      options: {
        list: [
          {title: 'Norge', value: 'Norge'},
          {title: 'Sverige', value: 'Sverige'},
          {title: 'Danmark', value: 'Danmark'},
          {title: 'Finland', value: 'Finland'},
          {title: 'Frankrike', value: 'Frankrike'},
          {title: 'Andre', value: 'Andre'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'Norge',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      category: 'category',
      city: 'postalPlace',
    },
    prepare({title, category, city}) {
      return {
        title,
        subtitle: [category, city].filter(Boolean).join(' • '),
      }
    },
  },
})