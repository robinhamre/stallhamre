// schemaTypes/index.ts

import category from './category'
import horse from './horse'
import driver from './driver'
import owner from './owner'          // ✅ NY
import track from './track'
import imageLibrary from './imageLibrary'
import post from './post'
import tips from './tips'
import tipsCategory from './tipsCategory'
import staff from './staff'
import shareOffer from './shareOffer'
import result from './result'        // ✅ oppdatert result.ts
import resultCategory from './resultCategory'
import reportage from './reportage'
import reportageCategory from './reportageCategory'
import winStats from './winStats'
import yearStats from './yearStats'
import yearStatsHistoric from './yearStatsHistoric'

export const schemaTypes = [
  category,
  horse,
  driver,
  owner,            // ✅ VIKTIG: må ligge her
  track,
  imageLibrary,
  post,
  tips,
  tipsCategory,
  staff,
  shareOffer,
  result,
  resultCategory,
  reportage,
  reportageCategory,
  winStats,
  yearStats,
  yearStatsHistoric,
]
