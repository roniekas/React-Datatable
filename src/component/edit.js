import {Box, Button, Grid, TextField} from "@material-ui/core";
import {useState} from "react";
import {updateUser} from "../services/login";

const Edit = ({user, setShowEditDialog}) => {
    const Swal = require('sweetalert2');
    const [id, setId] = useState(user.id);
    const [nama, setNama] = useState(user.nama);
    const [NIP, setNIP] = useState(user.nip);
    const [jabatan, setJabatan] = useState(user.jabatan);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser({
            id,
            nama,
            nip: NIP,
            jabatan
        }).then((res) => {
            setShowEditDialog()
            if(res.data){
                Swal.fire({
                    title: "Berhasil!",
                    text: "Data berhasil diubah",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Gagal!",
                    text: "Data gagal diubah",
                    icon: "failed"
                });
            }
        });
    };

    return (
        <Box style={{padding: '5vh'}}>
            <h1>Edit User</h1>

            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <TextField
                        label="Nama"
                        value={nama}
                        onChange={(event) => setNama(event.target.value)}
                        required
                    />

                    <TextField
                        label="NIP"
                        value={NIP}
                        onChange={(event) => setNIP(event.target.value)}
                        required
                    />

                    <TextField
                        label="Jabatan"
                        value={jabatan}
                        onChange={(event) => setJabatan(event.target.value)}
                        required
                    />
                </Grid>
                <Button type="submit" variant="contained" color="primary" style={{marginTop: '2vh'}}>
                    Update
                </Button>
            </form>
        </Box>
    );
};

export default Edit;
