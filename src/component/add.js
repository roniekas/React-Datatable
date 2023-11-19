// pages/add.tsx

import {Box, Button, Grid, TextField} from "@material-ui/core";
import {useState} from "react";
import {insertUser} from "../services/login";
import generateFakeUUID from "../utils/randomString";

const Add = ({ dismisDialog, refreshuser }) => {
    const Swal = require('sweetalert2');
    const id = generateFakeUUID();
    const [nama, setNama] = useState("");
    const [NIP, setNIP] = useState("");
    const [jabatan, setJabatan] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        insertUser({
            id,
            nama,
            nip: NIP,
            jabatan
        }). then((res) => {
            if(res.data){
                Swal.fire({
                    title: "Berhasil!",
                    text: "Data berhasil ditambahkan",
                    icon: "success"
                });
                setTimeout(() => {
                    dismisDialog()
                    refreshuser()
                }, 300)
            } else {
                Swal.fire({
                    title: "Gagal!",
                    text: "Data tidak berhasil ditambahkan",
                    icon: "failed"
                });
                setTimeout(() => {
                    dismisDialog()
                    refreshuser()
                }, 300)
            }
        });
    };

    return (
        <Box style={{padding: '5vh'}}>
            <h1>Add User</h1>

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
                    Send
                </Button>
            </form>
        </Box>
    );
};

export default Add;