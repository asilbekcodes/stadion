import { Table } from 'lucide-react'
import React from 'react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { ClientTypes } from '@/helpers/interface/types'

const ClientTables: React.FC<ClientTypes> = ({firstName, lastName, order, phoneNumber }) => {
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
                <TableHead className="w-[300px] border border-black">Order Count</TableHead>
                <TableHead className="w-[300px] border border-black">Phone Number</TableHead>
                <TableHead className=" w-[300px] border border-black">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell className="w-[300px] border border-black">{firstName}</TableCell>
                <TableCell className="w-[300px] border border-black">{lastName}</TableCell>
                <TableCell className="w-[300px] border border-black">{order}</TableCell>
                <TableCell className="w-[300px] border border-black">{phoneNumber}</TableCell>
                <TableCell className="w-[300px] border border-black"><Button className='bg-red-600'>Delete</Button></TableCell>
            </TableRow>
        </TableBody>
    </Table>

    )
}

    export default ClientTables