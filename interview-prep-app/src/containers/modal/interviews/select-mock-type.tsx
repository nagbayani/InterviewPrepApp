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
    const selectedMock = mockTypeList.find((mock) => mock.value === value);
    if (selectedMock) {
      onTypeChange(selectedMock.label);
      onDescriptionChange(selectedMock.description);
    }
  };

  return (
    <Select onValueChange={handleSelect} value={value}>
      <SelectTrigger className='w-[240px]'>
        <SelectValue placeholder='Select an interview type'>
          {value
            ? mockTypeList.find((mock) => mock.value === mock.value)?.label
            : "Select an interview type"}
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
