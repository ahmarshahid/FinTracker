import React from 'react'
import { FormField, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import {Input} from './ui/input'
import { z } from 'zod'
import {Control} from 'react-hook-form'
import {authformSchema} from '@/lib/utils'

interface CustomInput {
    control: Control<z.infer<typeof authformSchema>>,
    name: string,
    Label: string,
    placeholder: string,
    type: string
}




const CustomInput = ({control, name, Label, placeholder, type}: CustomInput) => {
return (
    <FormField
            control={control}
            name= {name}
            render={({ field }) => (
                <div className='form-item'>
                   <FormLabel className='form-label'>
                    {Label}
                    </FormLabel> 
                    <div className= "flex w-full flex-col">
                      <FormControl>
                        <Input
                         placeholder= {placeholder}
                         className = "input-class"
                       type= {type}
                         {...field}
                        />
                      </FormControl>
                      <FormMessage
                      className='form-message mt-2' />
                    </div>
                </div>
            )}
            />
  )
}

export default CustomInput