import {
	BrowserRouter as Browser,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import DataState from './context/podCast/dataState';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar/NavBar';
import { Detail } from './components/Pages/Detail/Detail';
import { Podcast } from './components/Pages/PodCast/PodCast';

function App() {
	return (
		<Browser>
			<DataState>
				<NavBar />
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/detail/:id' element={<Detail />} />
					<Route path='//detail/:id/podcast/:id' element={<Podcast />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</DataState>
		</Browser>
	);
}

export default App;
