// schemaTypes/yearStatsHistoric.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'yearStatsHistoric',
  title: 'År-historisk',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Overskrift',
      type: 'string',
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
      title: 'Årstabell',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'yearRow',
          title: 'Rad',
          fields: [
            {name: 'year', title: 'Årstall', type: 'string'},
            {name: 'starters', title: 'Starter', type: 'string'},
            {name: 'first', title: '1. plass', type: 'string'},
            {name: 'second', title: '2. plass', type: 'string'},
            {name: 'third', title: '3. plass', type: 'string'},
            {name: 'winPercent', title: 'Seiersprosent', type: 'string'},
            {name: 'triplePercent', title: 'Trippelprosent', type: 'string'},
            {name: 'earnings', title: 'Innkjørt', type: 'string'},
          ],
        },
      ],
    }),
  ],
})
