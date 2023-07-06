import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open responsive dialog
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"

            >
                <DialogTitle id="responsive-dialog-title">
                    <div>
                        Prepare a Quiz
                    </div>
                    <div style={{
                        fontSize : '14px'
                    }} >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, nulla?
                    </div>
                </DialogTitle>
                <DialogContent dividers={'paper'} >
                    <DialogContentText >
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero odit quidem harum, illum modi unde quibusdam reiciendis quis ea similique incidunt. Doloribus earum debitis voluptates eius! Quaerat aperiam beatae sapiente autem iste vitae fugiat similique vero sit placeat consequatur velit blanditiis quibusdam laboriosam, pariatur mollitia commodi necessitatibus! Corrupti dicta similique sit velit obcaecati voluptate sed veniam nemo mollitia autem debitis, omnis molestias! Numquam fugit reprehenderit minima labore provident libero, quod voluptates nostrum eligendi qui delectus rem error laborum laudantium, iusto tenetur sunt praesentium aliquid sapiente at voluptas exercitationem ipsam nobis deserunt! Asperiores, magnam! Quam, officiis dolores facilis sint at mollitia.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero odit quidem harum, illum modi unde quibusdam reiciendis quis ea similique incidunt. Doloribus earum debitis voluptates eius! Quaerat aperiam beatae sapiente autem iste vitae fugiat similique vero sit placeat consequatur velit blanditiis quibusdam laboriosam, pariatur mollitia commodi necessitatibus! Corrupti dicta similique sit velit obcaecati voluptate sed veniam nemo mollitia autem debitis, omnis molestias! Numquam fugit reprehenderit minima labore provident libero, quod voluptates nostrum eligendi qui delectus rem error laborum laudantium, iusto tenetur sunt praesentium aliquid sapiente at voluptas exercitationem ipsam nobis deserunt! Asperiores, magnam! Quam, officiis dolores facilis sint at mollitia.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}