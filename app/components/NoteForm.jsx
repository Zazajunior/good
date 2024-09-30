"use client"
import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useToast } from '@/components/ui/use-toast';
import { RiLoader2Fill } from "react-icons/ri";
import { useSession } from 'next-auth/react'

const NoteForm = () => {
    const [processing, setProcessing] = useState(false);
    const {data:session, status} = useSession()

    const { toast } = useToast();

    const initVal = {
        title: '',
        body: ''
    }

    const formValidation = Yup.object().shape({
        title: Yup.string().required('Please enter a note title'),
        body: Yup.string().required('Please enter a note')
    })

    const handleSubmit = async (values, { resetForm }) => {
        try {
            console.log(values);
            setProcessing(true)

            // create a document to be stored
            const jotter = {
                title: values.title,
                body: values.body,
                createdAt: new Date(),
                author: session?.user?.name
            }
            console.log(jotter)


            // add the document to the database
            const docRef = collection(db, "notes")
            await addDoc(docRef, jotter)

            toast({
                description: "Your note has been added.",
            })

            resetForm()
        } catch (error) {
            console.error("Error adding note: ", error)
            alert("Error adding note. Check console for more information")
        }
        finally{
            setProcessing(false)
        }
    }

    return (
        <main className='min-h-dvh p-3'>
            <Formik
                initialValues={initVal}
                validationSchema={formValidation}
                onSubmit={handleSubmit}
            >
                <Form className='rounded-md shadow-md lg:w-1/2 w-full bg-gray-100 mx-auto lg:mt-10'>
                    <h1 className='lg:text-4xl text-2xl font-bold text-gray-800 lg:py-10 text-center'>Add Note</h1>
                    <div className='w-full lg:p-10 p-2 flex flex-col gap-10'>
                        <div className='w-full flex flex-col'>
                            <Field
                                name='title'
                                placeholder='Note Title'
                                className="w-full border-none outline-none rounded-md px-3 py-2 text-lg h-12"
                            />
                            <ErrorMessage
                                name='title'
                                component={'p'}
                                className='text-red-500 text-sm'
                            />
                        </div>
                        <div className='w-full flex flex-col h-12'>
                            <Field
                                as="textarea"
                                cols="50"
                                rows="100"
                                name='body'
                                placeholder='Enter a note...'
                                className="w-full border-none outline-none rounded-md px-3 py-2  text-lg"
                            />
                            <ErrorMessage
                                name='body'
                                component={'p'}
                                className='text-red-500 text-sm'
                            />
                        </div>
                        <button
                            disabled={processing}
                            type='submit'
                            className='p-3 rounded-md bg-gray-800 text-white hover:text-gray-800 hover:bg-white transition-all border border-gray-800 text-lg font-semibold uppercase w-full mx-auto'
                        >
                            {processing ? <RiLoader2Fill className='animate-spin text-2xl text-center mx-auto'/> : "add note"}
                        </button>
                    </div>
                </Form>
            </Formik>
        </main>
    )
}

export default NoteForm