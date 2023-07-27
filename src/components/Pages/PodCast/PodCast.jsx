import { useContext, useEffect } from 'react';
import DataContext from '../../../context/podCast/dataContext';
import { Link } from 'react-router-dom';
import './PodCast.scss';
export const Podcast = () => {
	const { author, track } = useContext(DataContext);

	useEffect(() => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

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
					<div className='col-4 card1 '>
						<div className='card shadow-sm my-5 p-3'>
							<img
								src={author.imageL}
								className='card-img-top'
								alt={author.imageL}
							/>
							<div className='card-body'>
								<h4 className='card-title text-center'>{author.author}</h4>
								<p className='card-text'>by: "{author.name}"</p>
							</div>
							<ul className='list-group list-group-flush'>
								<li className='list-group-item fst-italic'>
									"{author.summary}"
								</li>
							</ul>
						</div>
					</div>

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
										title='Close'
									>
										X
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
