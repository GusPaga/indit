import { useContext } from 'react';
import DataContext from '../../../context/podCast/dataContext';
import { Link } from 'react-router-dom';

export const Podcast = () => {
	const { author, track } = useContext(DataContext);
	console.log('autor', author);

	return (
		<>
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
								<li className='list-group-item'>"{author.summary}"</li>
							</ul>
						</div>
					</div>

					<div className='col-8 card2 '>
						<div className='col-8 card2 w-100 h-100'>
							<div className='card shadow-sm my-5 p-3'>
								<Link to={`/detail/${author.id}`}>
									<button
										type='button'
										className='btn-close text-right close'
										aria-label='Close'
									></button>
								</Link>

								<div className='card-body text-center'>
									<h1>{track.trackName}</h1>{' '}
								</div>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item p-3 mt-2'>
										<p className='text-justify'>{track.description}</p>
									</li>
									<li className='list-group-item mt-4 text-center'>
										<audio controls src={track.episode}></audio>{' '}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
