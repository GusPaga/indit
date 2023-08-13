import './Detail.scss';
import { Author } from '../../Others/Author';
import { useContext, useEffect } from 'react';
import { scroll } from '../../../helpers/scroll';
import { Link, useParams } from 'react-router-dom';
import { convertTime } from '../../../helpers/convertTime';
import DataContext from '../../../context/podCast/dataContext';

//This function render the page Detail.
export const Detail = () => {
	const { getDetail, detail, getAuthor, getEpisode } = useContext(DataContext);
	const { id } = useParams();

	useEffect(() => {
		setInterval(getDetail(id), 86400000);
		getAuthor(id);
		scroll();
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
							<table className='table table-striped table-hover text-center'>
								<thead className='fs-5'>
									<tr>
										<th className='col-1'>#</th>
										<th className='col-7'>Title</th>
										<th className='col-2'>Date</th>
										<th className='col-2'>H : M</th>
									</tr>
								</thead>
								<tbody className='fs-6 '>
									{detail?.map((e, index) => {
										return (
											<tr key={index}>
												<td>{index + 1}</td>
												<td className='text-start'>
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
												<td className='align-middle'>{e.date}</td>
												<td className='align-middle'>
													{convertTime(e.duration)}
												</td>
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
