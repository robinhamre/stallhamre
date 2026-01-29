// schemaTypes/invoice.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'invoice',
  title: 'Viderefakturering',
  type: 'document',

  fields: [
    // -------------------
    // Hovedpunkter
    // -------------------
    defineField({
      name: 'supplier',
      title: 'Leverandør',
      type: 'reference',
      to: [{type: 'supplier'}],
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'invoiceNumber',
      title: 'Fakturanummer',
      type: 'string',
    }),

    defineField({
      name: 'invoiceDate',
      title: 'Fakturadato',
      type: 'date',
      validation: Rule => Rule.required(),
    }),

    // -------------------
    // Produkter / varelinjer
    // -------------------
    defineField({
      name: 'lines',
      title: 'Produkter / varelinjer',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'invoiceLine',
          title: 'Varelinje',
          fields: [
            defineField({
              name: 'serviceDate',
              title: 'Dato for tjeneste (tekst)',
              type: 'string',
              description: 'Valgfritt (f.eks. "Uke 3" / "12.01.2026")',
            }),

            defineField({
              name: 'horse',
              title: 'Hest',
              type: 'reference',
              to: [{type: 'horse'}],
              description: 'Velg hest hvis relevant',
            }),

            defineField({
              name: 'owner',
              title: 'Eier (hvis ikke hest er valgt)',
              type: 'reference',
              to: [{type: 'owner'}],
              description: 'Bruk dette dersom varelinjen ikke knyttes til en hest',
              validation: Rule =>
                Rule.custom((value, context) => {
                  const parent = context.parent as any
                  if (!parent?.horse && !value) return 'Velg eier hvis du ikke velger hest.'
                  if (parent?.horse && value) return 'Fjern eier når hest er valgt (eier finnes via hesten).'
                  return true
                }),
            }),

            defineField({
              name: 'description',
              title: 'Beskrivelse',
              type: 'string',
              validation: Rule => Rule.required(),
            }),

            defineField({
              name: 'amountExVat',
              title: 'Beløp eks mva',
              type: 'number',
            }),

            defineField({
              name: 'amountIncVat',
              title: 'Beløp ink mva',
              type: 'number',
              description: 'Bruk kun hvis "Beløp eks mva" ikke er fylt ut',
            }),
          ],

          // Validering på selve linje-objektet:
          validation: Rule =>
            Rule.custom((line: any) => {
              if (!line) return true

              const ex = line.amountExVat
              const inc = line.amountIncVat

              if ((ex === undefined || ex === null) && (inc === undefined || inc === null)) {
                return 'Fyll ut enten "Beløp eks mva" eller "Beløp ink mva".'
              }
              if ((ex !== undefined && ex !== null) && (inc !== undefined && inc !== null)) {
                return 'Bruk kun ett beløpsfelt (enten eks mva eller ink mva).'
              }
              return true
            }),
        },
      ],
      validation: Rule => Rule.min(1).error('Legg til minst én varelinje.'),
    }),
  ],

  preview: {
    select: {
      supplier: 'supplier.name',
      date: 'invoiceDate',
      number: 'invoiceNumber',
    },
    prepare({supplier, date, number}) {
      const left = supplier || 'Viderefakturering'
      const right = [number, date].filter(Boolean).join(' • ')
      return {title: left, subtitle: right}
    },
  },
})
