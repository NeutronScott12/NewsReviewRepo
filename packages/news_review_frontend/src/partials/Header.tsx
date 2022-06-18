import React from 'react'
import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../utils/functions'
import { useLoggedIn } from '../utils/hooks/customApolloHooks'

const useStyles = makeStyles(() => ({
	iconStyle: {
		color: '#fff',
		textDecoration: 'none',
	},
}))

export const Header = () => {
	const navigate = useNavigate()
	const classes = useStyles()
	const { data } = useLoggedIn()

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						<Link className={classes.iconStyle} to="/">
							New Review App
						</Link>
					</Typography>
					{data && data.isLoggedIn ? (
						<>
							<Button
								onClick={() => {
									localStorage.removeItem(
										'binary-stash-token'
									)

									logOut()

									navigate('/login', { replace: true })
								}}
								color="inherit"
							>
								Logout
							</Button>
						</>
					) : (
						<>
							<Link className={classes.iconStyle} to="/login">
								<Button color="inherit">Sign In</Button>
							</Link>
							<Link className={classes.iconStyle} to="/register">
								<Button color="inherit">Sign Up</Button>
							</Link>
						</>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}
