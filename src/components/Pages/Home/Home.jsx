import './Home.scss';
import { Cards } from '../../Cards';
import { Loader } from '../../Loader';
import { Search } from '../../Search/Search';
import { useContext, useEffect } from 'react';
import DataContext from '../../../context/podCast/dataContext';
import { Link } from 'react-router-dom';

const Home = () => {
	const { allData, getData, filteredData } = useContext(DataContext);

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// console.log('allData in Home', allData);
	return (
		<>
			<Search />
			<div id='cards' className='container-fluid rounded'>
				<div className='card p-3'>
					{!allData && <Loader />}
					{filteredData?.map((e) => {
						return (
							<Link to={`/detail/${e.id}`} key={e.id}>
								<Cards name={e.name} img={e.imageL} author={e.author} />
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
};
export default Home;
