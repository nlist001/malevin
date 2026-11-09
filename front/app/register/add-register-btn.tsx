'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
 
export default function AddRegisterBtn() {
    const router = useRouter();
    return <>
        <Button  onClick={()=>router.push('/register/add')}>
            Добавить запись
        </Button>
        <Button  onClick={()=>router.push('/register/addjob')}>
            Добавить тип деятельности
        </Button>
        <Button  onClick={()=>router.push('/register/adduser')}>
            Добавить рабочего
        </Button>
    </>
}