// schemaTypes/horse.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'horse',
  title: 'Hest',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'active',
      title: 'Aktiv',
      type: 'boolean',
      initialValue: true,
      description: 'Aktive hester vises i treningslisten på nettsiden.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          const isActive = value === true

          if (isActive && !parent?.ownerRef && !parent?.ownerText) {
            return 'Når hesten er Aktiv må du velge eier (register) eller fylle inn eier manuelt.'
          }

          return true
        }),
    }),

    defineField({
      name: 'inDate',
      title: 'Hest inn (dato)',
      type: 'date',
    }),

    defineField({
      name: 'outDate',
      title: 'Hest ut (dato)',
      type: 'date',
    }),

    defineField({
      name: 'gender',
      title: 'Kjønn',
      type: 'string',
      options: {
        list: [
          { title: 'Hingst', value: 'hingst' },
          { title: 'Hoppe', value: 'hoppe' },
          { title: 'Vallak', value: 'vallak' },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'breed',
      title: 'Rase',
      type: 'string',
      options: {
        list: [
          { title: 'Varmblods', value: 'varmblods' },
          { title: 'Kaldblods', value: 'kaldblods' },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'ownerRef',
      title: 'Eier (velg fra register)',
      type: 'reference',
      to: [{ type: 'owner' }],
    }),

    defineField({
      name: 'ownerText',
      title: 'Eier (manuell tekst)',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.ownerRef && value) {
            return 'Du har valgt eier fra register. Fjern manuell tekst.'
          }
          return true
        }),
    }),

    defineField({
      name: 'birthYear',
      title: 'Fødselsår',
      type: 'number',
    }),

    defineField({
      name: 'country',
      title: 'Fødeland',
      type: 'string',
    }),

    defineField({
      name: 'pedigree',
      title: 'Stamme',
      type: 'string',
    }),

    // 🧬 SLEKT

    defineField({ name: 'sire', title: 'Far', type: 'string' }),
    defineField({ name: 'dam', title: 'Mor', type: 'string' }),

    defineField({ name: 'paternalGrandsire', title: 'Farfar', type: 'string' }),
    defineField({ name: 'paternalGranddam', title: 'Farmor', type: 'string' }),
    defineField({ name: 'maternalGrandsire', title: 'Morfar', type: 'string' }),
    defineField({ name: 'maternalGranddam', title: 'Mormor', type: 'string' }),

    defineField({ name: 'paternalGrandsireSire', title: "Farfar´s far", type: 'string' }),
    defineField({ name: 'paternalGrandsireDam', title: "Farfar´s mor", type: 'string' }),
    defineField({ name: 'paternalGranddamSire', title: "Farmor´s far", type: 'string' }),
    defineField({ name: 'paternalGranddamDam', title: "Farmor´s mor", type: 'string' }),

    defineField({ name: 'maternalGrandsireSire', title: "Morfar´s far", type: 'string' }),
    defineField({ name: 'maternalGrandsireDam', title: "Morfar´s mor", type: 'string' }),
    defineField({ name: 'maternalGranddamSire', title: "Mormor´s far", type: 'string' }),
    defineField({ name: 'maternalGranddamDam', title: 'Mormors mor', type: 'string' }),

    defineField({
      name: 'breeder',
      title: 'Oppdretter',
      type: 'string',
    }),

    defineField({
      name: 'link',
      title: 'Lenke',
      type: 'url',
    }),

    defineField({
      name: 'image1',
      title: 'Bilde 1 (Hovedbilde)',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'gallery',
      title: 'Bildegalleri',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      active: 'active',
      ownerName: 'ownerRef.name',
      ownerText: 'ownerText',
      media: 'image1',
    },
    prepare({ title, active, ownerName, ownerText, media }) {
      const ownerLabel = ownerName || ownerText || 'Ingen eier'
      const status = active ? 'Aktiv' : 'Ikke aktiv'
      return {
        title,
        subtitle: `${status} • ${ownerLabel}`,
        media,
      }
    },
  },
})