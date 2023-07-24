import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
	return (
		<nav id='navbar' className='border-bottom d-flex mx-5 p-3'>
			<div className='col-11'>
				<Link to={'/home'}>
					<span className='navbar-brand h1'>PodCaster</span>
				</Link>
			</div>
			<div className='spinner-grow col-1' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</nav>
	);
};
