import {request} from './request'

// 左侧分类title
export function getCatetory() {
  return request({
    url: "/category"
  })
}

// 右侧上部分数据
export function getSubcategory(maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey
    }
  })
}

// 右侧下部分数据
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: "/subcategory/detail",
    params: {
      miniWallkey,
      type
    }
  })
}