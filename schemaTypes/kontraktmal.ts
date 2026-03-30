// schemaTypes/kontraktmal.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'kontraktmal',
  title: 'Kontraktsmaler',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Navn på mal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'contractType',
      title: 'Kontraktstype',
      type: 'string',
      options: {
        list: [
          {title: 'Andelskontrakt', value: 'andelskontrakt'},
          {title: 'Kjøpskontrakt', value: 'kjopskontrakt'},
          {title: 'Oppdragsavtale', value: 'oppdragsavtale'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 3,
      description: 'Valgfri intern beskrivelse av hva malen brukes til.',
    }),

    defineField({
      name: 'sections',
      title: 'Innhold / punkter',
      type: 'array',
      description:
        'Legg til så mange punkter du vil. Du kan bruke nummerering som 1, 2, 6, 6.1, 6.2 osv.',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Tekstpunkt',
          fields: [
            defineField({
              name: 'number',
              title: 'Punktnummer',
              type: 'string',
              description: 'F.eks. 1, 2, 6, 6.1, 6.2',
            }),
            defineField({
              name: 'heading',
              title: 'Overskrift',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Innhold',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{title: 'Normal', value: 'normal'}],
                  lists: [{title: 'Bullet', value: 'bullet'}],
                  marks: {
                    decorators: [
                      {title: 'Bold', value: 'strong'},
                      {title: 'Italic', value: 'em'},
                      {title: 'Underline', value: 'underline'},
                    ],
                    annotations: [
                      {
                        name: 'link',
                        title: 'Lenke',
                        type: 'object',
                        fields: [
                          {
                            name: 'href',
                            title: 'URL',
                            type: 'url',
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              number: 'number',
              heading: 'heading',
            },
            prepare({number, heading}: {number?: string; heading?: string}) {
              return {
                title: heading || 'Tekstpunkt',
                subtitle: number ? `Punkt ${number}` : 'Uten nummer',
              }
            },
          },
        },

        {
          type: 'object',
          name: 'tableSection',
          title: 'Tabell',
          fields: [
            defineField({
              name: 'number',
              title: 'Punktnummer',
              type: 'string',
              description: 'F.eks. 4 eller 6.1',
            }),
            defineField({
              name: 'heading',
              title: 'Overskrift',
              type: 'string',
            }),
            defineField({
              name: 'columns',
              title: 'Kolonner',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'columnItem',
                  title: 'Kolonne',
                  fields: [
                    {
                      name: 'title',
                      title: 'Kolonnenavn',
                      type: 'string',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'title',
                    },
                  },
                },
              ],
            }),
            defineField({
              name: 'rows',
              title: 'Rader',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'rowItem',
                  title: 'Rad',
                  fields: [
                    {
                      name: 'cells',
                      title: 'Celler',
                      type: 'array',
                      of: [
                        {
                          type: 'string',
                        },
                      ],
                    },
                  ],
                  preview: {
                    select: {
                      cells: 'cells',
                    },
                    prepare({cells}: {cells?: string[]}) {
                      return {
                        title: 'Rad',
                        subtitle: cells?.join(' | ') || '',
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              number: 'number',
              heading: 'heading',
            },
            prepare({number, heading}: {number?: string; heading?: string}) {
              return {
                title: heading || 'Tabell',
                subtitle: number ? `Punkt ${number}` : 'Tabell',
              }
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      contractType: 'contractType',
    },
    prepare({
      title,
      contractType,
    }: {
      title?: string
      contractType?: string
    }) {
      const label =
        contractType === 'andelskontrakt'
          ? 'Andelskontrakt'
          : contractType === 'kjopskontrakt'
            ? 'Kjøpskontrakt'
            : contractType === 'oppdragsavtale'
              ? 'Oppdragsavtale'
              : ''

      return {
        title: title || 'Kontraktsmal',
        subtitle: label,
      }
    },
  },
})