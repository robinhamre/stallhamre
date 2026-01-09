// schemaTypes/owner.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'owner',
  title: 'Eier',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'Privat',
      options: {
        list: [
          {title: 'Privat', value: 'Privat'},
          {title: 'Firma', value: 'Firma'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
    }),

    defineField({
      name: 'postalCode',
      title: 'Postnummer',
      type: 'string',
    }),

    defineField({
      name: 'city',
      title: 'Poststed',
      type: 'string',
    }),

    // ✅ Land – Norge som standard
    defineField({
      name: 'country',
      title: 'Land',
      type: 'string',
      initialValue: 'Norge',
      options: {
        list: [
          {title: 'Norge', value: 'Norge'},
          {title: 'Sverige', value: 'Sverige'},
          {title: 'Danmark', value: 'Danmark'},
          {title: 'Frankrike', value: 'Frankrike'},
          {title: 'Andre', value: 'Andre'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),

    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
      validation: Rule => Rule.email().warning('Ugyldig e-postformat'),
    }),

    // ✅ Automatisk landekode – settes basert på land
    defineField({
      name: 'phoneCountryCode',
      title: 'Landekode',
      type: 'string',
      readOnly: true,
      initialValue: '+47',
      hidden: false,
    }),

    defineField({
      name: 'phoneNumber',
      title: 'Telefonnummer',
      type: 'string',
      description: 'Skriv kun nummer – landekode settes automatisk',
    }),

    defineField({
      name: 'horses',
      title: 'Eide hester',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'horse'}]}],
    }),
  ],

  // 🔁 Automatikk: land → landekode
  document: {
    unstable_transform: (doc: any) => {
      const map: Record<string, string> = {
        Norge: '+47',
        Sverige: '+46',
        Danmark: '+45',
        Frankrike: '+33',
      }

      if (doc?.country && map[doc.country]) {
        doc.phoneCountryCode = map[doc.country]
      }

      if (doc?.country === 'Andre') {
        doc.phoneCountryCode = undefined
      }

      return doc
    },
  },

  preview: {
    select: {
      title: 'name',
      type: 'type',
      cc: 'phoneCountryCode',
      phone: 'phoneNumber',
      country: 'country',
    },
    prepare(selection) {
      const {title, type, cc, phone, country} = selection

      const phoneDisplay =
        cc && phone ? `${cc} ${phone}` : phone ? phone : ''

      const subtitle = [type, country, phoneDisplay]
        .filter(Boolean)
        .join(' · ')

      return {
        title,
        subtitle,
      }
    },
  },
})
