import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '../ui/button'
import { TableTypes } from '@/helpers/interface/types'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/modal"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { swaggerUrl } from '@/helpers/api/swagger-url'
import { config } from '@/helpers/token/token'

  

const Tables: React.FC<TableTypes> = ({ firstName, lastName, phoneNumber, btn, btn2 }) => {
  const fetchMasters = async () => {
    const response = await axios.get(`${swaggerUrl}api/v1/user/rejected/list`, config); // Ma'lumotlarni olish
    return response.data; // Ma'lumotlarni qaytarish
  }

  const { data } = useQuery({
    queryKey: ['masters'],
    queryFn: fetchMasters,
  });
  return (
    <Table className='bg-gray-100 '>
      <TableCaption>
        <div className='flex justify-between items-center'>
          <Button>Previous</Button>
            <p className='mt-2'>1/1</p>
          <Button>Next</Button>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px] border border-black">First Name</TableHead>
          <TableHead className="w-[300px] border border-black">Last Name</TableHead>
          <TableHead className="w-[300px] border border-black">Phone Number</TableHead>
          <TableHead className=" w-[300px] border border-black">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.map((master: any) => (
          <TableRow key={master.id}>
          {/* <TableRow> */}
            <TableCell className="w-[300px] border border-black">ccc</TableCell>
            <TableCell className="w-[300px] border border-black">vvvv</TableCell>
            <TableCell className="w-[300px] border border-black">bbbbb</TableCell>
            <TableCell className="w-[300px] border border-black">
              <Dialog>
                <DialogTrigger><Button className='bg-red-600 mr-3'>nnnnn</Button></DialogTrigger>
                <DialogContent className='w-[400px] '>
                  <DialogHeader>
                    <DialogTitle className='text-center py-5 text-xl'>Do you delete this master?</DialogTitle>
                    <DialogDescription className='flex justify-end pt-10'>
                      <DialogClose>
                        <Button className='bg-red-600 w-[100px] mr-2'>No</Button>
                      </DialogClose>
                      <Button className='bg-green-600 w-[100px]'>Yes</Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger><Button className='bg-blue-600'>{btn2}</Button></DialogTrigger>
                <DialogContent className='w-[400px] '>
                  <DialogHeader>
                    <DialogTitle className='text-center py-5 text-xl'>Do you info this master?</DialogTitle>
                    <DialogDescription className='flex justify-end pt-10'>
                      <DialogClose>
                        <Button className='bg-red-600 w-[100px] mr-2'>No</Button>
                      </DialogClose>
                      <Button className='bg-green-600 w-[100px]'>Yes</Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  )
}

export default Tables