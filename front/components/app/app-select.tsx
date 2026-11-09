import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue
  } from "@/components/ui/select"

export default  function AppSelect<T extends {id: string,[key:string]:any}>({
  items, title='title',
  ...props
}: {items: T[], title?: string, invalid?: boolean}
) {
    return (
 
        <Select
        {...props}
        // @ts-expect-error
        onValueChange={props?.onChange}
        >
        <SelectTrigger
            id="form-rhf-select-language"
            aria-invalid={props?.invalid || false}
            className="min-w-[120px]"
        >
            <SelectValue placeholder="Выберите" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
            <SelectItem value="null">Выберите</SelectItem>
            <SelectSeparator />
            {items?.map((item) => (
            <SelectItem key={item.id} value={item.id}>
                {item[title]}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
     )
}