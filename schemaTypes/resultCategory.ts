import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resultCategory',
  title: 'Resultat-kategorier',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Kategori',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
  ],
})
