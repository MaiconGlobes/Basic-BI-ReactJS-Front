import { Button, CardMedia, Link, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import avatar from 'assets/images/users/avatar-group.png';
import AnimateButton from 'components/@extended/AnimateButton';

const NavCard = () => (
  <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
    <Stack alignItems="center" spacing={2.5}>
      <CardMedia component="img" image={avatar} sx={{ width: 112 }} />
      <Stack alignItems="center">
        <Typography variant="h5">Mantis Pro</Typography>
        <Typography variant="h6" color="secondary">
          Checkout pro features
        </Typography>
      </Stack>
      <AnimateButton>
        <Button component={Link} target="" href="#" variant="contained" color="success" size="small">
          OK
        </Button>
      </AnimateButton>
    </Stack>
  </MainCard>
);

export default NavCard;
