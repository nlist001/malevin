"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
import { IJob } from "@/models/register.model"
import Link from "next/link"
import { DataTable } from "@/components/app/data-table"
import { Trash2Icon } from "lucide-react"



const formSchema = z.object({
  title: z.string()
  .min(3, "Description must be at least 3 characters.")
  .max(200, "Description must be at most 200 characters."),
})

export default  function JobAddPage() {
  console.log('JobAddPage render')
  const [jobs, setJobs] = React.useState<IJob[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  React.useEffect(()=>{
      axios.get(process.env.NEXT_PUBLIC_API_URL + '/jobs').then(({data})=>{
        setJobs(data)
      })
  },[])

  function delJob(job: IJob) {
    axios.delete<IJob>(process.env.NEXT_PUBLIC_API_URL + '/job/'+job.id).then(({data})=>{
      setJobs((prevState)=> [...prevState.filter(j=>j.id!==job.id)])
    })
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    axios.post<IJob>(process.env.NEXT_PUBLIC_API_URL + '/job',data).then(({data})=>{
      setJobs((prevState)=> [...prevState, data])
    })
  }

  return (<div className="p-6">
  
    <p className="p-6"><Link href='/register'>&laquo; Журнал</Link></p>
    <div className="flex  gap-5">
      
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Добавить вид работы</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
          
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      Назавание деятельности
                    </FieldLabel>
                    <Input  {...field} type="text"  />
      
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
      <div className="flex-1 gap-2  sm:max-w-md">
        <h2>Существующий список работ</h2>
       {jobs && jobs.map(job=> (<dl className="flex items-center justify-between mb-1" key={job.id}>
          <dt>{job.title}</dt>
          <dd className="text-muted-foreground"><Button  variant="outline" size="icon" onClick={()=>delJob(job)}><Trash2Icon /></Button></dd>
        </dl>
      ))}
 
      </div>
    </div>
  </div>)
}
