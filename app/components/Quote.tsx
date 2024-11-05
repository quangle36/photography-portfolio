import React from 'react';

const Quote = () => {
	return (
		<section className="flex justify-center flex-col items-center">
			<h2 className="text-center w-3/4 md:w-1/2 text-3xl font-thin">
				“You can look at a picture for a week and never think of it again. You
				can also look at the picture for a second and think of it all your
				life.”
			</h2>
			<label className="mt-4 font-thin w-1/2 text-end">—JOAN MIRO</label>
		</section>
	);
};

export default Quote;
