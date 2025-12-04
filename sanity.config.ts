export default defineConfig({
  name: 'default',
  title: 'Stallhamre',

  projectId: 'w7wzn21q',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
