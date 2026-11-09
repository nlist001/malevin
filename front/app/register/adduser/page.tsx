"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import axios from "axios"
import { IJob, IRegister, IRegisterResponce } from "@/models/register.model"
import Link from "next/link"
import AppCombobox from "@/components/app/app-combobox"
import { IUser } from "@/models/user.model"
import AppSelect from "@/components/app/app-select"

const formSchema = z.object({
  fio: z.string()
  .min(3, "Description must be at least 3 characters.")
  .max(200, "Description must be at most 200 characters."),
  jobs: z.array(z.object({id: z.string(), title: z.string()})),
  registerId: z.string().nullable()
})


export default  function UseerAddPage() {
  const [jobs,setJobs] = React.useState<IJob[]>([])
  const [registers,setRegisters] = React.useState<IRegister[]>([])

  React.useEffect(()=>{
    axios.get<IJob[]>(process.env.NEXT_PUBLIC_API_URL + '/jobs').then(({data})=>{
      setJobs(data)
    })
    axios.get<IRegisterResponce>(process.env.NEXT_PUBLIC_API_URL + '/register').then(({data})=>{
      setRegisters(data.data)
    })
  },[])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fio: "",
      jobs:[],
      registerId: null
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {

    axios.post<IUser>(process.env.NEXT_PUBLIC_API_URL + '/user',{
    fio:data.fio, jobsIds: data.jobs.map((job) => job.id), registerId: data.registerId==null ? null : data.registerId
    }).then(({data})=>{
       console.log(data)
     })
  }

  return (<div className="p-6">
  
    <p className="p-6"><Link href='/register'>&laquo; Журнал</Link></p>

    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Добавить работника</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="fio"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    ФИО
                  </FieldLabel>
                  <Input  {...field} type="text"  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="jobs"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Виды работ
                  </FieldLabel>
                  <AppCombobox  {...field} items={jobs} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> 
            <Controller
              name="registerId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Добавить к текущей работе в журнеле
                  </FieldLabel>
                  <AppSelect  {...field} {...fieldState} items={registers} title="job_date" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> 


          </FieldGroup>

        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
            <Button type="button" form="form-rhf-demo" onClick={()=>form.reset()}>
                Очистить
            </Button>
            <Button type="submit" form="form-rhf-demo">
                Добавить
            </Button>
        </Field>
      </CardFooter>
    </Card>
  </div>)
}
