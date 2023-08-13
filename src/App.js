import {
	BrowserRouter as Browser,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import DataState from './context/podCast/dataState';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Detail } from './components/Pages/Detail/Detail';
import { Podcast } from './components/Pages/PodCast/PodCast';
import { Layout } from './components/Others/Layout';

function App() {
	return (
		<Browser>
			<DataState>
				<Layout>
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route path='/detail/:id' element={<Detail />} />
						<Route path='//detail/:id/podcast/:id' element={<Podcast />} />
						<Route path='*' element={<Navigate to='/' />} />
					</Routes>
				</Layout>
			</DataState>
		</Browser>
	);
}

export default App;
