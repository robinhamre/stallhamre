import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'result',
  title: 'Resultater',
  type: 'document',
  fields: [
    defineField({
      name: 'raceName',
      title: 'Løpsnavn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{type: 'resultCategory'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'date',
      title: 'Dato',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'horse',
      title: 'Hest',
      type: 'reference',
      to: [{type: 'horse'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'driver',
      title: 'Kusk',
      type: 'string',
    }),

    defineField({
      name: 'track',
      title: 'Bane',
      type: 'string',
    }),

    defineField({
      name: 'earnings',
      title: 'Innkjørt',
      type: 'number',
      description: 'Kun tall. (Format/valuta kan håndteres i frontend.)',
    }),
  ],

  preview: {
    select: {
      title: 'raceName',
      date: 'date',
      horseName: 'horse.name',
    },
    prepare({title, date, horseName}) {
      const d = date ? ` • ${date}` : ''
      const h = horseName ? ` – ${horseName}` : ''
      return {
        title: `${title}${h}`,
        subtitle: `Resultat${d}`,
      }
    },
  },
})
