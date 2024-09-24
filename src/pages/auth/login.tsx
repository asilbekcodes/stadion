function Login(): JSX.Element {
  return (
    <div>
        <div className='relative flex items-center justify-center top-24 container mx-auto '>
             <div className='w-[500px] h-[360px] border shadow-xl border-gray-300 border-solid rounded-xl px-20'>
                <div className='py-5 space-y-2'>
                     <h1 className="text-xl font-bold">Login</h1>
                     <p className="text-[12px] text-gray-600 font-medium">Login to website if you can beacuse we don't have a login flow yet</p>
                 </div>
                   <div className='flex flex-col gap-3'>
                     <div>
                         <label htmlFor="small-input" className="block mb-2 text-[12px] font-semibold text-gray-900 ">Phone Number</label>
                         <input placeholder='Enter Phone Number' type="text" id="small-input" className="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-white text-xs focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-700 " />
                     </div>
                     <div>
                         <label htmlFor="smallinput" className="block mb-2 text-[12px] font-semibold text-gray-900">Password</label>
                         <input placeholder='Enter Password' type="password" id="smallinput" className="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-white text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-700  " />
                     </div>
                     <button type="reset"  className='bg-gradient-to-br from-black to-gray-600 btn w-[350px] rounded-lg text-white py-2 border'>Sign in</button>
                     <div className='flex justify-between '>
                     </div>
                 </div>
             </div>
         </div>
    </div>
  )
}

export default Login
