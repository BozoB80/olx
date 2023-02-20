export default {
  name: 'products',
  type: 'document',
  title: 'Products',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      }
    },
    {
      name: 'user',
      title: 'User',
      type: 'reference',      
      to: {type: 'user'}
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],      
      options: {
        hotspot: true
      }
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',      
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price'
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description'
    },
  ]
}