import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Stallhamre',

  projectId: 'w7wun21q',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})