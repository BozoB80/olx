export default {
  name: 'categoryList',
  type: 'document',
  title: 'CategoryList',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description'
    },
    {
      name: 'bgcolor',
      type: 'string',
      title: 'Background Color'
    },
  ]
}