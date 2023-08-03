import './PodCast.scss';
import { Link } from 'react-router-dom';
import { Author } from '../../Others/Author';
import { useContext, useEffect } from 'react';
import { scroll } from '../../../helpers/scroll';
import DataContext from '../../../context/podCast/dataContext';

//This function render the PodCast component.
export const Podcast = () => {
	const { author, track } = useContext(DataContext);

	useEffect(() => {
		scroll();
	}, []);

	//Function to interpret html links
	const createLinks = (literal) => {
		// const urlRegex =
		// 	/\b(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\/([a-zA-Z0-9.-]{2,})\b/g;
		const parts = literal.split(' ');
		return parts.map((part, index) => {
			if (part.includes('https://')) {
				return (
					<span key={index}>
						<a href={part} target='_blank' rel='noopener noreferrer'>
							{part}
						</a>
						&nbsp;
					</span>
				);
			} else {
				return <span key={index}>{part}&nbsp;</span>;
			}
		});
	};

	return (
		<div>
			<div id='detail' className='container mt-5'>
				<div className='row'>
					<Author />

					<div className='col-8 card2 '>
						<div className='col-8 card2 w-100 h-100'>
							<div className='card shadow-sm my-5 p-3'>
								<Link
									to={`/detail/${author.id}`}
									className='close d-flex justify-content-end'
								>
									<button
										type='button'
										className='btn-close fs-4 close'
										aria-label='Close'
										data-bs-toggle='tooltip'
										data-bs-placement='top'
										title='Go Back'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='30'
											height='25'
											fill='currentColor'
											class='bi bi-backspace-fill'
											viewBox='0 0 16 16'
										>
											<path d='M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z' />
										</svg>
									</button>
								</Link>

								<div className='card-body text-center'>
									<h1>{track.name}</h1>{' '}
								</div>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item p-3 mt-2 fst-italic'>
										<p>{createLinks(track.description)}</p>
									</li>

									<li className='list-group-item mt-4 text-center'>
										<audio controls src={track.url}></audio>{' '}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
