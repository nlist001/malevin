import { DataTable } from "@/components/app/data-table";
import { IRegister, Register } from "@/models/register.model";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import tableColumns from "./table-columns";
import AddRegisterBtn from "./add-register-btn";

export default async function RegisterPage() {
  const data = await axios.get<{data:IRegister[]}>(process.env.NEXT_PUBLIC_API_SSR + '/register').then(({data})=>{
    return data.data.map(el=>(new Register(el)).toPlainObject())
  });

  const columns: ColumnDef<IRegister>[] = tableColumns;

  return (
   <div className="p-6">
    <header className="pb-6">
      <AddRegisterBtn></AddRegisterBtn>
    </header>
    <DataTable columns={columns} data={data}></DataTable>
   </div>
  );
}
