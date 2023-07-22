import { BrowserRouter as Browser, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Detail from './components/Pages/Detail/Detail.jsx';
import DataState from './context/podCast/dataState';

function App() {
	return (
		<Browser>
			<DataState>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/detail/:id' element={<Detail />} />
				</Routes>
			</DataState>
		</Browser>
	);
}

export default App;
