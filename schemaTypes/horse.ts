import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'horse',
  title: 'Hest',
  type: 'document',

  groups: [
    { name: 'basic', title: 'Grunnleggende', default: true },
    { name: 'pedigree', title: 'Stamtavle' },
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'ulen',
      title: 'ULEN (Regnr)',
      type: 'string',
      group: 'basic',
      description: 'Unikt registreringsnummer fra travsport',
    }),

    defineField({
      name: 'recordAsOf010126',
      title: 'Rekord pr 01.01.26',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      name: 'grunnlagAsOf010126',
      title: 'Grunnlag pr 01.01.26',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      name: 'active',
      title: 'Aktiv',
      type: 'boolean',
      group: 'basic',
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
      group: 'basic',
    }),

    defineField({
      name: 'outDate',
      title: 'Hest ut (dato)',
      type: 'date',
      group: 'basic',
    }),

    defineField({
      name: 'gender',
      title: 'Kjønn',
      type: 'string',
      group: 'basic',
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
      group: 'basic',
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
      group: 'basic',
      to: [{ type: 'owner' }],
    }),

    defineField({
      name: 'ownerText',
      title: 'Eier (manuell tekst)',
      type: 'string',
      group: 'basic',
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
      name: 'caretaker',
      title: 'Oppasser',
      type: 'reference',
      group: 'basic',
      to: [{ type: 'staff' }],
      description: 'Velg oppasser for hesten fra Personal-registeret.',
    }),

    defineField({
      name: 'birthYear',
      title: 'Fødselsår',
      type: 'number',
      group: 'basic',
    }),

    defineField({
      name: 'country',
      title: 'Fødeland',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      name: 'pedigree',
      title: 'Stamme',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      name: 'breeder',
      title: 'Oppdretter',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      name: 'link',
      title: 'Lenke',
      type: 'url',
      group: 'basic',
    }),

    defineField({
      name: 'image1',
      title: 'Bilde 1 (Hovedbilde)',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
    }),

    defineField({
      name: 'gallery',
      title: 'Bildegalleri',
      type: 'array',
      group: 'basic',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    defineField({ name: 'sire', title: 'Far', type: 'string', group: 'pedigree' }),
    defineField({ name: 'dam', title: 'Mor', type: 'string', group: 'pedigree' }),

    defineField({ name: 'paternalGrandsire', title: 'Farfar', type: 'string', group: 'pedigree' }),
    defineField({ name: 'paternalGranddam', title: 'Farmor', type: 'string', group: 'pedigree' }),
    defineField({ name: 'maternalGrandsire', title: 'Morfar', type: 'string', group: 'pedigree' }),
    defineField({ name: 'maternalGranddam', title: 'Mormor', type: 'string', group: 'pedigree' }),

    defineField({ name: 'paternalGrandsireSire', title: "Farfar´s far", type: 'string', group: 'pedigree' }),
    defineField({ name: 'paternalGrandsireDam', title: "Farfar´s mor", type: 'string', group: 'pedigree' }),
    defineField({ name: 'paternalGranddamSire', title: "Farmor´s far", type: 'string', group: 'pedigree' }),
    defineField({ name: 'paternalGranddamDam', title: "Farmor´s mor", type: 'string', group: 'pedigree' }),

    defineField({ name: 'maternalGrandsireSire', title: "Morfar´s far", type: 'string', group: 'pedigree' }),
    defineField({ name: 'maternalGrandsireDam', title: "Morfar´s mor", type: 'string', group: 'pedigree' }),
    defineField({ name: 'maternalGranddamSire', title: "Mormor´s far", type: 'string', group: 'pedigree' }),
    defineField({ name: 'maternalGranddamDam', title: 'Mormors mor', type: 'string', group: 'pedigree' }),
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