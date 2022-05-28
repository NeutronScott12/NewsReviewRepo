import React from 'react'

import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'

export const Header = () => {
	const navigate = useNavigate()

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
						<Link to="/">New Review App</Link>
					</Typography>
					<Link to="/login">
						<Button color="inherit">Sign In</Button>
					</Link>
					<Link to="/register">
						<Button color="inherit">Sign Up</Button>
					</Link>

					<Button
						onClick={() => {
							localStorage.removeItem('binary-stash-token')

							navigate('/login', { replace: true })
						}}
						color="inherit"
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
