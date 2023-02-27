import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
    sticky: "left",
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
    sticky: "left",
  },
  {
    Header: "Date of Birth",
    Footer: "Date of Birth",
    accessor: "date_of_birth",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Country",
    Footer: "Country",
    accessor: "country",
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
  },
  {
    Header: "Age",
    Footer: "Age",
    accessor: "age",
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Date of Birth",
        Footer: "Date of Birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];

export const ORDER_COLUMNS = [
  {
    Header: "Professional Name",
    Footer: "Professional Name",
    accessor: "jsonData.name",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Order Date",
    Footer: "Order Date",
    accessor: "createdAt",
    sticky: "left",
  },
  {
    Header: "Hours",
    Footer: "Hours",
    accessor: "jsonData.qty",
    Cell: ({ value }) => {
      return <span>{value.toString().substring(0, 1)}</span>;
    },
    sticky: "left",
  },
  {
    Header: "Price Per Hour",
    Footer: "Price Per Hour",
    accessor: "jsonData.price",
    Cell: ({ value }) => {
      return <span>$ {value}</span>;
    },
  },
  {
    Header: "Type Of Service",
    Footer: "Type Of Service",
    accessor: "jsonData.typeOfService",
    // Cell: ({ value }) => {
    //   let jsonData = JSON.parse(value);
    //   return <span>{jsonData.typeOfService}</span>;
    // },
  },
  {
    Header: "Total Cost",
    Footer: "Total Cost",
    accessor: "jsonData",
    Cell: ({ value }) => {
      return (
        <span>
          ${Number(value.price) * Number(value.qty.toString().substring(0, 1))}
        </span>
      );
    },
  },
];

export const COLUMNS2 = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "userName",
    disableFilters: true,
    sticky: "left",
  },
];
