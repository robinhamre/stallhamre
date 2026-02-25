// schemaTypes/index.ts

import category from './category'
import horse from './horse'
import driver from './driver'
import track from './track'
import imageLibrary from './imageLibrary'
import post from './post'
import tips from './tips'
import tipsCategory from './tipsCategory'
import staff from './staff'
import shareOffer from './shareOffer'
import shareManager from './shareManager'
import result from './result'
import resultCategory from './resultCategory'
import reportage from './reportage'
import reportageCategory from './reportageCategory'
import winStats from './winStats'
import yearStats from './yearStatsHistoric'
import yearStatsHistoric from './yearStatsHistoric'
import owner from './owner'
import supplier from './supplier'   // ← DENNE MANGLET
import invoice from './invoice'

export const schemaTypes = [
  category,
  horse,
  driver,
  track,
  imageLibrary,
  post,
  tips,
  tipsCategory,
  staff,
  shareOffer,
  shareManager,
  result,
  resultCategory,
  reportage,
  reportageCategory,
  winStats,
  yearStats,
  yearStatsHistoric,
  owner,
  supplier,   // ← DENNE MANGLET
  invoice,
]