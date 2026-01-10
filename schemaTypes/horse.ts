// schemaTypes/horse.ts
import {defineField, defineType} from 'sanity'

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

    // ✅ SLUG (rett under navn)
    defineField({
      name: 'slug',
      title: 'URL / Slug',
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
    }),

    defineField({
      name: 'gender',
      title: 'Kjønn',
      type: 'string',
      options: {
        list: [
          {title: 'Hingst', value: 'hingst'},
          {title: 'Hoppe', value: 'hoppe'},
          {title: 'Vallak', value: 'vallak'},
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
          {title: 'Varmblods', value: 'varmblods'},
          {title: 'Kaldblods', value: 'kaldblods'},
        ],
        layout: 'radio',
      },
    }),

    // Eier: enten velge owner (reference) eller skrive manuelt
    defineField({
      name: 'ownerRef',
      title: 'Eier (velg fra register)',
      type: 'reference',
      to: [{type: 'owner'}],
      description:
        'Valgfritt. Hvis du ikke velger her kan du skrive eier manuelt i feltet under.',
    }),

    defineField({
      name: 'ownerText',
      title: 'Eier (manuell tekst)',
      type: 'string',
      description: 'Bruk dette hvis eier ikke finnes i Owner-registeret.',
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
      name: 'damsire',
      title: 'Morfar',
      type: 'string',
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
      options: {hotspot: true},
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

    defineField({
      name: 'gallery',
      title: 'Bildegalleri',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alt-tekst', type: 'string'},
            {name: 'caption', title: 'Bildetekst', type: 'string'},
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
    prepare({title, active, ownerName, ownerText, media}) {
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
