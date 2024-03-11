import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { usePathname } from "next/navigation";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Breadcrumb() {
  //   const breadcrumbs = [
  //     <Link
  //       underline="hover"
  //       key="1"
  //       color="inherit"
  //       href="/"
  //       onClick={handleClick}
  //     >
  //       MUI
  //     </Link>,
  //     <Link
  //       underline="hover"
  //       key="2"
  //       color="inherit"
  //       href="/material-ui/getting-started/installation/"
  //       onClick={handleClick}
  //     >
  //       Core
  //     </Link>,
  //     <Typography key="3" color="text.primary">
  //       Breadcrumb
  //     </Typography>,
  //   ];

  const pathname = usePathname();
  const path = pathname.substring(1);
  const arrayOfStrings = path.split("/");
  const transformedArray = arrayOfStrings.map((word) =>
    word.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );

  const breadcrumbs = arrayOfStrings
    .slice(0, arrayOfStrings.length - 1)
    .map((segment, index) => {
      const href = `/${arrayOfStrings.slice(0, index + 1).join("/")}`;
      return (
        <Link
          underline="hover"
          key={index}
          color="inherit"
          href={href}
          onClick={handleClick}
          className=" dark:text-textColor"
        >
          {segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </Link>
      );
    });

  breadcrumbs.unshift(
    <>
      {!pathname.includes("Dashboard") && (
        <>
          <Link href="/Dashboard">
            <HomeIcon
              fontSize="small"
              className="align-sub dark:text-textColor hover:text-primary2 dark:hover:text-primary2"
            />
            {/* {" / "} */}
          </Link>
        </>
      )}
    </>
  );

  breadcrumbs.push(
    <Typography
      sx={{ color: "#0078d4" }}
      key={arrayOfStrings.length - 1}
      color="text.primary"
      className=" text-lg text-primary2"
    >
      {arrayOfStrings[arrayOfStrings.length - 1]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())}
    </Typography>
  );

  const transformedString = path
    .replace(/\//g, " > ")
    .replace(/-/g, " ")
    .split("/")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" > ");

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={
          !pathname.includes("Dashboard") && (
            <NavigateNextIcon
              fontSize="small"
              className=" dark:text-textColor"
            />
          )
        }
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
