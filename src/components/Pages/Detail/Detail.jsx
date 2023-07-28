import './Detail.scss';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import DataContext from '../../../context/podCast/dataContext';
import { Author } from '../../Others/Author';
import { scroll } from '../../../helpers/scroll';

export const Detail = () => {
	const { getDetail, detail, getAuthor, getEpisode, setLoader } =
		useContext(DataContext);
	const { id } = useParams();

	useEffect(() => {
		setLoader(true);
		getDetail(id);
		getAuthor(id);
		scroll();
		setLoader(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleOnClick = (trackId) => {
		getEpisode(trackId);
	};

	return (
		<>
			<div id='detail' className='container mt-1'>
				<div className='row'>
					<Author />

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
