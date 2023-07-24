export const Cards = ({ img, name, author }) => {
	return (
		<div className='shadow p-5 m-3 rounded bg w-75'>
			<img className='mx-auto' src={img} alt={name} />
			<div>
				<h5 className='card-title text-center mt-5'>{name}</h5>
				<p className='card-text text-center mt-3 '>Author: {author}</p>
			</div>
		</div>
	);
};
