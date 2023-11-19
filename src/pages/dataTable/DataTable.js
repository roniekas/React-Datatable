import '../../App.css';
import {
  Box, Button, Dialog,
  Grid,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography
} from "@material-ui/core";
import {useEffect, useState} from "react";
import Add from "../../component/add";
import Edit from "../../component/edit";
import {deleteUser, getAllUsers} from "../../services/login";
import secureLocalStorage from "react-secure-storage";
import {useNavigate} from "react-router";


function DataTable() {
  const Swal = require('sweetalert2');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const fetchingUser = () => {
    getAllUsers().then((res) => {
      setIsLoading(false);
      if(res.data){
        setRows(res.data.rows);
        setColumns(res.data.columns);
      } else {
        Swal.fire({
          title: "Ada yang salah!",
          text: "Ada salah dalam fetching data User",
          icon: "failed"
        });
      }
    });
  }

  useEffect(() => {
    const isAuthenticated = secureLocalStorage.getItem('isAuthenticated');
    if(!isAuthenticated){
      navigate('/');
    }
    fetchingUser()
  }, []);
  const handleEdit = (user) => {
    setShowEditDialog(true);
    setSelectedUser(user);
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Anda Yakin ?",
      text: `Data ${user.nama} akan terhapus ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then((result) => {
      if (result.value) {
        deleteUser({id: user.id}).then((res) => {
          if(res){
            Swal.fire({
              title: "Berhasil!",
              text: "Data berhasil terhapus",
              icon: "success"
            });
          }
        })
      }
    });
  };
  const handleAdd = () => {
    setShowAddDialog(true);
  };

  const handleLogout = () => {
    secureLocalStorage.removeItem("isAuthenticated");
    window.location.assign('/');
  };

  return (
    <div className="App">
      <Box style={{
        backgroundColor: '#3c3f41',
        padding: '5vh',
        color: 'white',
        boxShadow: '0px 0px 5px #FFF',
        minWidth: '500px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center'
      }}>
        <Typography variant="h3" style={{margin: '0vh 0px 3vh'}}>
          Data Pegawai - PT. USADI
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button variant="contained" onClick={handleAdd} style={{margin: '2vh 0px'}}>Add New User</Button>
          <Button variant="outlined" color="error" onClick={handleLogout} style={{margin: '2vh 0px'}}>Logout</Button>
        </Grid>
        {isLoading ? (
          <Typography variant="h3">
            Fetching Data ...
          </Typography>
        ) : (
          <Grid container spacing={2}>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">No</TableCell>
                    {
                      columns && columns.map((column) => (
                        <TableCell align="center">{column.caption}</TableCell>
                      ))
                    }
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow
                      key={row.nip}
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                      <TableCell align="center">{i+1}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.nama}
                      </TableCell>
                      <TableCell align="center">{row.nip}</TableCell>
                      <TableCell align="center">{row.jabatan}</TableCell>
                      <TableCell align="center">
                        <Box gridGap={50}>
                          <Button
                            onClick={() => handleEdit(row)}
                            variant="contained"
                            color="primary"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(row)}
                            variant="contained"
                            color="error"
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Box>
      {showAddDialog && (
        <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
          <Add id={rows.length+1} dismisDialog={() => setShowAddDialog(false)} refreshuser={() => fetchingUser()}/>
        </Dialog>
      )}

      {showEditDialog && (
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
          <Edit user={selectedUser} setShowEditDialog={() => setShowEditDialog(false)}/>
        </Dialog>
      )}
    </div>
  )
    ;
}

export default DataTable;
