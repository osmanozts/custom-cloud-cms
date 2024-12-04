import { Box, Button, useDisclosure } from "@chakra-ui/react";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import styles from "./custom-calender.module.css";

export type Range<T> = [T, T];
export type RangeType = "century" | "decade" | "year" | "month" | "day";
type ValuePiece = Date | null;
export type Value = ValuePiece | Range<ValuePiece>;

interface CalendarProps {
  value: ValuePiece;
  onChange: (value: ValuePiece) => void;
}

export function CustomCalendar({ value, onChange }: CalendarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<ValuePiece>(value);

  const handleDateChange = (date: Value) => {
    const selected = (date instanceof Array ? date[0] : date) as Date;
    setSelectedDate(selected);
    onChange(selected);
    onClose();
  };

  const formatDate = (date: ValuePiece) => {
    if (!date) return "Kein Datum gewählt";
    return date.toLocaleDateString();
  };

  return (
    <Box bg="backgroundColor" borderRadius={6}>
      <Button
        width="100%"
        onClick={isOpen ? onClose : onOpen}
        bg="backgroundColor"
        _hover={{ bg: "darkColor", color: "invertedTextColor" }}
      >
        {formatDate(selectedDate)}
      </Button>
      {isOpen && (
        <Box mt={4} className={styles["calendar-container"]}>
          <Calendar
            onChange={(value) => handleDateChange(value)}
            value={selectedDate}
            className={styles["react-calendar"]}
          />
        </Box>
      )}
    </Box>
  );
}
