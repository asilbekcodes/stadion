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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/modal"

  

const Tables: React.FC<TableTypes> = ({ firstName, lastName, phoneNumber, btn, btn2 }) => {
  // const modal = () => {
  //   // return(
  //     <DropdownMenu>
  //       <DropdownMenuTrigger></DropdownMenuTrigger>
  //         <DropdownMenuContent>
  //           <DropdownMenuLabel>My Account</DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>Profile</DropdownMenuItem>
  //           <DropdownMenuItem>Log Out</DropdownMenuItem>
  //         </DropdownMenuContent>
  //     </DropdownMenu>
  //   // )
  // }
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
        <TableRow>
          <TableCell className="w-[300px] border border-black">{firstName}</TableCell>
          <TableCell className="w-[300px] border border-black">{lastName}</TableCell>
          <TableCell className="w-[300px] border border-black">{phoneNumber}</TableCell>
          <TableCell className="w-[300px] border border-black">
            <Dialog>
              <DialogTrigger><Button className='bg-green-600 mr-3'>{btn}</Button></DialogTrigger>
              <DialogContent className='w-[400px] '>
                <DialogHeader>
                  <DialogTitle className='text-center py-5 text-xl'>Do you confirm this master?</DialogTitle>
                  <DialogDescription className='flex justify-end pt-10'>
                    <Button className='bg-red-600 w-[100px] mr-2'>No</Button>
                    <Button className='bg-green-600 w-[100px]'>Yes</Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger><Button className='bg-red-600'>{btn2}</Button></DialogTrigger>
              <DialogContent className='w-[400px] '>
                <DialogHeader>
                  <DialogTitle className='text-center py-5 text-xl'>Do you reject this master?</DialogTitle>
                  <DialogDescription className='flex justify-end pt-10'>
                    <Button className='bg-red-600 w-[100px] mr-2'>No</Button>
                    <Button className='bg-green-600 w-[100px]'>Yes</Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

  )
}

export default Tables