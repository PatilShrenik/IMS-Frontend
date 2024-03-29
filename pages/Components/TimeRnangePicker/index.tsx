import React from "react";
import { DateRangePicker, Stack } from "rsuite";
import {
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  addWeeks,
  addMonths,
  addQuarters,
  addYears,
} from "date-fns";
const predefinedBottomRanges: any = [
  {
    label: "TODAY",
    text: "today",
    value: [new Date(), new Date()],
    placement: "left",
  },
  {
    label: "YESTERDAY",
    text: "yesterday",
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: "left",
  },
  //   {
  //     label: "Last week",
  //     text: "-7D",
  //     value: [addWeeks(new Date(), -1), new Date()],
  //     placement: "left",
  //   },
  //   {
  //     label: "Previous week",
  //     text: "previous.week",
  //     value: [
  //       startOfWeek(addWeeks(new Date(), -1)),
  //       endOfWeek(addWeeks(new Date(), -1)),
  //     ],
  //     placement: "left",
  //   },
  //   {
  //     label: "Previous month",
  //     text: "previous.month",
  //     value: [
  //       startOfMonth(addMonths(new Date(), -1)),
  //       endOfMonth(addMonths(new Date(), -1)),
  //     ],
  //     placement: "left",
  //   },
  //   {
  //     label: "Previous year",
  //     text: "previous.year",
  //     value: [
  //       new Date(new Date().getFullYear() - 1, 0, 1),
  //       new Date(new Date().getFullYear(), 0, 0),
  //     ],
  //     placement: "left",
  //   },
  {
    label: "LAST 5 MIN",
    text: "-5m",
    value: [new Date(Date.now() - 5 * 60 * 1000), new Date()],
    placement: "left",
  },
  {
    label: "LAST 15 MIN",
    text: "-15m",
    value: [new Date(Date.now() - 15 * 60 * 1000), new Date()],
    placement: "left",
  },
  {
    label: "LAST 30 MIN",
    text: "-30m",
    value: [new Date(Date.now() - 30 * 60 * 1000), new Date()],
    placement: "left",
  },
  {
    label: "LAST 1 HOUR",
    text: "-1h",
    value: [new Date(Date.now() - 60 * 60 * 1000), new Date()],
    placement: "left",
  },
  {
    label: "LAST 6 HOUR",
    text: "-6h",
    value: [new Date(Date.now() - 6 * 60 * 60 * 1000), new Date()],
    placement: "left",
  },
  {
    label: "LAST 12 HOUR",
    text: "-12h",
    value: [new Date(Date.now() - 12 * 60 * 60 * 1000), new Date()],
    placement: "left",
  },
  {
    label: "LAST 24 HOUR",
    text: "-24h",
    value: [new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()],
    placement: "left",
  },
  {
    label: "LAST 48 HOUR",
    text: "-48h",
    value: [new Date(Date.now() - 48 * 60 * 60 * 1000), new Date()],
    placement: "left",
  },
  {
    label: "THIS WEEK",
    text: "this.week",
    value: [startOfWeek(new Date()), new Date()],
    placement: "left",
  },
  {
    label: "THIS MONTH",
    text: "this.month",
    value: [startOfMonth(new Date()), new Date()],
    placement: "left",
  },
  {
    label: "THIS QUARTER",
    text: "this.quarter",
    value: [startOfQuarter(new Date()), endOfQuarter(new Date())],
    placement: "left",
  },
  {
    label: "THIS YEAR",
    text: "this.year",
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: "left",
  },
  {
    label: "LAST WEEK",
    text: "-7D",
    value: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
    placement: "left",
  },
  {
    label: "LAST MONTH",
    text: "-1M",
    value: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
    placement: "left",
  },
  {
    label: "LAST QUARTER",
    text: "-1Q",
    value: [
      new Date(
        new Date().getFullYear(),
        Math.floor(new Date().getMonth() / 3) * 3 - 3,
        1
      ),
      new Date(
        new Date().getFullYear(),
        Math.floor(new Date().getMonth() / 3) * 3,
        0
      ),
    ],
    placement: "left",
  },
  {
    label: "LAST YEAR",
    text: "-1Y",
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    placement: "left",
  },
  {
    label: "PREVIOUS WEEK",
    text: "previous.week",
    value: [
      startOfWeek(addWeeks(new Date(), -1)),
      endOfWeek(addWeeks(new Date(), -1)),
    ],
    placement: "left",
  },
  {
    label: "PREVIOUS MONTH",
    text: "previous.month",
    value: [
      startOfMonth(addMonths(new Date(), -1)),
      endOfMonth(addMonths(new Date(), -1)),
    ],
    placement: "left",
  },
  {
    label: "PREVIOUS QUARTER",
    text: "previous.quarter",
    value: [
      startOfQuarter(addQuarters(new Date(), -1)),
      endOfQuarter(addQuarters(new Date(), -1)),
    ],
    placement: "left",
  },
  {
    label: "PREVIOUS YEAR",
    text: "previous.year",
    value: [
      startOfYear(addYears(new Date(), -1)),
      endOfYear(addYears(new Date(), -1)),
    ],
    placement: "left",
  },
];

const TimeRangePicker = (props: any) => {
  const { afterToday }: any = DateRangePicker;
  const { startTime, endTime } = props;
  const handleShortcutClick = (shortcut: any, event: any) => {
    props.onTimeRangeChange(shortcut);
  };
  const timeValue = [new Date(startTime * 1000), new Date(endTime * 1000)];
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
        style={{ width: 550 }}
        showOneCalendar={props.showOneCalendar ? true : false}
        // shouldDisableDate={afterToday()}
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
          props.text != "custom"
            ? Array.isArray(props.text)
              ? props.text
              : predefinedBottomRanges.find(
                  (val: any) => val.text === props.text
                )?.value
            : timeValue
        }
        className="rounded-lg border-dark-border dark:hover:bg-transparent dark:text-textColor dark:bg-dark-menu-color z-50"
      />
    </Stack>
  );
};

export default TimeRangePicker;
