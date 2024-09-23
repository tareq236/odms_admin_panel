import * as React from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/Select"


export default function ChartMonthSelect() {
  return (
    <Select defaultValue="banana">
      <SelectTrigger className="md:max-w-[180px] sm:grow">
        <SelectValue placeholder="Select a month" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">This month</SelectItem>
          <SelectItem value="banana">Last month</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
