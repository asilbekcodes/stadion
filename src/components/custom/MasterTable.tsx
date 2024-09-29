import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/modal"
import { Button } from "../ui/button"
import { QueryClient, useMutation, useQuery} from "@tanstack/react-query"
import { getMasters } from "@/helpers/interface/types"
import axios, { AxiosError } from "axios"
import { swaggerUrl } from "@/helpers/api/swagger-url"
import { config } from "@/helpers/token/token"
import { useState } from "react"
import { toast } from "react-toastify"

const queryMaster = new QueryClient()
function MasterTable() {
    const getMasters = useQuery<getMasters>({
        queryKey: ['masters'],
        queryFn: async () => {
            const response = await axios.get(`${swaggerUrl}api/v1/user/masters/list?page=0&size=10`, config)
            return response.data.data.object
        },
    })

    // if (getMasters.isLoading) {
    //     return <div>Loading...</div>
    // }

    // if (getMasters.isError) {
    //     return <div>Error</div>
    // }

    const [selectedID, setSelectedID] = useState<string>('')

    const deleteMasters = useMutation({
        mutationKey: ['deleteMasters', selectedID],
        mutationFn: async () => {
            const response = await axios.delete(`${swaggerUrl}api/v1/user/${selectedID}`, config)
            return response.data
        },
        onSuccess: () => {
            queryMaster.invalidateQueries({ queryKey: ['masters'] })
        },
        onError: (error: AxiosError) => {
            toast.error('Something went wrong!' + error.message)
        }
    })
  return (
    <div className="w-full p-5 bg-gray-100">
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
          {Array.isArray(getMasters.data) ? getMasters.data.map((item: getMasters | any) => (
            <tr>
              <td className="w-1/6 border-2 border-black p-2">{item.firstName}</td>
              <td className="w-1/6 border-2 border-black p-2">{item.lastName}</td>
              <td className="w-1/6 border-2 border-black p-2">{item.phoneNumber}</td>
              <td className="flex justify-center py-2">
              <Dialog>
                <DialogTrigger><Button onClick={() => setSelectedID(item.id)} className='bg-red-600 mr-3'>Delete</Button></DialogTrigger>
                <DialogContent className='w-[400px] '>
                  <DialogHeader>
                    <DialogTitle className='text-center py-5 text-xl'>Do you delete this master?</DialogTitle>
                    <DialogDescription className='flex justify-end pt-10'>
                      <DialogClose>
                        <Button className='bg-red-600 w-[100px] mr-2'>No</Button>
                      </DialogClose>
                      <Button onClick={() => deleteMasters.mutate()}  className='bg-green-600 w-[100px]'>Yes</Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger><Button onClick={() => setSelectedID(item.id)} className='bg-blue-600'>info</Button></DialogTrigger>
                <DialogContent className='w-[400px] '>
                  <DialogHeader>
                    <DialogTitle className='text-center py-5 text-xl'>{item.firstName}</DialogTitle>
                    <DialogTitle className='text-center py-5 text-xl'>{item.lastName}</DialogTitle>
                    <DialogTitle className='text-center py-5 text-xl'>{item.phoneNumber}</DialogTitle>
                    <DialogDescription className='flex justify-end pt-10'>
                      <DialogClose>
                        <Button className='bg-red-600 w-[100px] mr-2'>No</Button>
                      </DialogClose>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              </td>
            </tr>
          )) : <tr className="border-2 border-black text-center pl-10">No confirmed masters</tr>}
        </tbody>
      </table>
    </div>
  )
}

export default MasterTable
