import { type ComponentPropsWithoutRef, ReactNode, MouseEvent, useState } from "react";
import { useLayoutContext } from "../../store/LayoutContext";
import FilterClubActivities from "../ClubActivities/ClubActivitiesFilter";
import StravaAuthButton from '../../components/Strava/StravaAuthButton';
import { AppBar, Avatar, Box, IconButton, Button, Menu, MenuItem, ThemeProvider, Toolbar, Tooltip, Typography, createTheme, SvgIcon, Container } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useStravaContext } from "../../store/StravaContext";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GlobantIcon } from '../../globant-dark-logo.svg';
import { FeaturedMedia } from '../.././features/Layout/Index';

type LayoutProps = {
    children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

const theme = createTheme({
    palette: {
        mode: 'dark',
    }
});

const Layout: React.FC<LayoutProps> = ({children}: LayoutProps) => {

    const config = useLayoutContext();
    const { isLoggedIn, loggedInAthlete } = useStravaContext();

    const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null)
    const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null)

    const navigateTo = useNavigate();

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event?.currentTarget)
    }

    const handleCloseUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(null);
    }

    const handleOpenNav = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event?.currentTarget)
    }

    const handleCloseNav = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(null);
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={ config.showSidebar ? 'grid-container sidebar-on' : 'grid-container'}>
                <header className='header'>
                    <AppBar position="static">
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                <SvgIcon sx={{ display: { xs: 'none', md: 'flex'}, mr: 1, width: '2rem'}} component={GlobantIcon} inheritViewBox />
                                <Typography variant="h6" component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex'} }}>
                                    g-cycling-col
                                </Typography>
                                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                    <IconButton
                                        size="large"
                                        color="inherit"
                                        aria-label="Menu"
                                        onClick={handleOpenNav}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left'
                                        }}
                                        open={Boolean(anchorElNav)}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left'
                                        }}
                                        keepMounted
                                        onClose={handleCloseNav}
                                        sx={{ display: {xs: 'block', md: 'none'}}}
                                        >
                                        <MenuItem onClick={handleCloseNav}>
                                            <Button 
                                                onClick={() => navigateTo('club-activities')} 
                                            >
                                                Club Activities 
                                            </Button>
                                            <Button 
                                                onClick={() => navigateTo('my-activities')} 
                                            >
                                                My Activities 
                                            </Button>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                                <SvgIcon sx={{ display: { xs: 'flex', md: 'none'}, mr: 1, width: '2rem'}} component={GlobantIcon} inheritViewBox />
                                <Typography variant="h6" component="div" sx={{ mr: 2, display: {xs: 'flex', md: 'none'}, flexGrow: 1 }}>
                                    g-cycling-col
                                </Typography>
                                { isLoggedIn ? 
                                <>
                                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                    <Button 
                                        onClick={() => navigateTo('club-activities')} 
                                        sx={{ my: 2, color: 'white', display: 'block'}}
                                    >
                                        Club Activities
                                    </Button>
                                    <Button 
                                        onClick={() => navigateTo('my-activities')} 
                                        sx={{ my: 2, color: 'white', display: 'block'}}
                                    >
                                        My Activities
                                    </Button>
                                 </Box>
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip title="Open User Settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p:0 }}>
                                                <Avatar alt="Lorem Ipsium" src={loggedInAthlete?.profile_medium} />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            anchorEl={anchorElUser}
                                            open={Boolean(anchorElUser)}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                            onClose={handleCloseUserMenu}
                                        >
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Button
                                                    onClick={() => navigateTo('/')}
                                                >
                                                    Profile
                                                </Button>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <StravaAuthButton />
                                            </MenuItem>
                                        </Menu>
                                    </Box> </> :
                                    <Box sx={{flexGrow: 0, }}>
                                        <StravaAuthButton />
                                    </Box>
                                }
                            </Toolbar>
                        </Container>
                    </AppBar>
                </header>
                <FeaturedMedia className='featured'></FeaturedMedia>
                {
                    config.showSidebar && 
                    <aside className="sidebar">
                        <FilterClubActivities title="Activities Filter" />
                    </aside>
                }
                <section className="content">
                    { children }
                </section>
                <footer className='footer'>
                    Footer
                </footer>
            </div>
        </ThemeProvider>
    )

}

export default Layout;