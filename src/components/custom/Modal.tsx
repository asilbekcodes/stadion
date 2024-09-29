import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/modal"
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'


const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleEsc)

        return () => {
            window.removeEventListener('keydown', handleEsc)
        }

    }, [onclose])
    return (
        <div>
            {/* <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    backgroundColor: 'white',
                    border: '1px solid #000',
                    zIndex: 1000,
                }}
            >
                <h2>Modal Window</h2>
                <p>Press Esc to close this modal</p>
                <button onClick={onClose}>Close Modal</button>
            </div> */}
        </div>
    )
}



const ModalApp: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div className=''>
            {/* <button onClick={openModal}>Open Modal</button> */}

            {showModal && <Modal onClose={closeModal} />}

            {/* Add a background overlay when the modal is open */}
            {/* <button onClick={openModal} data-modal-target="default-modal" data-modal-toggle="default-modal" className="text-red-400" type="button">
                Log out
            </button> */}


            <Dialog>
                <DialogTrigger onClick={openModal} className='text-[13px] text-start px-2 py-1 w-[115px] hover:bg-gray-100'>Log Out</DialogTrigger>
                {showModal && (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='text-center pt-[30px] text-xl font-bold'>Are you sure log out?</DialogTitle>
                            <DialogDescription className='text-end pt-[80px]'>
                                <DialogClose>
                                    <Button className='bg-red-600 w-[100px] mr-2'>No</Button>
                                </DialogClose>
                                <Button onClick={handleLogout} className='bg-green-600 w-[100px]'>Yes</Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                )}
            </Dialog>

        </div>
    )
}

export default ModalApp