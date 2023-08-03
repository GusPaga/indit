import { useContext } from 'react';
import DataContext from '../../context/podCast/dataContext';

//This function render the author component in pages: Detail and PodCast.
export const Author = () => {
	const { author } = useContext(DataContext);
	return (
		<div className='col-4 card1 '>
			<div className='card shadow-sm my-5 p-3'>
				<img src={author.imageL} className='card-img-top' alt={author.imageL} />
				<div className='card-body'>
					<h4 className='card-title text-center'>{author.author}</h4>
					<p className='card-text'>by: "{author.name}"</p>
				</div>
				<ul className='list-group list-group-flush fst-italic'>
					<li className='list-group-item'>"{author.summary}"</li>
				</ul>
			</div>
		</div>
	);
};
