// schemaTypes/proforma.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'proforma',
  title: 'Proforma',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Navn på register',
      type: 'string',
      initialValue: 'Proforma register',
      validation: (Rule) => Rule.required(),
      description: 'Internt navn på dette registeret.',
    }),

    defineField({
      name: 'senders',
      title: 'Avsendere',
      type: 'array',
      description: 'Lagrede avsendere for proforma.',
      of: [
        {
          type: 'object',
          name: 'senderItem',
          title: 'Avsender',
          fields: [
            {
              name: 'name',
              title: 'Navn',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'address',
              title: 'Adresse',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'postalCode',
              title: 'Postnummer',
              type: 'string',
            },
            {
              name: 'postalPlace',
              title: 'Poststed',
              type: 'string',
            },
            {
              name: 'email',
              title: 'E-post',
              type: 'string',
            },
            {
              name: 'organizationNumber',
              title: 'Personnummer / org-nummer',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'name',
              postalPlace: 'postalPlace',
              organizationNumber: 'organizationNumber',
            },
            prepare({
              title,
              postalPlace,
              organizationNumber,
            }: {
              title?: string
              postalPlace?: string
              organizationNumber?: string
            }) {
              return {
                title: title || 'Avsender',
                subtitle: [postalPlace, organizationNumber].filter(Boolean).join(' • '),
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'recipients',
      title: 'Mottakere',
      type: 'array',
      description: 'Lagrede mottakere for proforma.',
      of: [
        {
          type: 'object',
          name: 'recipientItem',
          title: 'Mottaker',
          fields: [
            {
              name: 'name',
              title: 'Navn',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'address',
              title: 'Adresse',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'postalCode',
              title: 'Postnummer',
              type: 'string',
            },
            {
              name: 'postalPlace',
              title: 'Poststed',
              type: 'string',
            },
            {
              name: 'email',
              title: 'E-post',
              type: 'string',
            },
            {
              name: 'organizationNumber',
              title: 'Personnummer / org-nummer',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'name',
              postalPlace: 'postalPlace',
              organizationNumber: 'organizationNumber',
            },
            prepare({
              title,
              postalPlace,
              organizationNumber,
            }: {
              title?: string
              postalPlace?: string
              organizationNumber?: string
            }) {
              return {
                title: title || 'Mottaker',
                subtitle: [postalPlace, organizationNumber].filter(Boolean).join(' • '),
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
    },
    prepare({title}: {title?: string}) {
      return {
        title: title || 'Proforma',
        subtitle: 'Register for avsendere og mottakere',
      }
    },
  },
})