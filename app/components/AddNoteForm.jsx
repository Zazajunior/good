'use client'
import React, {useState} from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BiLoader } from "react-icons/bi";
import { useToast } from "@/components/ui/use-toast";

const AddNoteForm = () => {

    const [processing, setProcessing] = useState(false)
    const handleSubmit = async(values, {resetForm})=>{
        setProcessing(true)
        // sending notes to the database
        try{
            console.log(values)
            // -create a document to be sent to the database-----------
            const jotter = {
                title: values.title,
                body: values.body,
                createdAt: new Date()
            }
            // adding the document to the database-------------
            const docRef = collection(
                // specifies our database name
                db,
               // our collection name 
                "notes")
            resetForm()
            await addDoc(docRef, jotter)
            toast({
                description: "Your note has been added",
            })
        }catch(error){
            alert('Error adding note')
        }
        finally{
            setProcessing(false)
        }
    }
   
    const initVal = {
        title:"",
        body:""
    }
    
    const {toast} = useToast()

    const formValidation = Yup.object().shape({
        title:Yup.string().required("Your note must have a title").min(4,"At least 4 characters").max(20,"max of 20 characters"),
        body:Yup.string().required("Write a Note").min(5,"At least 5 characters")
        
    })
  return (
    <main className='bg-slate-400 flex items-center justify-center h-dvh p-9'>
        <div className='w-[50rem] h-fit rounded-md bg-gray-100'>
            <h1 className='uppercase text-3xl text-grey-800 font-bold text-center p-7 lg:p-7 lg:4xl'>Add Note</h1>

            {/* formimk was used to add the form component into the react file */}
            
            <Formik initialValues={initVal} onSubmit={handleSubmit} validationSchema={formValidation}>
                <Form className='p-4 flex flex-col gap-4 justify-center items-center'>
                    <Field type="text" name= "title" placeholder="title" className='w-full outline-none border-none h-10 text-lg rounded-lg p-5'/>
                    <ErrorMessage name="title" componrent={'p'} className='text-red-500 text-sm'/>
                    <Field as="textarea" name= "body" placeholder="Write Note" className='w-full outline-none border-none text-lg rounded-lg p-5 h-32'/>
                    <ErrorMessage name="body" componrent={'p'} className='text-red-500 text-sm'/>
                    <button type="submit" className='uppercase font-bold py-2 px-3 w-[300px] border-blackborder-[1px] text-white bg-blue-950 hover:bg-transparent hover:text-black max-lg:w-full text-center'
                    disabled = {processing}
                    >
                        
                        
                        {
                        processing ? <BiLoader className='text-2xl animate-spin'/> :'ADD NOTE'
                        }
                    </button>
                </Form>
            </Formik>
        </div>
        
    </main>
  )
}

export default AddNoteForm