import axios from "axios";

export const LoginInitiate = async ({username = '', password}) => {
  try {
    return await axios.get(`/User?user=${username}&password=${password}`);
  } catch (error) {
    return error;
  }
};

export const insertUser = async ({id = '', nama ='', nip='', jabatan=''}) => {
  try {
    const params = {
      id,
      nama,
      nip,
      jabatan
    }
    return await axios.post(`/Pegawai`, params);
  } catch (error) {
    return error;
  }
}

export const getAllUsers = async () => {
  try {
    return await axios.get(`/Pegawai`);
  } catch (error) {
    return error;
  }
}

export const updateUser = async ({id = '', nama ='', nip='', jabatan=''}) => {
  try {
    const params = {
      id,
      nama,
      nip,
      jabatan
    }
    return await axios.patch(`/Pegawai?id=${id}`, params);
  } catch (error) {
    return error;
  }
}

export const deleteUser = async ({id=''}) => {
  try {
    return await axios.delete(`/Pegawai?id=${id}`);
  } catch (error) {
    return error;
  }
}