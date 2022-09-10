import { IRelatorio } from "../../api/RelatorioService";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { MdFirstPage, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdLastPage } from 'react-icons/md';
import TableHead from "@mui/material/TableHead";
import format from "date-fns/format";
import { useTranslation } from 'react-i18next';

interface IProps {
    rows: IRelatorio[]
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <MdLastPage /> : <MdFirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <MdFirstPage /> : <MdLastPage />}
      </IconButton>
    </Box>
  );
}

function TabelaRelatorio({ rows }: IProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // evita pulo do layout quando estiver na última página com linhas vazias
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // função que lida com a mudança de página na tabela
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { t } = useTranslation()
  return (
    <TableContainer component={Paper} sx={{ marginTop: 4}}>
      <Table sx={{ minWidth: 500 }} aria-label="report table">
        <TableHead>
          <TableRow>
            <TableCell className="bold">{t("reportTable.id")}</TableCell>
            <TableCell align="right" className="bold">{t("reportTable.type")}</TableCell>
            <TableCell className="bold">{t("modal.book")}{t("reportTable.user")}</TableCell>
            <TableCell align="right" className="bold">{t("reportTable.client")}</TableCell>
            <TableCell align="right" className="bold">{t("reportTable.book")}</TableCell>
            <TableCell align="right" className="bold">{t("reportTable.dateTime")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
                <TableCell style={{ width: 40 }} align="left">
                {row.id}
              </TableCell>
              <TableCell style={{ width: 200 }} align="right">
                {row.tipoMovimentacao}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.idUsuario || ''}
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="right">
                {row.idCliente || ''}
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="right">
                {row.idLivro || ''}
              </TableCell>
              
              <TableCell style={{ width: 'auto' }} align="right">
                {format(new Date(row.dataHora), "dd/MM/yyyy HH:mm")}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'Tudo', value: -1 }]}
              colSpan={5}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Linhas por página',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default TabelaRelatorio;