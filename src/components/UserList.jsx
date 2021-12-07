import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/actions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  mainContainer: {
    paddingLeft: 300,
    paddingRight: 300,
    marginTop: 100,
  },
  Button: {
    float: "Right",
    margin: 20,
  }
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserList = () => {
  const classes = useStyles();
  let dispach = useDispatch()
  let history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open)

  const { users, userCreated } = useSelector(state => state.data)
  

  useEffect(() => {
    dispach(loadUsers())
  }, [])

  useEffect(() => {
    if(userCreated === true){
      dispach(loadUsers())
    }
  }, [userCreated])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the User ?")) {
      dispach(deleteUser(id))
    }
  }
  return (
    <div className={classes.mainContainer}>
      <div className={classes.Button}>
        <Stack spacing={2} direction="row">

          <Button variant="contained" onClick={() => history.push("/user")} >Add User</Button>

        </Stack>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Date Of birth</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">College</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Hobbies</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">
                  {user.id}
                </TableCell>
                <TableCell align="center">
                  {user.firstname} {user.lastname}
                </TableCell>
                <TableCell align="center">{user.dob}</TableCell>
                <TableCell align="center">{user.gender}</TableCell>
                <TableCell align="center">{user.college}</TableCell>
                <TableCell align="center">{user.address}</TableCell>
                {/* {user.hiobbies.map((hobbie)=>{})} */}
                <TableCell align="center">{user.hobbies}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete" size="large" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon fontSize="inherit" />


                  </IconButton>
                  <IconButton aria-label="edit" size="lg" onClick={() => history.push(`/user/${user.id}`)} ><EditIcon fontSize="inherit" /></IconButton>
                  <IconButton aria-label="view" size="lg" onClick={handleOpen} ><VisibilityIcon fontSize="inherit" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClick={handleOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              User Detail
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default UserList
