// schemaTypes/shareOffer.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shareOffer',
  title: 'Andelstilbud',
  type: 'document',

  fields: [
    // -----------------------
    // Knytter tilbudet til hest
    // -----------------------
    defineField({
      name: 'horse',
      title: 'Hest',
      type: 'reference',
      to: [{type: 'horse'}],
      validation: (Rule) => Rule.required(),
    }),

    // -----------------------
    // Stamtavle (under hest)
    // -----------------------
    defineField({
      name: 'pedigree',
      title: 'Stamtavle',
      type: 'object',
      fields: [
        defineField({name: 'sire', title: 'Far', type: 'string'}),
        defineField({name: 'dam', title: 'Mor', type: 'string'}),
        defineField({name: 'paternalGrandsire', title: 'Farfar', type: 'string'}),
        defineField({name: 'paternalGranddam', title: 'Farmor', type: 'string'}),
        defineField({name: 'maternalGrandsire', title: 'Morfar', type: 'string'}),
        defineField({name: 'maternalGranddam', title: 'Mormor', type: 'string'}),

        defineField({name: 'paternalGrandsireSire', title: "Farfar´s far", type: 'string'}),
        defineField({name: 'paternalGrandsireDam', title: "Farfar´s mor", type: 'string'}),
        defineField({name: 'paternalGranddamSire', title: "Farmor´s far", type: 'string'}),
        defineField({name: 'paternalGranddamDam', title: "Farmor´s mor", type: 'string'}),

        defineField({name: 'maternalGrandsireSire', title: "Morfar´s far", type: 'string'}),
        defineField({name: 'maternalGrandsireDam', title: "Morfar´s mor", type: 'string'}),
        defineField({name: 'maternalGranddamSire', title: "Mormor´s far", type: 'string'}),
        defineField({name: 'maternalGranddamDam', title: "Mormors mor", type: 'string'}),
      ],
    }),

    // -----------------------
    // Innhold om hesten (for andelstilbudet)
    // -----------------------
    defineField({
      name: 'horseFactText',
      title: 'Faktatekst om hesten',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'videoUrl',
      title: 'Video (YouTube-link)',
      type: 'url',
      description: 'Lim inn YouTube URL',
    }),

    defineField({
      name: 'gallery',
      title: 'Bildegalleri',
      type: 'array',
      of: [
        defineField({
          name: 'galleryImage',
          title: 'Bilde',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'caption', title: 'Bildetekst', type: 'string'}),
            defineField({name: 'alt', title: 'Alt-tekst', type: 'string'}),
          ],
        }),
      ],
    }),

    // -----------------------
    // Andelsbestyrer + kommentarer
    // -----------------------
    defineField({
      name: 'manager',
      title: 'Andelsbestyrer',
      type: 'reference',
      to: [{type: 'shareManager'}],
    }),

    defineField({
      name: 'managerComment',
      title: 'Andelsbestyrers kommentar',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'frodesComment',
      title: 'Frode Hamres kommentar',
      type: 'text',
      rows: 4,
    }),

    // -----------------------
    // Info om andeler
    // -----------------------
    defineField({
      name: 'totalShares',
      title: 'Antall andeler',
      type: 'number',
    }),

    defineField({
      name: 'availableShares',
      title: 'Ledige andeler',
      type: 'number',
    }),

    defineField({
      name: 'pricePerShare',
      title: 'Pris per andel',
      type: 'number',
      description: 'Beløp i kroner',
    }),

    defineField({
      name: 'contract',
      title: 'Andelskontrakt (PDF)',
      type: 'file',
      options: {accept: '.pdf'},
    }),
  ],

  preview: {
    select: {
      title: 'horse.name',
      media: 'horse.image1',
      availableShares: 'availableShares',
    },
    prepare({title, media, availableShares}) {
      return {
        title: title || 'Andelstilbud',
        subtitle:
          typeof availableShares === 'number' ? `Ledige andeler: ${availableShares}` : '',
        media,
      }
    },
  },
})