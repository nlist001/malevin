import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "@/components/ui/combobox"
import React from "react";


export default  function AppCombobox<T extends {id: string,[key:string]:any}>({
  items, title='title',
  ...props
}: {items: T[], title?: string}
) {
    const anchor = useComboboxAnchor()
    return (<Combobox
        multiple
        autoHighlight
        items={items}
        {...props}
        // @ts-expect-error
        onValueChange={props?.onChange}
        >
        <ComboboxChips ref={anchor} className="w-full max-w-xs">
            <ComboboxValue >
            {(values) => (
            <React.Fragment>
              {(Array.from(new Set(values.map((z: T) => JSON.stringify(z)))).map((el:any)=>JSON.parse(el))).map((value: T) => (
                <ComboboxChip key={value.id}>{value[title]}</ComboboxChip>
              ))}
              <ComboboxChipsInput  />
            </React.Fragment>
            )}
            </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList >
            {(item) => (
                <ComboboxItem key={item.id} value={item}>
                {item.title}
                </ComboboxItem>
            )}
            </ComboboxList>
        </ComboboxContent>
        </Combobox>);
}