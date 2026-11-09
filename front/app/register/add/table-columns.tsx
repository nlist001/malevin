'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IRegister } from "@/models/register.model";
import { IUser } from "@/models/user.model";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";


const columns: ColumnDef<IUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),

  },
  {
    accessorKey: 'fio',
    header: 'ФИО'
  },
  {
    accessorKey: 'jobs',
    header: 'Навыки',
    cell: ({ row }:{row: Row<IUser>}) => (<>{row.original.jobs?.map(el=><p key={el.id}>{el.title}</p>)}</>)
  },
  {
    accessorKey: 'register',
    header: 'зарезервирован на',
    cell: ({ row }:{row: Row<IUser>}) => (<>{row.original.register ? (<p>{row.original.register?.job_date}</p>):"Свободен"}</>)
  }
]

  export default columns;