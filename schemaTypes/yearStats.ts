// schemaTypes/yearStats.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'yearStats',
  title: 'Årsstatistikk',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Overskrift',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'År',
      type: 'string', // f.eks. "2024"
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Tabelltekst',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'rows',
      title: 'Månedstabell',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'monthRow',
          title: 'Rad',
          fields: [
            {name: 'month', title: 'Måned', type: 'string'},           // April
            {name: 'starters', title: 'Starter', type: 'string'},      // 72
            {name: 'first', title: '1. plass', type: 'string'},        // 15
            {name: 'second', title: '2. plass', type: 'string'},       // 16
            {name: 'third', title: '3. plass', type: 'string'},        // 13
            {name: 'winPercent', title: 'Seiersprosent', type: 'string'},    // "20,83 %"
            {name: 'triplePercent', title: 'Trippelprosent', type: 'string'}, // "61,11 %"
            {name: 'earnings', title: 'Innkjørt', type: 'string'},     // "1 212 532 kr"
          ],
        },
      ],
    }),
  ],
})
