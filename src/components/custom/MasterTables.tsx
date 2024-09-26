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
  

const Tables: React.FC<TableTypes> = ({ firstName, lastName, phoneNumber }) => {
  return (
    <Table className='bg-gray-100 '>
      <TableCaption>
        <div className='flex justify-between items-center'>
          <Button>Previous</Button>
            
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
          <TableCell className="w-[300px] border border-black"><Button className='bg-red-600'>Delete</Button><Button className='bg-blue-600 ml-3'>Info</Button></TableCell>
        </TableRow>
      </TableBody>
    </Table>

  )
}

export default Tables

