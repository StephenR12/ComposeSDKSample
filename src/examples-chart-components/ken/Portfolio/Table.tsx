import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "../../connected/sample-ecommerce";
import { Data, filters, measures } from "@sisense/sdk-data";

interface Column {
  id: "positions" | "weight" | "value" | "distribution";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "positions", label: "Positions", minWidth: 170 },
  { id: "weight", label: "Weight", minWidth: 100 },
  {
    id: "value",
    label: "Value",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "distribution",
    label: "Distribution",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface DataBackup {
  positions: string;
  weight: number;
  value: number;
  distribution: number;
}

function createData(
  positions: string,
  weight: number,
  value: number,
  distribution: number
): DataBackup {
  return { positions, weight, value, distribution };
}

const rows = [
  createData("India", 75, 1324171354, 3287263),
  createData("China", 13, 1403500365, 9596961),
  createData("Italy", 10, 60483973, 301340),
  createData("United States", 5, 327167434, 9833520),
  createData("Canada", 2, 37602103, 9984670),
  createData("Australia", 1, 25475400, 7692024),
  createData("Germany", 0.39, 83019200, 357578),
  createData("Ireland", 0.12, 4857000, 70273),
  createData("Mexico", 0.09, 126577691, 1972550),
  createData("Japan", 0.07, 126317000, 377973),
  createData("France", 0.04, 67022000, 640679),
  createData("United Kingdom", 0.03, 67545757, 242495),
  createData("Russia", 0.02, 146793744, 17098246),
  createData("Nigeria", 0.01, 200962417, 923768),
  createData("Brazil", 0.001, 210147125, 8515767),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Commerce.AgeRange]}
      measures={[
        measures.sum(DM.Commerce.Revenue, "Total Revenue"),
        measures.sum(DM.Commerce.Cost, "Total Cost"),
        measures.sum(DM.Commerce.Quantity, "Total Quantity")
      ]}
      filters={[]}
    >
      {(data: Data) => {
        console.log("Table Data From Sisense");
        console.log(data);
        const sisenseTableData = TranslateSisenseDataToTable(data);

        return (
          <Paper
            sx={{ width: "100%", overflow: "hidden", marginLeft: "100px" }}
          >
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sisenseTableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.positions}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={sisenseTableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        );
      }}
    </ExecuteQuery>
  );
}

interface Row {
    [key: string]: any;
  }
  interface TranslatedRow {
    positions: string;
    weight: number;
    value: number;
    distribution: number;
  }

function TranslateSisenseDataToTable(data: Data) {
    const translatedRows: Array<TranslatedRow> = [];
    data.rows.forEach((row: Row) => {
      //Create image with first letter of name
      const translatedRow: TranslatedRow = {
        positions: row[0].text,
        weight: row[1].data.toFixed(2),
        value: row[2].data.toFixed(2),
        distribution: row[3].data.toFixed(2)
      };
      translatedRows.push(translatedRow);
    });
    console.log("Order List Table");
    console.log(translatedRows);
    return translatedRows;
  }
