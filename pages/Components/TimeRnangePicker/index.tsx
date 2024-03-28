import React from "react";
import { DateRangePicker, Stack } from "rsuite";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import addWeeks from "date-fns/addWeeks";
import { RangeSelectorButtonsOptions } from "highcharts";
const predefinedBottomRanges: any = [
  {
    label: "Today",
    text: "today",
    value: [new Date(), new Date()],
    placement: "left",
  },
  {
    label: "Yesterday",
    text: "yesterday",
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: "left",
  },
  // {
  //   label: "Last 7 days",
  //   text: "last.7day",
  //   value: [subDays(new Date(), 6), new Date()],
  //   placement: "left",
  // },
  // {
  //   label: "Last 30 days",
  //   text: "last.30day",
  //   value: [subDays(new Date(), 29), new Date()],
  //   placement: "left",
  // },
  {
    label: "This week",
    text: "this.week",
    value: [startOfWeek(new Date()), new Date()],
    placement: "left",
  },
  {
    label: "This month",
    text: "this.month",
    value: [startOfMonth(new Date()), new Date()],
    placement: "left",
  },
  {
    label: "This year",
    text: "this.year",
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: "left",
  },
  {
    label: "Last week",
    text: "-7D",
    value: [addWeeks(new Date(), -1), new Date()],
    placement: "left",
  },
  {
    label: "previous week",
    text: "previous.week",
    value: [
      startOfWeek(addWeeks(new Date(), -1)),
      endOfWeek(addWeeks(new Date(), -1)),
    ],
    placement: "left",
  },
  {
    label: "Previous month",
    text: "previous.month",
    value: [
      startOfMonth(addMonths(new Date(), -1)),
      endOfMonth(addMonths(new Date(), -1)),
    ],
    placement: "left",
  },
  {
    label: "Previous year",
    text: "previous.year",
    value: [
      new Date(new Date().getFullYear() - 1, 0, 1),
      new Date(new Date().getFullYear(), 0, 0),
    ],
    placement: "left",
  },
  // {
  //   label: "All time",
  //   value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
  // },
];

const TimeRangePicker = (props: any) => {
  const { afterToday }: any = DateRangePicker;
  console.log("timerange value", props.formatedTime && props.formatedTime);
  const handleShortcutClick = (shortcut: any, event: any) => {
    props.onTimeRangeChange(shortcut);
  };

  return (
    <Stack
      direction="column"
      spacing={8}
      alignItems="flex-start"
      className="z-100"
    >
      <DateRangePicker
        ranges={predefinedBottomRanges}
        placeholder="TimeLine"
        format="MM/dd/yyyy hh:mm aa"
        showMeridian
        placement={props.placement == "leftStart" ? "leftStart" : "bottomStart"}
        style={{ width: 250 }}
        showOneCalendar={props.showOneCalendar ? true : false}
        shouldDisableDate={afterToday()}
        onChange={(value: any, format: any) => {
          let dateRange = {
            label: "custom",
            placement: "left",
            text: "custom",
            value: value,
          };
          props.onTimeRangeChange(dateRange);
        }}
        onShortcutClick={handleShortcutClick}
        value={
          props.text != "custome"
            ? Array.isArray(props.text)
              ? props.text
              : predefinedBottomRanges.find(
                  (val: any) => val.text === props.text
                )?.value
            : props.formatedTime
        }
        className="rounded-lg border-dark-border dark:hover:bg-transparent dark:text-textColor dark:bg-dark-menu-color z-50"
      />
    </Stack>
  );
};

export default TimeRangePicker;
