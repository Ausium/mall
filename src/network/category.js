import { request } from "./request";

export  function getCategory() {
  return request({
    url: '/category'
  })
}

export async function getSubCategory(maitKey) {
  const res = await request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
  return res
}

export async function getSubCategoryDetail(miniWallkey, type) {
  const res = await request({
    url: "/subcategory/detail",
    params: {
      miniWallkey,
      type
    }
  })
  return res
}
