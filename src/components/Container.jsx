import { Container as MUIContainer, styled } from '@mui/material';

const Container = styled(MUIContainer)(({ theme }) => ({ padding: theme.spacing(3, 2) }));

export default Container;
