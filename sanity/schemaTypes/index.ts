import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { idea } from './idea'
import { playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, idea, playlist],
}
