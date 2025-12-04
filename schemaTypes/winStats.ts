// schemaTypes/winStats.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'winStats',
  title: 'Seiersstatistikk',
  type: 'document',
  fields: [
    // Overskrift – f.eks. "Gruppe 1"
    defineField({
      name: 'title',
      title: 'Overskrift',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Hvilken kategori/tab dette er
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Gruppe 1', value: 'gruppe-1'},
          {title: 'Klassiske seiere', value: 'klassiske-seiere'},
          {title: 'Mesterskap', value: 'mesterskap'},
          {title: 'Internasjonale', value: 'internasjonale'},
          {title: 'Kaldblods', value: 'kaldblods'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    // Tekst under overskriften over tabellen
    defineField({
      name: 'intro',
      title: 'Tabelltekst',
      type: 'text',
      rows: 3,
    }),

    // Selve tabellen – mange rader
    defineField({
      name: 'rows',
      title: 'Resultater',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'resultRow',
          title: 'Rad',
          fields: [
            {name: 'race', title: 'Løp', type: 'string'},           // Oslo Grand Prix
            {name: 'year', title: 'År', type: 'string'},             // 2020
            {name: 'horse', title: 'Hest', type: 'string'},          // Ble du Gers ...
            {name: 'driver', title: 'Kusk', type: 'string'},         // Per Oleg Midtfjeld
            {name: 'track', title: 'Bane', type: 'string'},          // Bjerke Travbane
            {name: 'earnings', title: 'Innkjørt', type: 'string'},   // 350 000 kr
          ],
        },
      ],
    }),
  ],
})
