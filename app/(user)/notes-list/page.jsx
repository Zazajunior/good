"use client";
import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"
import { db } from '@/lib/firebase';
import { useSession } from 'next-auth/react';
import { FaTrash } from "react-icons/fa6";
import { useToast } from '@/components/ui/use-toast';

const page = () => {
    const { data: session, status } = useSession();
    const [notes, setNotes] = useState([]);
    // const notes = []

    const { toast } = useToast();

    const fetchNotes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "notes"))
            const notesArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            setNotes(notesArray)
        } catch (error) {
            console.error(error)
            alert("Error fetching note. Visit console for more information.")
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    // delete function
    const handleDelete = async (noteId) => {
        try {
            // delete note from your database
            await deleteDoc(doc(db, "notes", noteId))

            // remove the deleted note from the screen
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            toast({
                description: "Your note has been deleted.",
            })
        } catch (error) {
            alert("Error deleting note, check console for more information")
            console.error("Error: ", error);
        }
    }

    return (
        <main className='min-h-dvh lg:px-10 px-3'>
            <div>
                <h1 className='text-center font-semibold lg:text-4xl text-2xl uppercase text-gray-800 lg:py-8 py-3'>notes list</h1>

                {
                    notes.length === 0 ? <p className='text-center font-semibold text-lg'>No notes</p> : (
                        <div className='flex flex-col gap-5 lg:px-10 px-4 bg-gray-50 rounded-md py-4'>
                            {
                                notes.map(note,i =>(
                                    <div key={ i} className=' bg-gray-50 p-5 rounded-md hover:bg-gray-100 hover:cursor-pointer'>
                                        <h2 className='font-bold text-lg uppercase text-center lg:mb-5 mb-4'>{note.title}</h2>
                                        {console.log(note.title)}
                                        <div className=' w-full relative'>
                                            <p className='p-2'>
                                                {note.body}
                                            </p>

                                            <span className='text-sm'>
                                                Author: <span className='font-semibold'>{note.author}</span>
                                            </span>

                                            <button
                                                onClick={() => handleDelete(note.id)}
                                            >
                                                <FaTrash className='text-xl hover:text-red-600 absolute right-0 bottom-0' />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </main>
    )
}

export default page