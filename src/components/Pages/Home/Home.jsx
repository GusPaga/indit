import DataContext from '../../../context/podCast/dataContext';
import { useContext, useEffect } from 'react';
import { Loader } from '../../Loader';
import { Cards } from '../../Cards';
import './Home.scss';

const Home = () => {
	const { allData, getData } = useContext(DataContext);

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log('allData in Home', allData);
	return (
		<div id='cards' className='container rounded'>
			<div className='card'>
				{!allData && <Loader />}
				{allData?.map((e) => {
					return <Cards key={e.id} name={e.name} img={e.imageL} />;
				})}
			</div>
		</div>
	);
};
export default Home;
