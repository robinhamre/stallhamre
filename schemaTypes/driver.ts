// schemaTypes/driver.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'driver',
  title: 'Kusk',
  type: 'document',

  fields: [
    // ----------------
    // Grunninfo
    // ----------------
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'birthYear',
      title: 'Fødselsår',
      type: 'number',
      description: 'Brukes til å beregne alder automatisk',
    }),

    defineField({
      name: 'license',
      title: 'Lisens',
      type: 'string',
      description: 'F.eks. A-lisens, B-lisens, amatør, proff',
    }),

    defineField({
      name: 'silks',
      title: 'Drakt',
      type: 'string',
      description: 'Beskrivelse av kuskens drakt',
    }),

    defineField({
      name: 'homeTrack',
      title: 'Hjemmebane',
      type: 'reference',
      to: [{type: 'track'}],
      description: 'Velg hjemmebane fra travbaneregisteret',
    }),

    // ----------------
    // Media
    // ----------------
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'notes',
      title: 'Notater',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      birthYear: 'birthYear',
      homeTrack: 'homeTrack.name',
      media: 'image',
    },
    prepare({title, birthYear, homeTrack, media}) {
      const year = new Date().getFullYear()
      const age = birthYear ? `${year - birthYear} år` : 'Alder ukjent'
      const track = homeTrack ? ` • ${homeTrack}` : ''
      return {
        title,
        subtitle: `${age}${track}`,
        media,
      }
    },
  },
})
