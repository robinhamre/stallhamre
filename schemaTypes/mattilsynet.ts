// schemaTypes/mattilsynet.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mattilsynet',
  title: 'Mattilsynet',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Navn på register',
      type: 'string',
      initialValue: 'Mattilsynet register',
      validation: (Rule) => Rule.required(),
      description: 'Internt navn på dette registeret.',
    }),

    defineField({
      name: 'consignors',
      title: 'Consignor / Place of loading',
      type: 'array',
      description: 'Lagrede avsendere / lasteplasser.',
      of: [
        {
          type: 'object',
          name: 'consignorItem',
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
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'activityId',
              title: 'Activity ID',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'activityId',
            },
            prepare({title, subtitle}: {title?: string; subtitle?: string}) {
              return {
                title: title || 'Avsender',
                subtitle: subtitle ? `Activity ID: ${subtitle}` : '',
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'consignorContacts',
      title: 'Consignor kontaktpersoner',
      type: 'array',
      description: 'Lagrede kontaktpersoner for avsender.',
      of: [
        {
          type: 'object',
          name: 'consignorContactItem',
          title: 'Kontaktperson',
          fields: [
            {
              name: 'name',
              title: 'Navn',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'phone',
              title: 'Telefon',
              type: 'string',
            },
            {
              name: 'email',
              title: 'E-post',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'name',
              phone: 'phone',
              email: 'email',
            },
            prepare({
              title,
              phone,
              email,
            }: {
              title?: string
              phone?: string
              email?: string
            }) {
              return {
                title: title || 'Kontaktperson',
                subtitle: [phone, email].filter(Boolean).join(' • '),
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'invoiceRecipients',
      title: 'Fakturamottakere',
      type: 'array',
      description: 'Lagrede fakturamottakere.',
      of: [
        {
          type: 'object',
          name: 'invoiceRecipientItem',
          title: 'Fakturamottaker',
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
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'organizationNumber',
              title: 'Organisasjonsnummer',
              type: 'string',
            },
            {
              name: 'phone',
              title: 'Telefon',
              type: 'string',
            },
            {
              name: 'email',
              title: 'E-post',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'name',
              org: 'organizationNumber',
            },
            prepare({title, org}: {title?: string; org?: string}) {
              return {
                title: title || 'Fakturamottaker',
                subtitle: org ? `Org.nr: ${org}` : '',
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'consignees',
      title: 'Consignee / Place of destination',
      type: 'array',
      description: 'Lagrede mottakere / destinasjoner.',
      of: [
        {
          type: 'object',
          name: 'consigneeItem',
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
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'activityId',
              title: 'Activity ID',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'activityId',
            },
            prepare({title, subtitle}: {title?: string; subtitle?: string}) {
              return {
                title: title || 'Mottaker',
                subtitle: subtitle ? `Activity ID: ${subtitle}` : '',
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'transporters',
      title: 'Transportører',
      type: 'array',
      description: 'Lagrede transportører.',
      of: [
        {
          type: 'object',
          name: 'transporterItem',
          title: 'Transportør',
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
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'activityId',
              title: 'Activity ID',
              type: 'string',
            },
            {
              name: 'vehicleRegistration',
              title: 'Regnummer bil',
              type: 'string',
            },
            {
              name: 'driverName',
              title: 'Sjåfør',
              type: 'string',
            },
            {
              name: 'driverPhone',
              title: 'Sjåførs telefon',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'name',
              vehicleRegistration: 'vehicleRegistration',
              driverName: 'driverName',
            },
            prepare({
              title,
              vehicleRegistration,
              driverName,
            }: {
              title?: string
              vehicleRegistration?: string
              driverName?: string
            }) {
              return {
                title: title || 'Transportør',
                subtitle: [vehicleRegistration, driverName].filter(Boolean).join(' • '),
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
        title: title || 'Mattilsynet',
        subtitle: 'Register for avsender, mottaker, fakturamottaker og transportør',
      }
    },
  },
})