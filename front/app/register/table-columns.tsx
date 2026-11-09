'use client';

import { Button } from "@/components/ui/button";
import { IRegister } from "@/models/register.model";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";



const columns: ColumnDef<IRegister>[] = [
  {
    accessorKey: 'job_date',
    header: ({ column }: any) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата начала
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'users',
    header: 'Испольнители',
    cell: ({ row }:{row: Row<IRegister>}) => (<>{(!row.original.users || row.original.users.length ==0) ?  '-' : row.original.users?.map(user=>user.fio).join(', ')}</>)
  },
  {
    accessorKey: 'job',
    header: 'Тип работы',
    cell: ({ row }:{row: Row<IRegister>}) => (<>{row.original.job.title}</>)

  }
]

  export default columns;