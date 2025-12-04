// schemaTypes/staff.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'staff',
  title: 'Personal',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Stilling',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string', // f.eks. "+47 414 75 400"
    }),
    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
    }),
    defineField({
      name: 'branch',
      title: 'Filial',
      type: 'string', // f.eks. "Ulleberg Gård", "Wiik Gård"
    }),
  ],
})
