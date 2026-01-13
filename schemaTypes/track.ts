// schemaTypes/track.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'track',
  title: 'Travbane',
  type: 'document',

  fields: [
    // 1. Navn
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // 2. Land
    defineField({
      name: 'country',
      title: 'Land',
      type: 'string',
      options: {
        list: [
          {title: 'Norge', value: 'Norge'},
          {title: 'Sverige', value: 'Sverige'},
          {title: 'Danmark', value: 'Danmark'},
          {title: 'Finland', value: 'Finland'},
          {title: 'Frankrike', value: 'Frankrike'},
          {title: 'Andre', value: 'Andre'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'Norge',
    }),

    // 3. Banelengde
    defineField({
      name: 'trackLength',
      title: 'Banelengde (meter)',
      type: 'number',
      description: 'F.eks. 800, 1000, 1400',
    }),

    // 4. Oppløpslengde
    defineField({
      name: 'homeStretch',
      title: 'Oppløpslengde (meter)',
      type: 'number',
      description: 'Lengde på oppløpet i meter',
    }),

    // 5. Lenke
    defineField({
      name: 'link',
      title: 'Lenke',
      type: 'url',
      description: 'F.eks. baneinfo hos Norsk Trav / Svensk Trav',
    }),

    // 6. Bilde
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
        }),
        defineField({
          name: 'caption',
          title: 'Bildetekst',
          type: 'string',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'country',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? `Land: ${subtitle}` : '',
        media,
      }
    },
  },
})
