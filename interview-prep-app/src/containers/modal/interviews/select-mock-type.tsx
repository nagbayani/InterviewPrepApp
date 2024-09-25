import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockTypeList } from "@/lib/mock-type-list";
import ListItem from "@/components/ui/list-item"; // Ensure ListItem is correctly imported

interface SelectMockTypeProps {
  onDescriptionChange: (description: string) => void;
  onTypeChange: (type: string) => void;
  value: string;
}

const SelectMockType = ({
  onTypeChange,
  onDescriptionChange,
  value,
}: SelectMockTypeProps) => {
  const handleSelect = (value: string) => {
    console.log("Selected Value:", value);
    const selectedMock = mockTypeList.find((mock) => mock.value === value);
    if (selectedMock) {
      // console.log("Selected Mock:", selectedMock);
      console.log("Selected Label", selectedMock.label);
      onTypeChange(selectedMock.label);
      onDescriptionChange(selectedMock.description);
    }
  };

  return (
    <Select onValueChange={handleSelect} value={value}>
      <SelectTrigger className='m-1'>
        <SelectValue placeholder='Select an interview type'>
          {value || "Select an interview type"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className='max-h-96 overflow-y-auto'>
          <SelectLabel>Interview Types</SelectLabel>
          {mockTypeList.map((mockType) => (
            <SelectItem key={mockType.value} value={mockType.value}>
              <ListItem
                label={mockType.label}
                description={mockType.description}
              />
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectMockType;
