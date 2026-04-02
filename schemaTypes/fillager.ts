// schemaTypes/fillager.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'fillager',
  title: 'Fillager',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'supplier',
      title: 'Leverandør',
      type: 'reference',
      to: [{type: 'supplier'}],
      description: 'Velg leverandør hvis dokumentet er knyttet til en leverandør.',
    }),

    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Veterinærattest', value: 'veterinaerattest'},
          {title: 'Signalementskjema', value: 'signalementskjema'},
          {title: 'Kontrakt', value: 'kontrakt'},
          {title: 'Skjema', value: 'skjema'},
          {title: 'Annet', value: 'annet'},
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'pdfFile',
      title: 'PDF-fil',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      supplierName: 'supplier.name',
      category: 'category',
    },
    prepare({
      title,
      supplierName,
      category,
    }: {
      title?: string
      supplierName?: string
      category?: string
    }) {
      return {
        title: title || 'Dokument',
        subtitle: [supplierName, category].filter(Boolean).join(' • '),
      }
    },
  },
})