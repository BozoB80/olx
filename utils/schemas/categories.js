export default {
  name: 'categories',
  type: 'document',
  title: 'Categories',
  fields: [
    {
      name: 'imageUrl',
      type: 'url',
      title: 'Image URL'
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