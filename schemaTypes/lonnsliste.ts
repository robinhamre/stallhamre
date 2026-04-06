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
  name: 'lonnsliste',
  title: 'Lønnslister',
  type: 'document',

  fields: [
    defineField({
      name: 'year',
      title: 'År',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'month',
      title: 'Måned',
      type: 'string',
      options: {list: months},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'employee',
      title: 'Ansatt',
      type: 'reference',
      to: [{type: 'staff'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'fastlonn',
      title: 'Fastlønn',
      type: 'number',
    }),

    defineField({
      name: 'oppselinger',
      title: 'Oppselinger',
      type: 'number',
    }),

    defineField({
      name: 'dietter',
      title: 'Dietter',
      type: 'number',
    }),

    defineField({
      name: 'expenses',
      title: 'Utlegg',
      type: 'number',
    }),

    defineField({
      name: 'notes',
      title: 'Notater',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      employee: 'employee.name',
      month: 'month',
      year: 'year',
    },
    prepare({employee, month, year}) {
      return {
        title: employee || 'Lønn',
        subtitle: `${month}/${year}`,
      }
    },
  },
})