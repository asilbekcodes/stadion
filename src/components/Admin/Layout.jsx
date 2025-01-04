import Sidebar from './Sidebar'
import Navbar from './Navbar'

function Layout({children}) {
  return (
    <div className='flex'>
        <Sidebar />
        <div className='grow ml-0 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white'>
            <Navbar />
            <main>{children}</main>
        </div>
    </div>
  )
}

export default Layout