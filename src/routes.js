// @flow

export const getMagazineListPath = (page:string, category:string) => {
  if(!page && !category) return '/magazin'
  if(!category) return `/magazin/page/${page+1}`
  if(!page) return `/magazin/${category.toLowerCase()}`
  return `/magazin/${category.toLowerCase()}/page/${page+1}`
}