import TabsPage from './TabsPage'

export default function RootLayout({ children }) {

  return (
    <div className='w-full flex flex-col px-1 sm:px-5'>
      <TabsPage />
      
    </div>
  )
}