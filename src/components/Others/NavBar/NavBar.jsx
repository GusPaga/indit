import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../Others/Loader';
import DataContext from '../../../context/podCast/dataContext';

//This function render the navBar whit the brand and loader
export const NavBar = () => {
	const { loader } = useContext(DataContext);

	return (
		<nav id='navbar' className='border-bottom d-flex mx-5 p-3'>
			<div className='col-11'>
				<Link to={'/home'} className='text-decoration-none fs-2'>
					<span
						className='navbar-brand h1'
						data-bs-toggle='tooltip'
						data-bs-placement='top'
						title='Home'
					>
						PodCaster
					</span>
				</Link>
			</div>
			<div className='col-1'>{loader && <Loader />}</div>
		</nav>
	);
};
