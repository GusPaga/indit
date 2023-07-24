import './Detail.scss';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import DataContext from '../../../context/podCast/dataContext';

export const Detail = () => {
	const { allData, getDetail, detail, getAuthor, author, getEpisode } =
		useContext(DataContext);
	const { id } = useParams();

	useEffect(() => {
		getDetail(id);
		getAuthor(id, allData);
		window.scroll({
			top: 0,
			behavior: 'smooth',
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleOnClick = (trackId) => {
		getEpisode(trackId);
	};

	console.log('id autor', id);
	console.log('detail', detail);

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
						<div className='count rounded-1 shadow-sm mt-5 mb-3'>
							NUMBER OF EPISODES: {detail?.length}
						</div>
						<div className='table rounded-1 shadow-sm mb-5'>
							<table className='table'>
								<thead>
									<th>#</th>
									<th>Title</th>
									<th>Date</th>
									<th>Duration</th>
								</thead>
								<tbody>
									{detail?.map((e, index) => {
										return (
											<tr>
												<td>{index + 1}</td>
												<td>
													<Link
														to={`/detail/${id}/podcast/${e.trackId}`}
														key={e.trackId}
													>
														<button
															value={e.trackId}
															type='submit'
															onClick={(e) => {
																handleOnClick(e.target.value);
															}}
														>
															{e.trackName}{' '}
														</button>{' '}
													</Link>
												</td>
												<td>{e.releaseDate}</td>
												<td>{e.trackTimeMillis / (1000 * 60)} seg</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
