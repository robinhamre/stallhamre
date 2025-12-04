// schemaTypes/index.ts
import {type SchemaTypeDefinition} from 'sanity'
import post from './post'
import category from './category'
import yearStats from './yearStats'
import yearStatsHistoric from './yearStatsHistoric'
import winStats from './winStats'
import staff from './staff'
import tipsCategory from './tipsCategory'
import tips from './tips'
import horse from './horse'
import shareOffer from './shareOffer'
import imageLibrary from './imageLibrary'

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  category,
  yearStats,
  yearStatsHistoric,
  winStats,
  staff,
  tipsCategory,
  tips,
  horse,
  shareOffer,
  imageLibrary,
]
