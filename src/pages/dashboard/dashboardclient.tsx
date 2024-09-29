import { swaggerUrl } from '@/helpers/api/swagger-url';
import { ClientResponse, ClientType } from '@/helpers/interface/types';
import { config } from '@/helpers/token/token';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { error } from 'console';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
const queryClient = new QueryClient()

const dashboardclient: React.FC = () => {
  const [selected, setSelected] = useState<string>('')
  const [deleted, setDeleted] = useState<boolean>(false)

  function openDelete() {
    setDeleted(!deleted);
  }

  const getClients = useQuery<ClientResponse>({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await axios.get(`${swaggerUrl}api/v1/user/clients/for-admin/list?page=0&size=10`, config);
      return response.data
    }
  })

  const deleteClients = useMutation({
    mutationKey: ['deleteClients', selected],
    mutationFn: async () => {
      const response = await axios.delete(`${swaggerUrl}api/v1/user/client/${selected}`, config);
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      setDeleted(false)
    },
    onError: (error) => {
      toast.error('Something went wrong!' + error.message)
    }
  })

  const clients: ClientType | undefined = getClients.data?.data?.object;

  if (getClients.isLoading) {
    return (
      <span className="sr-only">Loading...</span>
    )
  }

  if (getClients.error) {
    return toast.error(getClients.error.message)
  }

  return (
    <div className="w-full h-[27rem] border p-5 bg-gray-50">
      <table className="w-full border-2 border-black">
        <thead>
          <tr className="border-2 border-black">
            <th className="w-1/6 border-r-2 border-black p-2">First Name</th>
            <th className="w-1/6 border-r-2 border-black p-2">Last Name</th>
            <th className="w-1/6 border-r-2 border-black p-2">Phone Number</th>
            <th className="w-1/6 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(clients) ? clients.map((item: ClientType | any) => (
            <tr key={item.id}>
              <td className="w-1/6 border-2 border-black p-2">{item.firstName}</td>
              <td className="w-1/6 border-2 border-black p-2">{item.lastName}</td>
              <td className="w-1/6 border-2 border-black p-2">{item.phoneNumber}</td>
              <td className="border-2 border-black flex justify-around py-2">
                <button onClick={() => (setSelected(item.id), openDelete())} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>

              </td>
            </tr>
          )) : <tr className="border-2 border-black text-center pl-10">No confirmed masters</tr>}
        </tbody>
      </table>

      {deleted &&
        <div id="popup-modal" className="flex backdrop-blur-md bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full">
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button onClick={openDelete} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="pt-5">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-center text-xl font-bold text-gray-500 dark:text-gray-400">Are you sure you want to delete this item?</h3>
                <div className="bg-gray-50 flex justify-end p-3 rounded-b-md w-full">
                  <button onClick={openDelete} data-modal-hide="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    No
                  </button>
                  <button onClick={() => deleteClients.mutate()} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-red-600 rounded-lg border border-red-200 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-700 dark:bg-red-800 dark:text-red-400 dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default dashboardclient