
function Login() {
  return (
    <div>
        <div className='relative flex items-center justify-center top-24 container mx-auto '>
             <div className='w-[500px] h-[420px] border border-black border-solid rounded-xl px-20'>
                <div className='flex justify-center items-center py-5'>
                     <h1 className='text-3xl text-black'>Login</h1>
                 </div>
                   <div className='flex flex-col gap-3'>
                     <div>
                         <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 ">User Name</label>
                         <input placeholder='Enter User Name' type="text" id="small-input" className="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-white text-xs focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-700  " />
                     </div>
                     <div>
                         <label htmlFor="smallinput" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                         <input placeholder='Enter Password' type="text" id="smallinput" className="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-white text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-700  " />
                     </div>
                     <button type="reset"  className='btn w-[350px] rounded-3xl text-white bg-black py-3 border'>Sign in</button>
                     <div className='flex justify-between '>
                         <button className='px-5 py-2 border rounded-full text-black'>Create account</button>
                         <button className='underline text-blue-900 hover:text-blue-600'>Forgot password?</button>
                     </div>
                 </div>
             </div>
         </div>
    </div>
  )
}

export default Login
