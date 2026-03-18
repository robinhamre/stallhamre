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
      description: 'Valgfritt. Intern føring for når hesten kom i trening.',
    }),

    defineField({
      name: 'outDate',
      title: 'Hest ut (dato)',
      type: 'date',
      description: 'Valgfritt. Intern føring for når hesten forlot trening.',
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
      description:
        'Valgfritt. Bruk dette hvis eier finnes i Owner-registeret. Hvis ikke: bruk manuell tekst under.',
    }),

    defineField({
      name: 'ownerText',
      title: 'Eier (manuell tekst)',
      type: 'string',
      description: 'Valgfritt. Bruk dette hvis eier ikke finnes i Owner-registeret.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.ownerRef && value) {
            return 'Du har valgt eier fra register. Fjern manuell tekst (eller fjern register-eier).'
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
      description: 'F.eks. Norge, Sverige, USA, Tyskland',
    }),

    defineField({
      name: 'pedigree',
      title: 'Stamme',
      type: 'string',
      description: 'F.eks. e. Dream Vacation - u. Abba Hall (e. Garland Lobell)',
    }),

    defineField({
      name: 'sire',
      title: 'Far',
      type: 'string',
    }),

    defineField({
      name: 'dam',
      title: 'Mor',
      type: 'string',
    }),

    defineField({
      name: 'paternalGrandsire',
      title: 'Farfar',
      type: 'string',
    }),

    defineField({
      name: 'paternalGranddam',
      title: 'Farmor',
      type: 'string',
    }),

    defineField({
      name: 'maternalGrandsire',
      title: 'Morfar',
      type: 'string',
    }),

    defineField({
      name: 'maternalGranddam',
      title: 'Mormor',
      type: 'string',
    }),

    defineField({
      name: 'paternalGrandsireSire',
      title: "Farfar´s far",
      type: 'string',
    }),

    defineField({
      name: 'paternalGrandsireDam',
      title: "Farfar´s mor",
      type: 'string',
    }),

    defineField({
      name: 'paternalGranddamSire',
      title: "Farmor´s far",
      type: 'string',
    }),

    defineField({
      name: 'paternalGranddamDam',
      title: "Farmor´s mor",
      type: 'string',
    }),

    defineField({
      name: 'maternalGrandsireSire',
      title: "Morfar´s far",
      type: 'string',
    }),

    defineField({
      name: 'maternalGrandsireDam',
      title: "Morfar´s mor",
      type: 'string',
    }),

    defineField({
      name: 'maternalGranddamSire',
      title: "Mormor´s far",
      type: 'string',
    }),

    defineField({
      name: 'maternalGranddamDam',
      title: 'Mormors mor',
      type: 'string',
    }),

    defineField({
      name: 'damsire',
      title: 'Morfar',
      type: 'string',
      description: 'Eksisterende felt beholdes for kompatibilitet med eldre innhold.',
    }),

    defineField({
      name: 'breeder',
      title: 'Oppdretter',
      type: 'string',
    }),

    defineField({
      name: 'link',
      title: 'Lenke',
      type: 'url',
      description: 'F.eks. lenke til Travsport / Rikstoto / annen referanse',
    }),

    defineField({
      name: 'image1',
      title: 'Bilde 1 (Hovedbilde)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt-tekst', type: 'string' }),
        defineField({ name: 'caption', title: 'Bildetekst', type: 'string' }),
      ],
    }),

    defineField({
      name: 'gallery',
      title: 'Bildegalleri',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt-tekst', type: 'string' },
            { name: 'caption', title: 'Bildetekst', type: 'string' },
          ],
        },
      ],
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