import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tips',
  title: 'Tips',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Overskrift',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publiseringsdato',
      type: 'date',
    }),

    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{type: 'tipsCategory'}],
    }),

    // 🔁 ENDRET: Spillform → Forfatter
    defineField({
      name: 'author',
      title: 'Forfatter',
      type: 'string',
      initialValue: 'Jokersystemet.no',
    }),

    // 🆕 NY: Travbane
    defineField({
      name: 'track',
      title: 'Travbane',
      type: 'reference',
      to: [{type: 'track'}],
    }),

    defineField({
      name: 'ingress',
      title: 'Ingress',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'content',
      title: 'Innhold',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'link',
      title: 'Ekstern lenke',
      type: 'url',
    }),
  ],
})
