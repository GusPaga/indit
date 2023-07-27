import './Detail.scss';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import DataContext from '../../../context/podCast/dataContext';

export const Detail = () => {
	const { getDetail, detail, getAuthor, author, getEpisode } =
		useContext(DataContext);
	const { id } = useParams();

	console.log('detail in detail', detail);
	useEffect(() => {
		getDetail(id);
		getAuthor(id);
		window.scroll({
			top: 0,
			behavior: 'smooth',
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleOnClick = (trackId) => {
		getEpisode(trackId);
	};

	return (
		<>
			<div id='detail' className='container mt-1'>
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
						<div className='count rounded-1 shadow-sm p-3 fs-4 fw-bold mt-5 mb-3'>
							Number of Episodes: {detail?.length}
						</div>
						<div className='table rounded-1 shadow-sm mb-5'>
							<table className='table table-striped table-hover '>
								<thead className='fs-5'>
									<th>#</th>
									<th>Title</th>
									<th>Date</th>
									<th>Duration</th>
								</thead>
								<tbody className='fs-6 '>
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
															type='submit'
															title='Go to listen'
															data-bs-placement='top'
															data-bs-toggle='tooltip'
															className='text-lowercase'
															value={e.trackId}
															onClick={(e) => {
																handleOnClick(e.target.value);
															}}
														>
															{e.name}{' '}
														</button>{' '}
													</Link>
												</td>
												<td>{e.date}</td>
												<td>{e.duration} seg</td>
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
