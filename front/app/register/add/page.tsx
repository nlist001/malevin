"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
import * as z from "zod"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios"
import { IJob, IRegister } from "@/models/register.model"
import Link from "next/link"
import { IUser } from "@/models/user.model"
import { DataTable } from "@/components/app/data-table"
import columns from "./table-columns"
import AppSelect from "@/components/app/app-select"


const formSchema = z.object({
    job_date: z.date(),
    usersIds: z.array(z.string()),
    jobId: z.string()
})

export default  function RegisterAddPage() {

  const [date, setDate] = React.useState<Date>(new Date())
  const [jobs, setJobs] = React.useState<IJob[]>([])
  const [users, setUsers] = React.useState<IUser[]>([])
  const [rowSelection, setRowSelection] = React.useState({})

  React.useEffect(()=>{
    axios.get<IJob[]>(process.env.NEXT_PUBLIC_API_URL + '/jobs').then(({data})=>{
      setJobs(data)
    })
    
  },[])



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_date: new Date(),
      jobId: "",
      usersIds: [],
    },
  });

  const jobIdValue = useWatch({
    control: form?.control, // Безопасный доступ, если form бывает undefined
    name: "jobId",
  });

  React.useEffect(() => {
    if (!form) return; 
  
    if( jobIdValue) {
      axios.post<IJob[]>(process.env.NEXT_PUBLIC_API_URL + '/jobs',{ids:[jobIdValue]}).then(({data})=>{
        setUsers(data[0]?.users || [])
      })
    }
  
  }, [jobIdValue, form]);



  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
    const payload = {...data, job_date: date.toISOString()}
    axios.post<IRegister>(process.env.NEXT_PUBLIC_API_URL + '/register',payload);
  }


  return (<div className="p-6">
  
    <p className="p-6"><Link href='/register'>&laquo; Журнал</Link></p>

    <Card className="w-full">
      <CardHeader>
        <CardTitle>Добавить работу в план</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="job_date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Дата работы
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!date}
                        className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        required={true}
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                      />
                    </PopoverContent>
                  </Popover>
            
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="jobId"
              control={form.control}
              render={({ field, fieldState }) => (

                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Вид работ
                  </FieldLabel>
 
                  <AppSelect {...field} {...fieldState} items={jobs}></AppSelect>
     
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="usersIds"
              control={form.control}
              render={({ field, fieldState }) => {

                const handleRowSelectionChange = (updater: any) => {
                  const nextState = typeof updater === 'function' ? updater(rowSelection) : updater;
                  setRowSelection(nextState); 
                  field.onChange(Object.keys(nextState).map((i:any)=>users[i].id)); 
                };

                return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Исполнитель
                  </FieldLabel>
                  <DataTable columns={columns} data={users}  rowSelection={rowSelection} setRowSelection={handleRowSelectionChange}></DataTable>
          
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}}
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
