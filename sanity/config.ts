import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Finn Valley AC',

  projectId: 't79osmcf',
  dataset: 'production',

  basePath: '/studio',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  auth: {
    // Force authentication - no anonymous access
    mode: 'replace',
    providers: [{
      name: 'sanity',
      title: 'Email/Password',
      url: 'https://api.sanity.io/v2021-10-01/auth/login/sanity'
    }]
  }
})