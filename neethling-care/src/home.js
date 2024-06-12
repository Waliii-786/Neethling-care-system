import { useState, useEffect } from "react";
import { makeStyles, withStyles } from '@mui/styles';
import { AppBar, Toolbar, Typography, Avatar, Container, Card, CardContent, Button, CircularProgress, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
//import { DropzoneArea } from 'mui-dropzone';
//import cblogo from "./cblogo.PNG";
import image from "./bg.png";
import { common } from '@mui/material/colors';
import axios from "axios";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#fffffff',
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: 'transparent',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bold',
    padding: '1px 24px 1px 16px',
  },
  appBar: {
    backgroundColor: '#ffffff !important',
    boxShadow: 'none !important',
  },
  appBarContainer: {
    justifyContent: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: "1em",
  },
  logo: {
    width: 200,
    height: 100,
  },
  heading: {
    color: '#000000a6',
    fontSize: '30px',
    fontWeight: 'bold',
  },
  uploadContainer: {
    padding: "1em 1em 0 1em",
  },
  buttonContainer: {
    padding: "0 1em 0 1em",
  },
  table: {
    width: "100%",
  },
  cardAction: {
    width: "100%",
    height: "auto",
  },
  dropZone: {
    display: "none",
  },
}));

const initialState = {
  images: [],
  selectedImage: null,
  file: null,
  progress: 0,
  imageName: "",
  uploadSuccess: false,
};

const MainComponent = () => {
  const classes = useStyles();
  const [state, setState] = useState(initialState);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setState({ ...state, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.file) return;

    const formData = new FormData();
    formData.append("image", state.file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setState({ ...state, progress: parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)) });
        },
      });

      const { fileName, filePath } = res.data;

      setState({ ...state, imageName: fileName, images: [...state.images, { fileName, filePath }], progress: 0, uploadSuccess: true });

    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = (index) => {
    setState({ ...state, selectedImage: index });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.appBarContainer}>
          <img src={Logo} alt="logo" className={classes.logo} />
          <Typography variant="h6" className={classes.heading}>
            Image Upload and Display
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container justify="center" className={classes.uploadContainer}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Fab component="span" className={classes.uploadIcon}>
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
      </Grid>
      <Grid container justify="center" className={classes.buttonContainer}>
        <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>
          Upload
        </Button>
      </Grid>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell1}>File Name</TableCell>
              <TableCell className={classes.tableCell1}>File Path</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.images.map((image, index) => (
              <TableRow key={index} className={classes.tableRow} onClick={() => handleSelect(index)}>
                <TableCell component="th" scope="row" className={classes.tableCell}>
                  {image.fileName}
                </TableCell>
                <TableCell className={classes.tableCell}>{image.filePath}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {state.selectedImage !== null && (
        <Dialog
          open={true}
          onClose={() => setState({ ...state, selectedImage: null })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{state.images[state.selectedImage].fileName}</DialogTitle>
          <DialogContent>
            <img src={state.images[state.selectedImage].filePath} alt="Uploaded Image" style={{ width: "100%" }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setState({ ...state, selectedImage: null })} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default MainComponent;