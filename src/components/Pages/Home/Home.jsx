import './Home.scss';
import { Cards } from '../../Others/Cards/Cards';
import { Search } from '../../Others/Search/Search';
import { useContext, useEffect } from 'react';
import DataContext from '../../../context/podCast/dataContext';
import { Link } from 'react-router-dom';

//This function render the component Home.
const Home = () => {
	const { getData, filteredData, setLoader } = useContext(DataContext);

	useEffect(() => {
		setLoader(true);
		setInterval(getData(), 86400000);
		setLoader(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Search />
			<div id='cards' className='container-fluid rounded'>
				<div className='card p-3'>
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
