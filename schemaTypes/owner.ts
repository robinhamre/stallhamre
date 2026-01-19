import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'owner',
  title: 'Eier',
  type: 'document',

  fields: [
    // ----------------
    // Grunninfo
    // ----------------
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'invoiceRecipient',
      title: 'Fakturamottaker',
      type: 'string',
      description:
        'Hvis fakturamottaker er annen enn eiernavn. Hvis tom brukes eier.',
    }),

    defineField({
      name: 'ownerType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Privat', value: 'privat' },
          { title: 'Firma', value: 'firma' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'privat',
    }),

    // ----------------
    // Kontaktinfo
    // ----------------
    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
    }),

    defineField({
      name: 'phoneCountryCode',
      title: 'Landkode',
      type: 'string',
      options: {
        list: [
          { title: '+47 (Norge)', value: '+47' },
          { title: '+46 (Sverige)', value: '+46' },
          { title: '+45 (Danmark)', value: '+45' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: '+47',
    }),

    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      description: 'Kun nummer, uten landkode',
    }),

    // ----------------
    // Adresse
    // ----------------
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
      name: 'postalPlace',
      title: 'Poststed',
      type: 'string',
    }),

    defineField({
      name: 'country',
      title: 'Land',
      type: 'string',
      options: {
        list: [
          { title: 'Norge', value: 'Norge' },
          { title: 'Sverige', value: 'Sverige' },
          { title: 'Danmark', value: 'Danmark' },
          { title: 'Frankrike', value: 'Frankrike' },
          { title: 'Andre', value: 'Andre' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'Norge',
    }),

    // ----------------
    // Hester (valgfritt)
    // ----------------
    defineField({
      name: 'horses',
      title: 'Eide hester',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'horse' }] }],
      description: 'Valgfritt. Hester kan også velge eier fra horse.ts',
    }),

    // ----------------
    // Notater
    // ----------------
    defineField({
      name: 'notes',
      title: 'Notater',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      invoiceRecipient: 'invoiceRecipient',
      ownerType: 'ownerType',
    },
    prepare({ title, invoiceRecipient, ownerType }) {
      const recipient = invoiceRecipient
        ? `Faktura: ${invoiceRecipient}`
        : 'Faktura = eier'

      const typeLabel = ownerType === 'firma' ? 'Firma' : 'Privat'

      return {
        title,
        subtitle: `${typeLabel} • ${recipient}`,
      }
    },
  },
})
