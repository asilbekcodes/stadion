
const Card = ({ icon, title, value}) => {
  return (
    <div className='bg-white text-dark shadow-md flex items-center space-x-6 rounded-lg p-4 dark:bg-gray-800 dark:text-white'>
        <div className='text-3xl text-gray-500 '>{icon}</div>
        <div>
            <h2 className='text-lg font-semibold '>{title}</h2>
            <p className='text-xl '>{value}</p>
        </div>
    </div>
  )
}

export default Card